import { useState, useEffect } from 'react';
import UserAuth from '../components/Ticket/UserAuth';
import TicketList from '../components/Ticket/TicketList';
import TicketView from '../components/Ticket/TicketView';
import { getPaymentMethodsText } from '../utils/paymentMethods';
import './TicketPage.css';

const TicketPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('current_user');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // Check if admin (you can customize this)
      const adminPassword = localStorage.getItem('admin_authenticated');
      setIsAdmin(adminPassword === 'true');

      // Check for pending ticket account after login
      const pendingAccount = localStorage.getItem('pending_ticket_account');
      if (pendingAccount) {
        const account = JSON.parse(pendingAccount);
        handleCreateTicket(account);
        localStorage.removeItem('pending_ticket_account');
      }

      // Check for selected ticket ID (from Purchase On-Site)
      const selectedTicketId = localStorage.getItem('selected_ticket_id');
      if (selectedTicketId) {
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        const ticket = tickets.find(t => t.id === selectedTicketId);
        if (ticket) {
          setSelectedTicket(ticket);
        }
        localStorage.removeItem('selected_ticket_id');
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Check admin status
    const adminPassword = localStorage.getItem('admin_authenticated');
    setIsAdmin(adminPassword === 'true');
    
    // Check for pending ticket after login
    const pendingAccount = localStorage.getItem('pending_ticket_account');
    if (pendingAccount) {
      const account = JSON.parse(pendingAccount);
      handleCreateTicket(account);
      localStorage.removeItem('pending_ticket_account');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    setCurrentUser(null);
    setSelectedTicket(null);
    setIsAdmin(false);
  };

  const handleCreateTicket = (account) => {
    if (!currentUser) {
      // Store account for later
      localStorage.setItem('pending_ticket_account', JSON.stringify(account));
      return;
    }

    const paymentMethodsText = getPaymentMethodsText();
    
    const newTicket = {
      id: Date.now().toString(),
      accountId: account.id,
      accountName: account.name,
      accountPrice: account.price,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      status: 'pending',
      messages: [{
        id: Date.now().toString(),
        text: `I would like to purchase ${account.name} for $${account.price}.\n\n${paymentMethodsText}`,
        sender: currentUser.id,
        senderName: currentUser.name,
        timestamp: new Date().toISOString(),
        isAdmin: false
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    window.dispatchEvent(new CustomEvent('ticketUpdated'));
    setSelectedTicket(newTicket);
  };

  const handleUpdateTicket = (updatedTicket) => {
    setSelectedTicket(updatedTicket);
    window.dispatchEvent(new CustomEvent('ticketUpdated'));
  };

  if (!currentUser) {
    return <UserAuth onLogin={handleLogin} />;
  }

  return (
    <div className="ticket-page">
      <div className="ticket-page-header">
        <h1>Ticket System</h1>
        <div className="header-actions">
          <span className="user-info">
            {currentUser.name} ({currentUser.email})
          </span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {selectedTicket ? (
        <TicketView
          ticket={selectedTicket}
          currentUser={currentUser}
          isAdmin={isAdmin}
          onClose={() => setSelectedTicket(null)}
          onUpdateTicket={handleUpdateTicket}
        />
      ) : (
        <TicketList
          currentUser={currentUser}
          isAdmin={isAdmin}
          onSelectTicket={setSelectedTicket}
        />
      )}
    </div>
  );
};

export default TicketPage;