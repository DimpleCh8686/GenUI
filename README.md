
# 🚀 GenUI - AI Component Generator

A modern web application that uses **Google's Gemini AI** to generate beautiful, responsive UI components from natural language descriptions. Supports 18+ frameworks with live preview and code editing.

### 🌐 [Live Demo](https://gen-ui-generator.vercel.app/) | Try it now! → https://gen-ui-generator.vercel.app/

---

## ✨ Features

### 🤖 AI-Powered Code Generation
- Generate production-ready code from natural language descriptions
- **18+ Framework Support**: HTML/CSS, React, Vue, Angular, Bootstrap, Tailwind, Material UI, Chakra UI, and more
- **Live Preview**: Real-time component preview (HTML-based frameworks)
- **Code Editor**: Monaco editor with syntax highlighting and theme support

### 👤 User Authentication
- Demo users (Dimple & Test) with profile management
- Login/Logout with localStorage persistence
- Editable user profiles with role-based fields

### 🌓 Theme System
- Dark/Light mode toggle with persistent preferences
- Context-based state management
- Full Tailwind CSS dark mode integration

### 💾 Code Management
- Copy to clipboard and download as HTML/TXT files
- Code history persistence
- Refresh preview and new tab viewing

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: React Icons, React Select, React Toastify
- **Code Editor**: Monaco Editor
- **AI**: Google Gemini AI
- **Build Tools**: ESLint, PostCSS, Autoprefixer

---

## 🚀 Quick Start

### Try Live Demo
Visit the deployed application: **[https://gen-ui-generator.vercel.app/](https://gen-ui-generator.vercel.app/)**

Demo users available:
- Email: `dimple@gmail.com` | Password: `1234`
- Email: `test@gmail.com` | Password: `5678`

### Run Locally

#### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd ai-component-generator
npm install
```

### Setup
1. Get Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create `.env.local` file:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Run
```bash
npm run dev
```
Visit `http://localhost:5173`

---

## 📖 Usage

1. **Select Framework** from the dropdown (18+ options available)
2. **Describe Component** in natural language
3. **Click Generate** to get AI-generated code
4. **View Results** in the code editor
5. **Preview** component (HTML frameworks only)
6. **Copy/Download** generated code

### Demo Users
| Email | Password | Role |
|-------|----------|------|
| dimple@gmail.com | 1234 | Developer |
| test@gmail.com | 5678 | Student |

---

## 🎯 Key Features

### AI Code Generation
```javascript
const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a UI component for: ${prompt}...`
});
```

### Theme System
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);
// Toggle between dark/light modes
```

### User Authentication
```javascript
const { user, login, logout } = useContext(UserContext);
// Login with demo users or manage profiles
```

---

## 💡 Examples

### Login Card
```
Description: "Create a modern login card with email/password fields and gradient button"
Framework: HTML + Tailwind CSS
```

### Product Card
```
Description: "Design a product card with image, price, rating, and add to cart button"
Framework: React + Tailwind CSS
```

### Navigation Bar
```
Description: "Build a responsive navbar with logo, menu items, and mobile hamburger"
Framework: HTML + Bootstrap
```

---

## 📦 Development

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🚀 Deployment

### Live on Vercel
This app is currently deployed and live at: **[https://gen-ui-generator.vercel.app/](https://gen-ui-generator.vercel.app/)**

### Deploy Your Own

#### Vercel/Netlify
```bash
npm run build
# Upload dist/ folder to your hosting platform
# Add VITE_GEMINI_API_KEY to environment variables
```

---

## 📝 Tips

- **Be specific** in your component descriptions
- **Choose the right framework** for your project
- **Test in different themes** (dark/light mode)
- **API keys** should never be committed to version control

---

## � Future Scope
- Improved AI prompt understanding for more accurate UI generation
- Generate multiple design variations from a single prompt
- AI-based code optimization (performance, accessibility, best   practices)
- Better support for React, Vue, and Next.js outputs
- Component library to save and reuse generated UI
- Responsive preview tools for different screen sizes
- Improved accessibility support in generated components
- CodeSandbox integration for live preview of React components
- Export code as complete project or reusable components
- Enhanced editor features and formatting
- Backend integration for secure API handling
- Real user authentication system (login/signup)
- Database support for saving user components
- Usage tracking and API rate control
- Performance optimization and caching system
- Scalable architecture for multiple users
- Progressive Web App (PWA) support for better experience
---

## �📄 License

MIT License - Open source and free to use.

---

![GenUI](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-8.0-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan) ![AI](https://img.shields.io/badge/Google%20Gemini-API-purple)

**Happy Coding! 🎉** Generate amazing UI components with AI!
