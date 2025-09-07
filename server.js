const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }
});

// --- Minimal Groq API call function ---
async function callGroqAPI(prompt, maxTokens = 800) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new Error('GROQ_API_KEY not found in environment variables');
    }

    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    const requestBody = {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: maxTokens
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API Error:', errorData);
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('No response generated');
    }

    return data.choices[0].message.content;
}

// --- Extract key resume sections ---
function extractResumeData(content) {
    const lines = content.split('\n').filter(line => line.trim());

    const name = lines[0] || "Unknown";
    const contact = lines.find(line => line.includes('@') || line.includes('+')) || "";
    const education = lines.filter(line =>
        line.includes('Bachelor') || line.includes('12th') || line.includes('10th') ||
        line.includes('%') || line.includes('Engineering')
    ).join(' ');
    const skillsStart = lines.findIndex(line => line.toLowerCase().includes('skill'));
    const skills = skillsStart > -1 ? lines.slice(skillsStart, skillsStart + 10).join(' ') : "";
    const projects = lines.filter(line =>
        line.toLowerCase().includes('project') || line.toLowerCase().includes('management')
    ).join(' ');

    return { name, contact, education, skills, projects };
}

// --- Simple fallback scoring function ---
function calculateScores(resumeData) {
    let overallScore = 60;
    let atsScore = 60;
    let jobMatchScore = 60;

    if (resumeData.education.includes('Engineering')) overallScore += 10;
    if (resumeData.skills.includes('Python')) overallScore += 5;
    if (resumeData.skills.includes('SQL')) overallScore += 5;
    if (resumeData.contact.includes('@')) atsScore += 10;
    if (resumeData.projects.length > 10) overallScore += 5;

    return { overallScore, atsScore, jobMatchScore };
}

// --- Safe JSON parse helper ---
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error("❌ Failed to parse AI JSON:", str);
        return {};
    }
}

// --- Lightweight resume analysis ---
async function analyzeResumeLight(content, jobDescription = '') {
    const resumeData = extractResumeData(content);
    const scores = calculateScores(resumeData);

    const shortPrompt = `You are an ATS and resume evaluator. 
Analyze the following resume against the given job description. 
Return results ONLY in valid JSON. No extra text.

Resume:
${content.substring(0, 1000)}

Job Description:
${jobDescription || "Not provided"}

Output format:

{
  "score": 0-100,
  "atsScore": 0-100,
  "jobMatchScore": 0-100,
  "strengths": ["Full sentence strength 1", "Full sentence strength 2"],
  "improvements": ["Full sentence improvement 1", "Full sentence improvement 2"],
  "atsAnalysis": {
    "formatting": "Brief analysis",
    "keywords": "Brief analysis",
    "sections": "Brief analysis",
    "readability": "Brief analysis",
    "recommendations": ["Rec 1", "Rec 2"]
  },
  "recommendations": [
    { "category": "Content", "suggestion": "..." },
    { "category": "Skills", "suggestion": "..." },
    { "category": "Format", "suggestion": "..." }
  ]
}`;

    try {
        const aiResponse = await callGroqAPI(shortPrompt, 600);
        const aiJson = safeJsonParse(aiResponse);

        return {
            overallScore: aiJson.score || scores.overallScore,
            atsScore: aiJson.atsScore || scores.atsScore,
            jobMatchScore: aiJson.jobMatchScore || scores.jobMatchScore,

            strengths: (aiJson.strengths || []).map(s => ({
                title: s,
                description: s
            })),

            improvements: (aiJson.improvements || []).map(s => ({
                title: s,
                description: s,
                priority: "High",
                impact: "Significant improvement expected"
            })),

            atsAnalysis: aiJson.atsAnalysis || {
                formatting: "Analysis unavailable",
                keywords: "Analysis unavailable",
                sections: "Analysis unavailable",
                readability: "Analysis unavailable",
                recommendations: []
            },

            recommendations: aiJson.recommendations || [
                { category: "Content", suggestion: "Add internships/projects with measurable outcomes" },
                { category: "Technical Skills", suggestion: "List frameworks/tools (Flask, MySQL, Git)" },
                { category: "Experience", suggestion: "Mention hackathons, certifications" },
                { category: "Format", suggestion: "Add dates for projects, clickable GitHub links" }
            ]
        };

    } catch (error) {
        console.log('⚠️ AI analysis failed, using fallback scores');

        return {
            overallScore: scores.overallScore,
            atsScore: scores.atsScore,
            jobMatchScore: scores.jobMatchScore,

            strengths: [
                {
                    title: "Strong Academic Performance",
                    description: "Excellent academic record showing consistent achievement."
                },
                {
                    title: "Complete Contact Information",
                    description: "Includes email, phone, and links to professional profiles."
                }
            ],

            improvements: [
                {
                    title: "Add a Professional Summary",
                    description: "2–3 line summary at the top highlighting skills and goals.",
                    priority: "High",
                    impact: "Helps recruiters quickly understand your profile"
                },
                {
                    title: "Expand Project Details",
                    description: "Include technologies, features, and outcomes in project descriptions.",
                    priority: "High",
                    impact: "Demonstrates practical technical experience"
                }
            ],

            atsAnalysis: {
                formatting: "Clean but limited analysis available",
                keywords: "Needs improvement - add role-specific keywords",
                sections: "Standard sections present",
                readability: "Good",
                recommendations: [
                    "Add industry keywords (e.g., Software Development, Databases)",
                    "Include relevant coursework and certifications"
                ]
            },

            recommendations: [
                { category: "Content", suggestion: "Add measurable achievements in projects and education" },
                { category: "Skills", suggestion: "Expand with frameworks/tools used" },
                { category: "Format", suggestion: "Maintain consistent formatting and section order" }
            ]
        };
    }
}

// --- Resume analysis endpoint ---
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const jobDescription = req.body.jobDescription || '';
        const filePath = req.file.path;
        const fileContent = fs.readFileSync(filePath, 'utf8');
        fs.unlinkSync(filePath);

        console.log(`Processing resume with ${fileContent.length} characters`);

        const analysis = await analyzeResumeLight(fileContent, jobDescription);
        res.json(analysis);

    } catch (error) {
        console.error('Error analyzing resume:', error);

        if (error.message.includes('rate_limit_exceeded') || error.message.includes('tokens per minute')) {
            res.status(429).json({
                error: 'API rate limit exceeded. Please wait 60 seconds and try again.',
                retryAfter: 60
            });
        } else {
            res.status(500).json({
                error: error.message || 'Failed to analyze resume'
            });
        }
    }
});

// --- Health check endpoint ---
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Resume Reviewer API - AI-enhanced Version',
        model: 'llama-3.1-8b-instant'
    });
});

// --- Models endpoint ---
app.get('/api/models', async (req, res) => {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        const response = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log('AI-powered Resume Analyzer is live');
});
