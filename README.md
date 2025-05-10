# Research Assistant Frontend

A modern web application for managing and analyzing research papers with features like paper summaries, library management, and collaborative features.

## 🚀 Features

- 📚 Paper Library Management
- 🔍 Advanced Search & Filtering
- ⭐ Favorites & Reading Lists
- 📝 Paper Summaries & Analysis
- 🏷️ Tag Management
- 📊 Activity Tracking
- 🤝 Collaborative Features

## 🛠️ Tech Stack

- React.js with Vite
- Redux for State Management
- TailwindCSS for Styling
- Lucide Icons
- React Router for Navigation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

## 🔧 Installation & Setup

1. **Clone the repository**
   ```powershell
   git clone <repository-url>
   cd research-assistant/frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Environment Setup**
   - Make the `.env` from the `env.txt` file
   - Update the environment variables in `.env` with your configuration

4. **Start the development server**
   ```powershell
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LibraryComponents/  # Library-specific components
│   ├── AllPapersComponents/ # Paper management components
│   └── shared/         # Shared components
├── pages/              # Page components
├── services/           # API services
├── redux/              # Redux store and slices
├── styles/            # Global styles
└── App.jsx            # Root component
```

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses TailwindCSS for styling with custom configurations in:
- `tailwind.config.js` - TailwindCSS configuration
- `src/styles/index.css` - Global styles

## 🔗 API Integration

The frontend communicates with the backend API using axios. API configuration can be found in `src/services/apiService.js`.

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 💻 Tablets (768px and up)
- 🖥️ Desktop computers (1024px and up)

## ⚡ Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Caching strategies
- Bundle size optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
