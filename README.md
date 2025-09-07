# 🤖 AI Resume Reviewer

A professional AI-powered resume analysis tool that provides comprehensive feedback including ATS scoring, strengths analysis, and detailed improvement recommendations.

## 🚀 Quick Start

1. **One-Click Start**: Double-click `start-resume-reviewer.bat`
2. **Get API Key**: Visit [console.groq.com](https://console.groq.com) for free API key
3. **Configure**: Add your API key to `.env` file
4. **Use**: Upload resume at `http://localhost:3000`

## ✨ Features

- **AI-Powered Analysis** using Llama 3.1 model
- **ATS Compatibility Scoring**
- **Job Description Matching**
- **Professional Improvement Suggestions**
- **Dark Modern UI**
- **Free API Usage** (14,400 requests/day)

## 📁 Project Structure

```
ai-resume-reviewer/
├── start-resume-reviewer.bat  # One-click launcher
├── server.js                  # Backend API server
├── public/index.html          # Frontend interface
├── .env                       # API configuration
└── package.json              # Dependencies
```

## 🛠 Manual Setup

```bash
npm install
npm start
```

## 📚 Documentation

See `DOCUMENTATION.md` for complete setup guide, API documentation, and troubleshooting.

## 🔧 Requirements

- Node.js 14+
- Groq API Key (free)
- Modern web browser

## 📞 Support

Check `DOCUMENTATION.md` for detailed troubleshooting and configuration options.

## 📄 License

MIT License - Free for personal and commercial use.

# =====================================

# uploads/.gitkeep
# This file ensures the uploads directory is tracked by git
# The directory is needed for temporary file storage during resume analysis

# =====================================

# package.json (Enhanced version)
{
  "name": "ai-resume-reviewer",
  "version": "1.0.0",
  "description": "AI-powered resume reviewer with ATS scoring and detailed feedback using Groq API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests specified\" && exit 0"
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
  "keywords": [
    "resume",
    "ai",
    "ats",
    "career",
    "analysis",
    "groq",
    "llama",
    "job-search",
    "recruitment"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ai-resume-reviewer"
  },
  "bugs": {
    "url": "https://github.com/yourusername/ai-resume-reviewer/issues"
  },
  "homepage": "https://github.com/yourusername/ai-resume-reviewer#readme",
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
