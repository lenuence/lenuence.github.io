import { useEffect, useState } from 'react';
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
  // 1. INITIALIZE WITH HASH (e.g., '#/admin' or '')
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // 2. LISTEN FOR HASH CHANGES ONLY
    const handleHashChange = () => {
      // Get the hash (e.g., '#/admin')
      setCurrentHash(window.location.hash);
    };

    // The 'hashchange' event is key! It doesn't contact the server.
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 3. CHECK AGAINST THE HASH (e.g., '#/admin' or '#/admin/')
  if (currentHash === '#/admin' || currentHash === '#/admin/') {
    return <AdminPage />;
  }

  // Check if the current hash is just empty or '#' (for the homepage)
  if (currentHash === '' || currentHash === '#') {
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
  
  // Optional: Handle other paths or 404s
  return <h1>404 - Page Not Found</h1>; 
}

export default App;