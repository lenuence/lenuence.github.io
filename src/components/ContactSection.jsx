import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions? We'd love to hear from you</p>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <h3>Discord</h3>
                <p>Join our Discord server for instant support</p>
                <a 
                  href="https://discord.gg/7nfBD3PCQy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Join Discord →
                </a>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🛒</div>
                <h3>Eldorado Store</h3>
                <p>Visit our official store on Eldorado</p>
                <a 
                  href="https://www.eldorado.gg/users/StarExeon?tab=Offers&category=Account&pageIndex=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Visit Store →
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <h3>Email Support</h3>
                <p>Send us an email and we'll respond within 24 hours</p>
                <a 
                  href="mailto:lenuence@gmail.com" 
                  className="contact-link"
                >
                  lenuence@gmail.com
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
