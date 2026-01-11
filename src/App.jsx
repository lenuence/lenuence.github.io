import { useEffect, useState } from 'react';
import AdminPage from './pages/AdminPage';
// Import other components...
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import AccountsSection from './components/AccountsSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import './styles/App.css';

// CRITICAL FIX: CHECK THE HASH BEFORE REACT RENDERS
const IS_ADMIN_PATH = window.location.hash.toLowerCase().includes('admin');

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Only listen for subsequent hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 1. Check the hardcoded pre-render variable
  if (IS_ADMIN_PATH) {
    return <AdminPage />;
  }

  // 2. Check the state (for internal navigation)
  if (currentHash.toLowerCase().includes('admin')) {
    return <AdminPage />;
  }
  
  // Default to main site
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AccountsSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}

export default App;