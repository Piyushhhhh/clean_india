# 📐 Project Structure

Detailed breakdown of the CleanConnect India codebase.

---

## 🗂️ Directory Tree

```
clean_india/
│
├── 📁 src/                          # Source code
│   │
│   ├── 📁 components/               # React components
│   │   ├── 📁 common/              # Shared components
│   │   │   ├── ImageUpload.jsx     # Photo upload & compression
│   │   │   ├── LocationPicker.jsx  # Location search + GPS
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Spinner.jsx         # Loading indicator
│   │   │   └── WasteTypeCard.jsx   # Waste category selector
│   │   │
│   │   ├── 📁 citizen/             # Citizen-specific components
│   │   │   ├── ReportCard.jsx      # Display single report
│   │   │   └── ReportForm.jsx      # Garbage reporting form
│   │   │
│   │   └── 📁 driver/              # Driver-specific components
│   │       ├── FleetMap.jsx        # Visual map component
│   │       ├── StatCard.jsx        # Statistics display card
│   │       └── TaskCard.jsx        # Collection task card
│   │
│   ├── 📁 pages/                    # Main page components
│   │   ├── CitizenDashboard.jsx    # Citizen view page
│   │   └── DriverDashboard.jsx     # Driver view page
│   │
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── useAuth.js              # Authentication logic
│   │   └── useReports.js           # Reports data fetching
│   │
│   ├── 📁 services/                 # API & business logic
│   │   └── reportService.js        # CRUD operations for reports
│   │
│   ├── 📁 utils/                    # Utility functions
│   │   ├── imageCompression.js     # Image processing
│   │   └── geolocation.js          # GPS & location utilities
│   │
│   ├── 📁 config/                   # Configuration files
│   │   └── firebase.js             # Firebase initialization
│   │
│   ├── 📁 data/                     # Static data
│   │   └── cities.js               # Indian cities list
│   │
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles (Tailwind)
│
├── 📁 public/                       # Static assets (served as-is)
│
├── 📄 index.html                    # HTML template
├── 📄 package.json                  # Dependencies & scripts
├── 📄 vite.config.js                # Vite build configuration
├── 📄 tailwind.config.js            # Tailwind CSS configuration
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 .eslintrc.cjs                 # ESLint configuration
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .npmrc                        # NPM configuration
│
├── 📄 README.md                     # Main documentation
├── 📄 QUICKSTART.md                 # Quick start guide
├── 📄 ENV_SETUP.md                  # Environment setup
├── 📄 FIREBASE_SETUP.md             # Firebase configuration
├── 📄 PROJECT_STRUCTURE.md          # This file
└── 📄 env.template                  # Environment template

```

---

## 📦 Component Hierarchy

```
App
├── Navbar
│   └── (Role switcher, Points display)
│
├── CitizenDashboard (if role === 'citizen')
│   ├── ReportForm
│   │   ├── WasteTypeCard (×3)
│   │   ├── ImageUpload
│   │   ├── LocationPicker
│   │   └── (Form inputs)
│   │
│   └── ReportCard (×N)
│       └── (Report details)
│
└── DriverDashboard (if role === 'driver')
    ├── StatCard (×4)
    ├── TaskCard (×N)
    │   └── (Task details)
    └── FleetMap
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                      Firebase Auth                       │
│              (Anonymous Authentication)                  │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│                     useAuth Hook                         │
│              Returns: { user, loading }                  │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│                  Firestore Database                      │
│   Collection: /artifacts/{appId}/public/data/reports    │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│                  useReports Hook                         │
│           Returns: { reports, loading }                  │
│              (Real-time listener)                        │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│                    App Component                         │
│         Distributes data to child components             │
└─────────────┬───────────────────────────┬───────────────┘
              │                           │
              ▼                           ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ CitizenDashboard │      │ DriverDashboard  │
    │                  │      │                  │
    │ - ReportForm     │      │ - StatCard       │
    │ - ReportCard     │      │ - TaskCard       │
    └──────────────────┘      │ - FleetMap       │
                              └──────────────────┘
```

---

## 🎯 Key Files Explained

