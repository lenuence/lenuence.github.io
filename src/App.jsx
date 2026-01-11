import { useEffect } from 'react';
import { useState } from 'react';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import AccountsSection from './components/AccountsSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import './styles/App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for popstate (back/forward buttons)
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Listen for custom navigation events
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('pushstate', handleNavigation);
    window.addEventListener('replacestate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushstate', handleNavigation);
      window.removeEventListener('replacestate', handleNavigation);
    };
  }, []);

  // Check if we're on the admin route
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage />;
  }

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