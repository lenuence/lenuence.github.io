import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Kicker',
      game: 'Elite customer',
      rating: 5,
      text: 'Got my premium Roblox account within minutes! The process was smooth and the account was exactly as described. Highly recommended!'
    },
    {
      name: 'Phillian',
      game: 'Blox Fruits Enthusiast',
      rating: 5,
      text: 'Blox Vault saved me so much time. Found the perfect Fortnite account with all the skins I wanted. Customer support was excellent too.'
    },
    {
      name: 'Super',
      game: 'Username collecter',
      rating: 5,
      text: 'Purchased an unverified 4 letter account, definetely going into my collection!'
    },
    {
      name: 'Skullotano',
      game: 'Professional Boxer',
      rating: 5,
      text: 'First time buying a gaming account and I was nervous, but Blox Vault made it so easy. The delivery process gave me peace of mind.'
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from verified buyers</p>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-game">{testimonial.game}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