### **src/App.jsx**
The root component that:
- Manages authentication state
- Handles role switching (citizen/driver)
- Orchestrates data flow between components
- Manages user points

### **src/config/firebase.js**
Firebase initialization:
- Parses Firebase config from environment
- Exports `auth`, `db`, and `appId` for use throughout app

### **src/hooks/useAuth.js**
Custom hook for authentication:
- Initializes Firebase Auth
- Handles anonymous sign-in
- Returns current user and loading state

### **src/hooks/useReports.js**
Custom hook for real-time data:
- Sets up Firestore listener
- Returns reports array sorted by creation date
- Auto-updates when data changes

### **src/services/reportService.js**
Business logic for reports:
- `submitReport()` - Create new report
- `updateReportStatus()` - Mark report as completed

### **src/utils/imageCompression.js**
Image processing:
- Compresses photos to 500px width
- Reduces quality to 70% for optimization
- Returns base64 data URL

### **src/utils/geolocation.js**
Location utilities:
- `getCurrentLocation()` - Gets GPS coordinates
- `formatCoordinates()` - Formats coords for display

---

## 🎨 Styling Architecture

### Tailwind CSS Classes Used

**Colors:**
- Primary: `green-600` (brand color)
- Secondary: `teal-600` (accent)
- Success: `green-500/600`
- Warning: `orange-500/600`
- Danger: `red-500/600`
- Neutral: `gray-50` through `gray-900`

**Component Patterns:**
- Cards: `rounded-xl shadow-sm border`
- Buttons: `rounded-lg px-4 py-2 hover:scale-95 transition`
- Inputs: `rounded-lg border-gray-300 focus:ring-2`

**Responsive Design:**
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Grid layouts that adapt to screen size

---

## 🔐 Security Considerations

### Environment Variables
- Firebase credentials stored in `.env`
- `.env` is gitignored (never committed)
- Template provided in `env.template`

### Firebase Security Rules
- Only authenticated users can read/write
- Users can only edit their own reports
- Timestamps server-side to prevent tampering

### Data Validation
- Required fields enforced in forms
- Image compression prevents large uploads
- Status changes validated server-side

---

## 📊 State Management

No external state management library needed!

**Local State:**
- Form inputs (useState)
- UI toggles (role switch)
- User points

**Server State:**
- Firebase Auth (useAuth hook)
- Firestore data (useReports hook)
- Real-time synchronization

---

## 🚀 Build Process

```bash
npm run dev       # Development with hot reload
    ↓
  Vite dev server
    ↓
  React Fast Refresh
    ↓
  http://localhost:3000
```

```bash
npm run build     # Production build
    ↓
  Vite optimization
    ↓
  Minification + Tree shaking
    ↓
  dist/ folder (deploy this!)
```

---

## 🧩 Dependencies

### Core
- `react` - UI library
- `react-dom` - React renderer
- `firebase` - Backend services

### UI
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS

### Build Tools
- `vite` - Fast build tool
- `@vitejs/plugin-react` - React plugin
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing

---

## 📝 Naming Conventions

### Files
- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- Hooks: `useCamelCase.js`
- Config: `lowercase.js`

### Functions
- Components: `PascalCase`
- Regular functions: `camelCase`
- Handlers: `handle*` prefix
- Services: `*Report` suffix

### Variables
- Constants: `UPPER_SNAKE_CASE`
- Regular: `camelCase`
- Components: `PascalCase`

---

## 🔄 Adding New Features

### Add a new component:
1. Create file in `src/components/[category]/`
2. Import in parent component
3. Export default from component file

### Add a new page:
1. Create file in `src/pages/`
2. Import in `App.jsx`
3. Add routing logic

### Add a new utility:
1. Create file in `src/utils/`
2. Export functions
3. Import where needed

---

## 🧪 Testing Strategy

Currently no automated tests, but you can add:

```bash
npm install --save-dev vitest @testing-library/react
```

Recommended test structure:
```
src/
└── __tests__/
    ├── components/
    ├── hooks/
    └── utils/
```

---

## 📚 Further Reading

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Questions?** See [README.md](./README.md) or [QUICKSTART.md](./QUICKSTART.md)

