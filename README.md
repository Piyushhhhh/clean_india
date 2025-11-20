# 🌿 CleanConnect India

> **A community-driven waste management platform for India**

CleanConnect India is a modern web application that connects citizens with waste management services, making it easier to report and collect garbage across Indian cities. Built with React, Firebase, and Tailwind CSS.

## 🌐 Live Demo

**🚀 [View Live App](https://piyushhhhh.github.io/clean_india/)**

---

## ✨ Features

### 👥 For Citizens
- **📸 Quick Reporting**: Snap a photo and report garbage locations in seconds
- **📍 Smart Location**: GPS-based location detection or search from 50+ major Indian cities
- **🏷️ Waste Classification**: Categorize waste as Dry, Wet, or Hazardous
- **⚡ Priority Levels**: Mark urgent issues as high priority or emergency
- **🎯 Points System**: Earn points for verified reports
- **📊 Track Progress**: Monitor your reports and collection status

### 🚛 For Drivers/Collectors
- **🗺️ Optimized Routes**: Priority-sorted collection list
- **📈 Real-time Stats**: Track pending stops, completed collections, and efficiency
- **🎯 Smart Prioritization**: Emergency and hazardous waste highlighted
- **🧭 Navigation**: Direct Google Maps integration
- **✅ Quick Actions**: One-tap collection completion

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account and project setup
- Basic knowledge of React

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd clean_india
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` with your Firebase credentials:

```env
VITE_FIREBASE_CONFIG={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_PROJECT.firebaseapp.com","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_PROJECT.appspot.com","messagingSenderId":"YOUR_SENDER_ID","appId":"YOUR_APP_ID"}
VITE_APP_ID=clean-connect-india
```

4. **Set up Firestore Database**

In your Firebase Console, create a Firestore database with the following structure:

```
/artifacts
  /{appId}
    /public
      /data
        /garbage_reports (collection)
          - location (string)
          - coords (object: {lat, lng})
          - wasteType (string)
          - description (string)
          - severity (string)
          - image (string - base64)
          - userId (string)
          - status (string: 'pending' | 'completed')
          - createdAt (timestamp)
          - votes (number)
```

5. **Run the development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

---

## 📁 Project Structure

```
clean_india/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components (Navbar, Spinner, etc.)
│   │   ├── citizen/         # Citizen-specific components
│   │   └── driver/          # Driver-specific components
│   ├── pages/               # Main page components
│   │   ├── CitizenDashboard.jsx
│   │   └── DriverDashboard.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Authentication hook
│   │   └── useReports.js    # Reports data hook
│   ├── services/            # API and service functions
│   │   └── reportService.js # Report CRUD operations
│   ├── utils/               # Utility functions
│   │   ├── imageCompression.js
│   │   └── geolocation.js
│   ├── config/              # Configuration files
│   │   └── firebase.js      # Firebase setup
│   ├── data/                # Static data
│   │   └── cities.js        # Indian cities list
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # This file
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore + Auth)
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

---

## 🎨 Key Components

### Common Components
- `Navbar` - Navigation bar with role switching
- `Spinner` - Loading indicator
- `WasteTypeCard` - Waste category selector
- `LocationPicker` - Location search with GPS
- `ImageUpload` - Photo capture and compression

### Citizen Components
- `ReportForm` - Garbage reporting form
- `ReportCard` - Individual report display

### Driver Components
- `StatCard` - Statistics display card
- `TaskCard` - Collection task card
- `FleetMap` - Visual map representation

---

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Enable Authentication (Anonymous sign-in)
4. Get your Firebase config from Project Settings
5. Add config to `.env` file

### Firestore Security Rules (Example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/garbage_reports/{report} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

---

## 📱 Features Breakdown

### Image Compression
Images are automatically compressed to max 500px width at 70% quality to optimize storage and bandwidth.

### Geolocation
Uses browser's native Geolocation API with high accuracy mode for precise location detection.

### Autocomplete
Smart search across 50+ major Indian cities and landmarks with instant filtering.

### Real-time Updates
Firebase Firestore provides real-time synchronization across all connected clients.

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the Swachh Bharat Abhiyan initiative.

---

## 🙏 Acknowledgments

- Inspired by India's Swachh Bharat Mission
- Built for community-driven waste management
- Icons by [Lucide Icons](https://lucide.dev)

---

## 📞 Support

For support, email cleanconnectindia@example.com or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Add user authentication with phone numbers
- [ ] Implement reward system and leaderboards
- [ ] Add real-time chat between citizens and drivers
- [ ] Integrate actual map services (Google Maps SDK)
- [ ] Add push notifications
- [ ] Support multiple languages (Hindi, regional languages)
- [ ] Add photo verification for completed collections
- [ ] Implement route optimization algorithms
- [ ] Add analytics dashboard for municipalities

---

**Made with 💚 for a Cleaner India**

