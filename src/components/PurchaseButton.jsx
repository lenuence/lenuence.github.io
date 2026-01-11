import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPaymentMethodsText } from '../utils/paymentMethods';
import './PurchaseButton.css';

const PurchaseButton = ({ discordLink, eldoradoLink, account }) => {
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

  const handleOnSiteClick = () => {
    setIsOpen(false);
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('current_user');
    
    if (!currentUser) {
      // Store account info and redirect to login
      localStorage.setItem('pending_ticket_account', JSON.stringify(account));
      window.location.hash = '#tickets';
      window.dispatchEvent(new CustomEvent('hashchange'));
      return;
    }

    // User is logged in - create ticket immediately
    const user = JSON.parse(currentUser);
    const paymentMethodsText = getPaymentMethodsText();
    
    const ticketId = Date.now().toString();
    const newTicket = {
      id: ticketId,
      accountId: account.id,
      accountName: account.name,
      accountPrice: account.price,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      status: 'pending',
      messages: [
        {
          id: Date.now().toString(),
          text: `I would like to purchase ${account.name} for $${account.price}.\n\n${paymentMethodsText}`,
          sender: user.id,
          senderName: user.name,
          timestamp: new Date().toISOString(),
          isAdmin: false
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    // Store ticket ID to auto-select it
    localStorage.setItem('selected_ticket_id', ticketId);
    
    window.dispatchEvent(new CustomEvent('ticketUpdated'));
    
    // Redirect to tickets page and auto-select the ticket
    window.location.hash = '#tickets';
    // Trigger hashchange to update the app
    window.dispatchEvent(new Event('hashchange'));
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
            <button
              className="dropdown-option"
              onClick={handleOnSiteClick}
            >
              <span className="option-icon">💳</span>
              Purchase On-Site
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseButton;