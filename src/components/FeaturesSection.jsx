import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Multiple payment options with encryption and fraud protection.'
    },
    {
      icon: '✅',
      title: 'Account Verification',
      description: 'Every account is verified for authenticity before listing.'
    },
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Receive your account credentials within minutes of purchase.'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Only verified, high-quality accounts from trusted sellers.'
    },
    {
      icon: '🔔',
      title: 'Price Alerts',
      description: 'Get notified when accounts you want go on sale.'
    },
    {
      icon: '⭐',
      title: 'Seller Ratings',
      description: 'Browse accounts from top-rated sellers with proven track records.'
    }
  ];

  return (
    <section id="features" className="features-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Choose Blox Vault?</h2>
          <p className="section-subtitle">Everything you need for a seamless gaming account shopping experience</p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
