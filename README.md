Here's a comprehensive README.md file for your project:

```markdown:c:\Users\laxmi\OneDrive\Documents\Projects\AI_Application_tracking\README.md
# AI Job Application Tracker 📊

An intelligent application tracking system that automatically monitors and organizes your job applications by scanning your email inbox using AI.

## 🎯 Features

- **Automated Email Scanning**: Automatically scans your Gmail inbox for job-related emails
- **AI-Powered Analysis**: Uses Google's Gemini AI to extract relevant information from emails
- **Application Status Tracking**: Tracks different stages (Applied, Rejected, Interview Scheduled)
- **Daily Statistics**: Maintains daily stats of applications, interviews, and response rates
- **Duplicate Prevention**: Smart detection to prevent duplicate entries
- **Automatic Updates**: Daily scheduled updates at 10:50 PM

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Google Gemini AI API
- IMAP for email integration
- OAuth2 for Gmail authentication

### Key Libraries
- `imap-simple`: Email fetching and parsing
- `mailparser`: Email content parsing
- `cheerio`: HTML content extraction
- `node-cron`: Scheduled tasks
- `axios`: HTTP requests
- `dotenv`: Environment configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail Account
- Google Cloud Project with Gmail API enabled
- Gemini API key

## ⚙️ Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/AI_Application_tracking.git
```

2. Install dependencies
```bash
cd AI_Application_tracking
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the server
```bash
npm start
```

## 🔄 How It Works

1. **Authentication**: Users authenticate with their Gmail account using OAuth2
2. **Email Scanning**: System scans inbox for job-related emails daily
3. **AI Processing**: Gemini AI extracts company, role, and status information
4. **Data Storage**: Information is stored in MongoDB with duplicate prevention
5. **Statistics**: Daily stats are generated for tracking progress

## 📊 Data Structure

### Application Entry
- Company Name
- Job Role
- Application Status
- Application Date
- Email Reference Hash

### Daily Statistics
- Total Applications
- Interview Count
- Upcoming Tasks
- Response Rate

## 🔒 Security Features

- OAuth2 Authentication
- Token Auto-refresh
- Secure Email Access
- Environment Variable Protection
- No Email Content Storage

## 🤝 Contributing

Feel free to contribute to this project. Open an issue or submit PRs.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI
- Gmail API
- MongoDB Team
- Open Source Community

---
Made with ❤️ by [Your Name]
```

Would you like me to add any additional sections or modify any existing ones?
