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

function App() {
  // CRITICAL FIX: Initialize with the current hash. 
  // If the URL is bloxvault.site/#/admin, this will be '#/admin'.
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Listener for hash changes. This is client-side and does not contact the server.
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup the listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array means this runs only once on mount

  // CRITICAL CHECK: Look for the specific hash value
  // We check for '#/admin' and '#/admin/', which HashRouter usually cleans up but manual routing may not.
  if (currentHash === '#/admin' || currentHash === '#/admin/') {
    return <AdminPage />;
  }
  
  // If the hash is empty or anything else, render the main site.
  // This handles URLs like: bloxvault.site, bloxvault.site#, bloxvault.site/#
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