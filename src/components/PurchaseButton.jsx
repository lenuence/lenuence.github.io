import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PurchaseButton.css';

const PurchaseButton = ({ discordLink, eldoradoLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDiscordClick = () => {
    window.open(discordLink, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleEldoradoClick = () => {
    window.open(eldoradoLink, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="purchase-button-container" ref={dropdownRef}>
      <motion.button
        className="purchase-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Purchase
        <motion.span
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="dropdown-option"
              onClick={handleDiscordClick}
            >
              <span className="option-icon">💬</span>
              Purchase via Discord
            </button>
            <button
              className="dropdown-option"
              onClick={handleEldoradoClick}
            >
              <span className="option-icon">🛒</span>
              Purchase via Eldorado
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseButton;
