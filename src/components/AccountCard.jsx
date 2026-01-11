import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PurchaseButton from './PurchaseButton';
import './AccountCard.css';

const AccountCard = ({ account, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="account-card"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <div className="card-image-container">
        {!imageError ? (
          <img
            src={account.image}
            alt={account.name}
            className="card-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="card-image-placeholder">
            <span className="placeholder-icon">🎮</span>
            <span className="placeholder-text">{account.game}</span>
          </div>
        )}
        <div className="card-badge">{account.game}</div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{account.name}</h3>
          <div className="card-price">${account.price}</div>
        </div>

        <p className="card-description">{account.description}</p>

        <div className="card-stats">
          <div className="stat-item">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{account.level}</span>
          </div>
        </div>

        {account.items && account.items.length > 0 && (
          <div className="card-items">
            <span className="items-label">Featured Items:</span>
            <div className="items-list">
              {account.items.slice(0, 3).map((item, idx) => (
                <span key={idx} className="item-tag">
                  {item}
                </span>
              ))}
              {account.items.length > 3 && (
                <span className="item-tag more">
                  +{account.items.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="card-footer">
          <PurchaseButton
            discordLink={account.discordLink}
            eldoradoLink={account.eldoradoLink}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AccountCard;
