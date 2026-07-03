import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aurora from './components/Aurora';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import './App.css';

const themes = {
  dark: { colors: ['#7cff67', '#B497CF', '#5227FF'], bg: '#0a0a0f' },
  purple: { colors: ['#3A29FF', '#FF94B4', '#FF3232'], bg: '#0a0a0f' },
  ocean: { colors: ['#00d4ff', '#00ff88', '#0077ff'], bg: '#060e1a' },
  fire: { colors: ['#ff6b00', '#ffcc00', '#ff0066'], bg: '#0f0606' },
};

function AppContent() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const theme = themes[currentTheme] || themes.dark;

  return (
    <div className="app" style={{ backgroundColor: theme.bg }}>
      <Aurora colorStops={theme.colors} speed={0.5} blend={0.5} amplitude={1.0} />
      <Header currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/community" element={<Community />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
