import { useEffect, useState } from 'react';
import AdminPage from './pages/AdminPage';
import TicketPage from './pages/TicketPage';
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
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Listen for pathname changes
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    // Listen for hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    // Check initial path/hash
    setCurrentPath(window.location.pathname);
    setCurrentHash(window.location.hash);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Check if we're on the admin route (path or hash)
  const isAdminRoute = currentPath === '/admin' || 
                       currentPath === '/admin/' || 
                       currentHash === '#admin' ||
                       currentHash.toLowerCase().includes('admin');

  // Check if we're on the tickets route
  const isTicketRoute = currentPath === '/tickets' || 
                        currentPath === '/tickets/' || 
                        currentHash === '#tickets' ||
                        currentHash.toLowerCase().includes('tickets');

  if (isAdminRoute) {
    return <AdminPage />;
  }

  if (isTicketRoute) {
    return <TicketPage />;
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