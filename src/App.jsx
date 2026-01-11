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