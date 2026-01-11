import { useState, useEffect } from 'react';
import './TicketList.css';

const TicketList = ({ currentUser, isAdmin, onSelectTicket }) => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, active, completed

  useEffect(() => {
    loadTickets();
    
    // Check for selected ticket ID
    const selectedTicketId = localStorage.getItem('selected_ticket_id');
    if (selectedTicketId) {
      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const ticket = allTickets.find(t => t.id === selectedTicketId);
      if (ticket) {
        onSelectTicket(ticket);
        localStorage.removeItem('selected_ticket_id');
      }
    }
    
    // Listen for ticket updates
    const handleTicketUpdate = () => {
      loadTickets();
    };
    
    window.addEventListener('ticketUpdated', handleTicketUpdate);
    return () => window.removeEventListener('ticketUpdated', handleTicketUpdate);
  }, [currentUser, isAdmin, onSelectTicket]);

  const loadTickets = () => {
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    
    // Filter tickets based on user role
    let filtered = allTickets;
    if (!isAdmin) {
      filtered = allTickets.filter(t => t.customerId === currentUser.id);
    }
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(t => t.status === filter);
    }
    
    // Sort by updated date (newest first)
    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    setTickets(filtered);
  };

  useEffect(() => {
    loadTickets();
  }, [filter]);

  return (
    <div className="ticket-list-container">
      <div className="ticket-list-header">
        <h2>{isAdmin ? 'All Tickets' : 'My Tickets'}</h2>
        <div className="ticket-filters">
          {['all', 'pending', 'active', 'completed'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="no-tickets">
          <p>No tickets found.</p>
        </div>
      ) : (
        <div className="tickets-grid">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className="ticket-card"
              onClick={() => onSelectTicket(ticket)}
            >
              <div className="ticket-card-header">
                <span className="ticket-id">#{ticket.id.slice(-6)}</span>
                <span className={`ticket-status-badge ${ticket.status}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="ticket-card-body">
                <h3>{ticket.accountName}</h3>
                <p className="ticket-price">${ticket.accountPrice}</p>
                {isAdmin && (
                  <p className="ticket-customer">
                    Customer: {ticket.customerName}
                  </p>
                )}
                <p className="ticket-preview">
                  {ticket.messages[0]?.text?.substring(0, 100)}...
                </p>
              </div>
              <div className="ticket-card-footer">
                <span className="ticket-date">
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </span>
                <span className="ticket-messages-count">
                  {ticket.messages.length} messages
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
