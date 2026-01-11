import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './PricingSection.css';

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$1-10',
      description: 'Perfect for beginners',
      features: [
        'Standard account level',
        'Basic item collection',
        'Email support',
        'Instant delivery'
      ]
    },
    {
      name: 'Premium',
      price: '$10-30',
      description: 'Best value for most users',
      features: [
        'High-level accounts',
        'Rare items included',
        'Priority support',
        'Instant delivery',
        'Limited Warranty'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: '$30+',
      description: 'For serious collectors',
      features: [
        'Maximum level accounts',
        'Exclusive rare items',
        '24/7 premium support',
        'Instant delivery',
        'Full account transfer',
        'Lifetime warranty'
      ]
    }
  ];

  return (
    <section id="pricing" className="pricing-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Pricing Tiers</h2>
          <p className="section-subtitle">Choose the perfect account tier for your needs</p>
          
          <div className="pricing-grid">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${tier.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="pricing-name">{tier.name}</h3>
                  <div className="pricing-price">{tier.price}</div>
                  <p className="pricing-description">{tier.description}</p>
                </div>
                <ul className="pricing-features">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="pricing-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    const filterMap = { 'Basic': 'basic', 'Premium': 'premium', 'Elite': 'elite' };
                    const filter = filterMap[tier.name] || 'all';
                    window.dispatchEvent(new CustomEvent('filterAccounts', { detail: { filter } }));
                    document.getElementById('accounts')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="pricing-button"
                >
                  Browse {tier.name} Accounts
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
