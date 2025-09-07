# 🤖 Smart Resume Reviewer - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation Guide](#installation-guide)
4. [Quick Start Guide](#quick-start-guide)
5. [File Structure](#file-structure)
6. [API Documentation](#api-documentation)
7. [Usage Instructions](#usage-instructions)
8. [Troubleshooting](#troubleshooting)
9. [Configuration](#configuration)
10. [Development](#development)

## 🎯 Project Overview

The **AI Resume Reviewer** is a full-stack web application that provides professional resume analysis using AI. It offers comprehensive feedback including overall scoring, ATS (Applicant Tracking System) compatibility analysis, and detailed improvement recommendations.

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **AI Service**: Groq API (Llama 3.1 model)
- **File Upload**: Multer middleware
- **Environment**: dotenv for configuration

## ✨ Features

### Core Features
- **Resume Upload**: Support for PDF, DOC, DOCX, and TXT files (up to 5MB)
- **AI Analysis**: Powered by Llama 3.1 8B Instant model via Groq API
- **Three-Score System**:
  - Overall Resume Quality Score (0-100)
  - ATS Compatibility Score (0-100) 
  - Job Match Score (0-100)
- **Job Description Matching**: Optional job description input for targeted analysis
- **Detailed Feedback**: Comprehensive strengths, improvements, and recommendations

### Analysis Components
1. **Strengths Analysis**: Identifies strong points in the resume
2. **Priority Improvements**: Actionable suggestions with impact estimates
3. **ATS Analysis**: Formatting, keywords, sections, and readability assessment
4. **Professional Recommendations**: Categorized suggestions for enhancement

### UI/UX Features
- **Dark Theme**: Modern glassmorphism design
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Real-time Feedback**: Loading indicators and progress bars
- **Interactive Elements**: Hover effects and smooth animations
- **Error Handling**: User-friendly error messages

## 🛠 Installation Guide

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Text Editor** (VS Code, Notepad++, or any preferred editor)
- **Web Browser** (Chrome, Firefox, Edge, Safari)
- **Groq API Key** - [Get free key here](https://console.groq.com)

### Step-by-Step Installation

#### Step 1: Create Project Directory
```cmd
mkdir ai-resume-reviewer
cd ai-resume-reviewer
```

#### Step 2: Create Package Configuration
Create `package.json`:
```json
{
  "name": "ai-resume-reviewer",
  "version": "1.0.0",
  "description": "AI-powered resume reviewer with ATS scoring",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["resume", "ai", "ats", "career", "analysis"],
  "author": "Your Name",
  "license": "MIT"
}
```

#### Step 3: Environment Configuration
Create `.env` file:
```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
PORT=3000

# Optional: Development settings
NODE_ENV=development
```

#### Step 4: Install Dependencies
```cmd
npm install
```

#### Step 5: Create Required Directories
```cmd
mkdir public
mkdir uploads
```

## 🚀 Quick Start Guide

### Using the BAT File (Recommended)
1. Double-click `start-resume-reviewer.bat`
2. Wait for "Server running on port 3000" message
3. Browser will automatically open to `http://localhost:3000`
4. Close the CMD window to stop the server

### Manual Start
```cmd
npm start
```

### First Time Setup
1. Get your Groq API key from [console.groq.com](https://console.groq.com)
2. Replace `your_groq_api_key_here` in `.env` file
3. Run the BAT file or `npm start`
4. Open browser to `http://localhost:3000`

## 📁 File Structure

```
ai-resume-reviewer/
├── node_modules/              # Dependencies (auto-generated)
├── public/                    # Frontend files
│   └── index.html            # Main UI file
├── uploads/                   # Temporary file storage
├── .env                       # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project configuration
├── package-lock.json         # Dependency lock file
├── server.js                 # Backend server
├── start-resume-reviewer.bat # One-click launcher
├── README.md                 # Basic project info
└── DOCUMENTATION.md          # This file
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### POST /api/analyze-resume
Analyzes uploaded resume file with optional job description.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `resume` (file): Resume file (PDF, DOC, DOCX, TXT, max 5MB)
  - `jobDescription` (text, optional): Job description for matching analysis

**Response:**
```json
{
  "overallScore": 85,
  "atsScore": 78,
  "jobMatchScore": 82,
  "strengths": [
    {
      "title": "Strong Technical Skills",
      "description": "Well-documented programming languages and frameworks."
    }
  ],
  "improvements": [
    {
      "title": "Add Professional Summary",
      "description": "Include a 2-3 line summary highlighting key value proposition.",
      "priority": "High",
      "impact": "Improves recruiter engagement by 40%"
    }
  ],
  "atsAnalysis": {
    "formatting": "Good - Clean structure with clear sections",
    "keywords": "Moderate - Missing some key industry terms",
    "sections": "Standard sections present",
    "readability": "Excellent - Easy to parse for ATS",
    "recommendations": [
      "Add more relevant keywords naturally",
      "Use consistent date formatting"
    ]
  },
  "recommendations": [
    {
      "category": "Content",
      "suggestion": "Add 2-3 more quantified achievements per role"
    }
  ]
}
```

#### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Resume Reviewer API is running with Groq",
  "model": "llama-3.1-8b-instant"
}
```

#### GET /api/models
Lists available AI models.

**Response:**
```json
{
  "data": [
    {
      "id": "llama-3.1-8b-instant",
      "object": "model",
      "created": 1234567890,
      "owned_by": "meta"
    }
  ]
}
```

## 📖 Usage Instructions

### Basic Usage
1. **Start the Application**: Double-click `start-resume-reviewer.bat`
2. **Upload Resume**: Click "Choose File" and select your resume
3. **Add Job Description** (Optional): Paste job posting for targeted analysis
4. **Analyze**: Click "Analyze Resume with AI"
5. **Review Results**: View scores and detailed feedback

### Understanding Scores

#### Overall Score (0-100)
- **90-100**: Excellent resume, ready for applications
- **80-89**: Very good, minor improvements needed
- **70-79**: Good foundation, some enhancements required
- **60-69**: Needs significant improvements
- **Below 60**: Requires major revision

#### ATS Score (0-100)
- **85-100**: Excellent ATS compatibility
- **70-84**: Good, will pass most ATS systems
- **55-69**: Moderate, may have issues with some systems
- **Below 55**: Likely to be filtered out by ATS

#### Job Match Score (0-100)
- **90-100**: Excellent match for the role
- **80-89**: Very good alignment
- **70-79**: Good match with some gaps
- **60-69**: Moderate fit, needs optimization
- **Below 60**: Poor match, significant changes needed

### Best Practices
1. **File Format**: Use PDF or DOCX for best results
2. **Job Description**: Always include for better analysis
3. **File Size**: Keep under 5MB for optimal processing
4. **Content**: Ensure resume has clear sections and formatting

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Server Won't Start
**Problem**: "EADDRINUSE: address already in use"
**Solution**: 
- Change port in `.env` file: `PORT=3001`
- Or kill process using port 3000: `netstat -ano | findstr :3000`

#### API Key Issues
**Problem**: "GROQ_API_KEY not found"
**Solutions**:
- Check `.env` file exists and has correct key
- Ensure no spaces around `=` in `.env`
- Restart server after adding key
- Verify key is valid at [console.groq.com](https://console.groq.com)

#### File Upload Fails
**Problem**: Upload doesn't work
**Solutions**:
- Check file size (max 5MB)
- Verify file format (PDF, DOC, DOCX, TXT)
- Ensure `uploads/` directory exists
- Check file permissions

#### Analysis Fails
**Problem**: "Failed to analyze resume"
**Solutions**:
- Check API quota at Groq console
- Verify internet connection
- Try different model in `server.js`
- Check server logs for detailed error

#### Frontend Not Loading
**Problem**: Page won't open
**Solutions**:
- Verify server is running
- Check `http://localhost:3000`
- Clear browser cache
- Try different browser
- Check `public/index.html` exists

### Debug Mode
Enable detailed logging by adding to `.env`:
```env
NODE_ENV=development
DEBUG=true
```

## ⚙️ Configuration

### Environment Variables
```env
# Required
GROQ_API_KEY=your_api_key_here

# Optional
PORT=3000                    # Server port (default: 3000)
NODE_ENV=production         # Environment mode
MAX_FILE_SIZE=5242880       # Max upload size in bytes (5MB)
UPLOAD_DIR=uploads          # Upload directory
```

### Model Configuration
To change AI models, edit `server.js`:
```javascript
const requestBody = {
    model: "llama-3.1-8b-instant", // Change this line
    // Available models:
    // - llama-3.1-8b-instant (fast, recommended)
    // - llama-3.1-70b-versatile (slower, more capable)
    // - mixtral-8x7b-32768 (alternative)
    // - gemma2-9b-it (Google model)
};
```

### Frontend Customization
Edit `public/index.html` to customize:
- Colors and themes
- Text and labels
- Layout and styling
- Feature toggles

## 🔄 Development

### Adding New Features

#### Adding New Analysis Categories
1. Update the AI prompt in `server.js`
2. Add new sections to the JSON response format
3. Update frontend display in `public/index.html`

#### Modifying Scoring Logic
1. Edit the AI prompt to change scoring criteria
2. Update score display ranges if needed
3. Modify progress bar calculations

#### Adding File Type Support
1. Update multer configuration in `server.js`
2. Add new file type to frontend accept attribute
3. Implement parsing logic for new formats

### Testing
- **Health Check**: `http://localhost:3000/api/health`
- **Models Check**: `http://localhost:3000/api/models`
- **Upload Test**: Use sample resume files
- **Error Testing**: Try invalid files and API keys

### Performance Optimization
1. **File Processing**: Stream large files instead of loading into memory
2. **Caching**: Add Redis for API response caching
3. **Rate Limiting**: Implement request rate limiting
4. **Monitoring**: Add logging and analytics

### Security Considerations
1. **File Validation**: Verify file types and scan for malware
2. **Input Sanitization**: Clean user inputs before processing
3. **API Keys**: Use environment variables, never commit keys
4. **CORS**: Configure appropriate CORS policies
5. **HTTPS**: Use SSL certificates in production

## 📊 API Limits and Costs

### Groq Free Tier
- **Requests**: 14,400 per day
- **Tokens**: ~1.4M tokens per day
- **Models**: Access to all free models
- **Rate Limit**: ~10 requests per second

### Alternative Services
- **Hugging Face**: 1,000 requests/month
- **OpenRouter**: $5 free credits
- **Together AI**: $25 free credits monthly

## 🎯 Future Enhancements

### Planned Features
1. **Multi-language Support**: Support for resumes in different languages
2. **Industry-specific Analysis**: Tailored feedback for different industries
3. **Resume Templates**: Generate improved resume versions
4. **Batch Processing**: Analyze multiple resumes at once
5. **Export Reports**: PDF/Word reports of analysis results
6. **User Accounts**: Save analysis history and preferences
7. **Comparison Tool**: Compare multiple resume versions
8. **Integration**: Connect with job boards and LinkedIn

### Technical Improvements
1. **Database Integration**: Store analysis results
2. **Authentication**: User login system
3. **File Processing**: Better PDF text extraction
4. **Real-time Updates**: WebSocket for live analysis
5. **Mobile App**: React Native mobile version

## 📞 Support

### Getting Help
1. **Check this documentation** first
2. **Review troubleshooting section**
3. **Check GitHub issues** (if applicable)
4. **Contact developer** for specific issues

### Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Groq API Documentation](https://console.groq.com/docs)
- [Multer Documentation](https://github.com/expressjs/multer)

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request
5. Follow code style guidelines

---

## 📝 License

MIT License - Feel free to use, modify, and distribute this project.

## 🙏 Acknowledgments

- **Groq** for providing free AI API access
- **Meta** for the Llama models
- **Express.js** community for the web framework
- **Node.js** foundation for the runtime environment

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Author**: Parimal Mishra  
**Contact**: parimalmishrawork@gmail.com
