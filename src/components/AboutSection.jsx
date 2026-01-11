import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Blox Vault</h2>
          <p className="section-subtitle">Your trusted marketplace for premium gaming accounts</p>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">🎮</div>
              <h3>Verified Accounts</h3>
              <p>All accounts are thoroughly verified and tested before listing to ensure authenticity and quality.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🔒</div>
              <h3>Secure Transactions</h3>
              <p>We use industry-leading security measures to protect both buyers and sellers during transactions.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">⚡</div>
              <h3>Instant Delivery</h3>
              <p>Get instant access to your purchased accounts with automated delivery systems.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is available around the clock to assist with any questions or issues.</p>
            </div>
          </div>

          <div className="about-text">
            <p>
              Blox Vault was founded with a mission to create a safe, reliable, and user-friendly marketplace 
              for gaming enthusiasts. We understand the value of your time and investment, which is why we've 
              built a platform that prioritizes security, quality, and customer satisfaction.
            </p>
            <p>
              Whether you're looking for a high-level account to jumpstart your gaming journey or a rare 
              account with exclusive items, Blox Vault connects you with verified sellers offering the best 
              accounts in the market.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
