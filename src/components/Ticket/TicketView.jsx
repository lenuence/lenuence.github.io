import { useState, useEffect, useRef } from 'react';
import { PAYMENT_METHODS } from '../../utils/paymentMethods';
import './TicketView.css';

const TicketView = ({ ticket, currentUser, isAdmin, onClose, onUpdateTicket }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [ticket.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: currentUser.id,
      senderName: currentUser.name || 'You',
      timestamp: new Date().toISOString(),
      isAdmin: isAdmin
    };

    const updatedTicket = {
      ...ticket,
      messages: [...ticket.messages, newMessage],
      updatedAt: new Date().toISOString(),
      status: ticket.status === 'pending' && isAdmin ? 'active' : ticket.status
    };

    // Update ticket in localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      tickets[index] = updatedTicket;
      localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    onUpdateTicket(updatedTicket);
    setMessage('');
    setIsLoading(false);
  };

  const handleStatusChange = (status) => {
    // If customer is cancelling, confirm first
    if (!isAdmin && status === 'cancelled') {
      if (!window.confirm('Are you sure you want to cancel this order?')) {
        return;
      }
    }

    const updatedTicket = { ...ticket, status, updatedAt: new Date().toISOString() };
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      tickets[index] = updatedTicket;
      localStorage.setItem('tickets', JSON.stringify(tickets));
    }
    onUpdateTicket(updatedTicket);
    
    if (!isAdmin && status === 'cancelled') {
      // Add a message when customer cancels
      const cancelMessage = {
        id: Date.now().toString(),
        text: 'Order cancelled by customer.',
        sender: currentUser.id,
        senderName: currentUser.name,
        timestamp: new Date().toISOString(),
        isAdmin: false
      };
      const updatedTicketWithMessage = {
        ...updatedTicket,
        messages: [...updatedTicket.messages, cancelMessage]
      };
      tickets[index] = updatedTicketWithMessage;
      localStorage.setItem('tickets', JSON.stringify(tickets));
      onUpdateTicket(updatedTicketWithMessage);
    }
  };

  return (
    <div className="ticket-view">
      <div className="ticket-header">
        <div className="ticket-header-info">
          <h2>Ticket #{ticket.id.slice(-6)}</h2>
          <span className={`ticket-status ${ticket.status}`}>{ticket.status}</span>
        </div>
        <div className="ticket-actions">
          {isAdmin ? (
            <select
              value={ticket.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          ) : (
            ticket.status !== 'cancelled' && ticket.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="cancel-ticket-button"
              >
                Cancel Order
              </button>
            )
          )}
        </div>
        <button onClick={onClose} className="close-button">×</button>
      </div>

      <div className="ticket-info">
        <div className="info-item">
          <strong>Account:</strong> {ticket.accountName}
        </div>
        <div className="info-item">
          <strong>Price:</strong> ${ticket.accountPrice}
        </div>
        <div className="info-item">
          <strong>Customer:</strong> {ticket.customerName} ({ticket.customerEmail})
        </div>
      </div>

      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <div className="payment-list">
          <div className="payment-item">
            <strong>PayPal:</strong> {PAYMENT_METHODS.paypal}
          </div>
          <div className="payment-item">
            <strong>Venmo:</strong> {PAYMENT_METHODS.venmo}
          </div>
          <div className="payment-item">
            <strong>CashApp:</strong> {PAYMENT_METHODS.cashapp}
          </div>
          <div className="payment-item">
            <strong>Zelle:</strong> {PAYMENT_METHODS.zelle}
          </div>
          <div className="payment-item">
            <strong>Crypto (BTC):</strong> {PAYMENT_METHODS.crypto}
          </div>
        </div>
        <p className="payment-note">
          Please send payment using one of the methods above. Once payment is confirmed, 
          you will receive your account credentials.
        </p>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === currentUser.id ? 'sent' : 'received'} ${msg.isAdmin ? 'admin' : ''}`}
            >
              <div className="message-header">
                <span className="message-sender">{msg.senderName}</span>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows="3"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
