# 🫁 Pneumonia Image Analysis System

📌 **Project Overview**
Pneumonia Image Analysis System is a modern web application built with React and TypeScript that provides an intuitive interface for managing datasets, training machine learning models, and running real-time pneumonia detection analysis on chest X-ray images. This front-end application enables medical professionals and researchers to perform image analysis workflows efficiently with a user-friendly dashboard and protected authentication system.

The project combines advanced ML capabilities with a sleek, responsive interface powered by React 18, TypeScript, Tailwind CSS, and Vite, allowing users to upload datasets, initiate model training, and perform inference on medical images.

🎯 **Objectives**
- Detect pneumonia presence in chest X-ray images using machine learning
- Provide a secure authentication system for user access
- Enable dataset management (upload, view, and organize medical images)
- Facilitate model training and monitoring
- Deliver real-time image analysis and predictions
- Create an intuitive dashboard for tracking analysis results
- Build a scalable, responsive web application

🛠️ **Technologies Used**
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Routing**: React Router v6
- **UI Components & Icons**: Lucide React
- **Development**: Node.js, npm
- **Code Quality**: ESLint, TypeScript strict mode
- **Backend Integration**: RESTful API (via axios/fetch)

🤖 **Machine Learning Model**
The project integrates with a backend ML pipeline for pneumonia detection from medical images.

**Image Analysis Workflow**
Upload Dataset ↓ Data Preprocessing ↓ Model Training (CNN/ResNet) ↓ Model Evaluation ↓ Real-time Inference ↓ Pneumonia Detection Results ↓ Confidence Scores & Visualization

Code

📊 **Dataset**
The system processes chest X-ray images containing:
- Patient medical imaging data
- Pneumonia positive/negative samples
- Image metadata and labels
- Training and testing splits
- Normalized image arrays

The dataset is managed through the Dataset page where users can:
- Upload new X-ray images
- View existing datasets
- Organize images into training/validation sets
- Monitor dataset statistics

🔍 **Features**
✅ **Authentication System**
- Secure login and registration
- Protected routes for authenticated users
- Auth context for state management
- Session persistence

✅ **Dashboard**
- User welcome interface
- Quick access to all features
- Overview of recent analyses
- Navigation hub for the application

✅ **Dataset Management**
- Upload chest X-ray images
- View and organize datasets
- Dataset preview and metadata
- Training/validation set configuration

✅ **Model Training**
- Start and monitor training jobs
- Real-time training progress tracking
- Model performance metrics
- Training history and logs

✅ **Image Analysis**
- Upload X-ray images for analysis
- Real-time pneumonia prediction
- Confidence scores and probability
- Visual result representation
- Batch processing capability

🌐 **Frontend Interface**
**Authentication Flow**
User → Login/Register Page ↓ Credential Verification ↓ AuthContext Update ↓ Redirect to Dashboard ↓ Access Protected Routes

Code

**Application Workflow**
Dashboard (Central Hub) ↓ ┌───┴────┬─────────┬──────────┐ ↓ ↓ ↓ ↓ Datasets Training Analysis Profile ↓ ↓ ↓ ↓ Upload Start Job Predict Settings

Code

📂 **Project Structure**
pneumonia-analysis/ │ ├── src/ │ ├── components/ # Reusable React components │ │ ├── auth/ # Login, Register components │ │ ├── analysis/ # Image analysis UI │ │ ├── training/ # Training interface │ │ ├── dataset/ # Dataset management │ │ ├── dashboard/ # Dashboard components │ │ └── common/ # ProtectedRoute, shared components │ │ │ ├── pages/ # Page components │ │ ├── LoginPage.tsx │ │ ├── RegisterPage.tsx │ │ ├── DashboardPage.tsx │ │ ├── DatasetPage.tsx │ │ ├── TrainingPage.tsx │ │ └── AnalysisPage.tsx │ │ │ ├── context/ # React contexts │ │ └── AuthContext.tsx # Authentication state management │ │ │ ├── types/ # TypeScript type definitions │ │ └── index.ts │ │ │ ├── data/ # Static data and utilities │ │ │ ├── App.tsx # Main app with routing │ ├── main.tsx # React entry point │ ├── index.css # Global styles │ └── vite-env.d.ts # Vite environment types │ ├── index.html # HTML template ├── package.json # Dependencies and scripts ├── tsconfig.json # TypeScript configuration ├── vite.config.ts # Vite configuration ├── tailwind.config.js # Tailwind CSS configuration ├── postcss.config.js # PostCSS configuration ├── eslint.config.js # ESLint configuration └── README.md # This file

Code

⚙️ **Installation**

**1. Clone the repository**
```bash
git clone https://github.com/Ruthu543/pneumonia-analysis.git
cd pneumonia-analysis
2. Install dependencies

bash
npm install
3. Configure environment (optional) Create a .env file in the project root for backend API configuration:

env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
▶️ Run the Application

Development Server

bash
npm run dev
The application will open at http://localhost:5173

Build for Production

bash
npm run build
Preview Production Build

bash
npm run preview
Lint Code

bash
npm run lint
🔗 Available Routes

Route	Description	Protected
/login	User login page	❌
/register	User registration page	❌
/dashboard	Main dashboard	✅
/datasets	Dataset management	✅
/training	Model training interface	✅
/analysis	Image analysis/inference	✅
/	Home (redirects to dashboard)	✅
🔐 Authentication

Login: Users authenticate with credentials
Registration: New users can create accounts
Protected Routes: ProtectedRoute component blocks unauthorized access
AuthContext: Centralized auth state management
Session Persistence: User session maintained across page refreshes
🌐 Backend Integration This is a front-end only application. It expects a backend API for:

User authentication (login/register endpoints)
Dataset upload and retrieval (/api/datasets)
Training job management (/api/training)
Image analysis inference (/api/analysis/predict)
Model metrics and statistics
Typical API Structure

Code
POST   /api/auth/login          - User login
POST   /api/auth/register       - User registration
GET    /api/datasets            - List datasets
POST   /api/datasets/upload     - Upload dataset
POST   /api/training/start      - Start training job
GET    /api/training/:jobId     - Get training status
POST   /api/analysis/predict    - Run inference
💡 Key Features Explained

1. Authentication System

Location: src/context/AuthContext.tsx
Manages user login state
Protected route wrapper for secure pages
2. Dataset Management

Upload X-ray images
Organize training/validation sets
Metadata tracking
3. Model Training

Initiate training jobs
Monitor progress in real-time
Track performance metrics
4. Image Analysis

Upload patient X-ray images
Get pneumonia predictions
View confidence scores
Download analysis reports
🚀 Future Improvements

Deploy using Vercel or Netlify
Add real-time WebSocket notifications for training progress
Implement image preprocessing and filtering tools
Add batch prediction capabilities
Create downloadable analysis reports (PDF)
Integrate advanced visualization charts
Add multi-language support (i18n)
Implement user profile management
Add email notifications for training completion
Create mobile-responsive design optimizations
Add dark mode support
Implement model versioning system
🛠️ Development Guide

Adding a New Page

Create component in src/pages/NewPage.tsx
Add route in App.tsx
Create sub-components in src/components/
Adding a New Component

Create in appropriate category folder under src/components/
Use Tailwind CSS for styling
Define TypeScript interfaces in src/types/
Backend API Integration

TypeScript
// Example in a component
const response = await fetch(`${process.env.VITE_API_URL}/api/endpoint`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
📝 Environment Variables

Code
VITE_API_URL       - Backend API base URL
VITE_API_TIMEOUT   - API request timeout (ms)
🤝 Contributing

Create a feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request
👩‍💻 Author Ruthu Madhavi Kola

GitHub: https://github.com/Ruthu543

📜 License This project is created for educational and portfolio purposes.

