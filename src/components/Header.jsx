import './Header.css';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">BLOX VAULT</span>
        </div>
        <nav className="header-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="nav-link">About Us</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link">Features</a>
          <a href="#accounts" onClick={(e) => { e.preventDefault(); scrollToSection('accounts'); }} className="nav-link">Accounts</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} className="nav-link">Pricing</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }} className="nav-link">Testimonials</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="nav-link">Contact</a>
        </nav>
        <div className="header-actions">
          <a 
            href="https://discord.gg/7nfBD3PCQy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header-action-link"
          >
            Discord
          </a>
          <a 
            href="https://www.eldorado.gg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header-action-link"
          >
            Eldorado
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;