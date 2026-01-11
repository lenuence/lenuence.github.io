import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AccountForm from './AccountForm';
import AccountList from './AccountList';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    // Load deleted account IDs (accounts to hide from JSON)
    const deletedIds = JSON.parse(localStorage.getItem('deleted_account_ids') || '[]');
    
    // Load from localStorage (admin-added accounts)
    const storedAccounts = localStorage.getItem('admin_accounts');
    const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    // Load from JSON (original accounts)
    import('../../data/accounts.json').then((module) => {
      const jsonAccounts = module.default || [];
      
      // Filter out deleted JSON accounts
      const visibleJsonAccounts = jsonAccounts.filter(acc => !deletedIds.includes(acc.id));
      
      // Combine both, with admin accounts taking precedence (no duplicates)
      const combinedAccounts = [...visibleJsonAccounts];
      
      // Add admin accounts that aren't already in visible JSON accounts
      adminAccounts.forEach(adminAcc => {
        const exists = combinedAccounts.find(acc => acc.id === adminAcc.id);
        if (!exists) {
          combinedAccounts.push(adminAcc);
        } else {
          // Update existing account if it's been edited via admin
          const index = combinedAccounts.findIndex(acc => acc.id === adminAcc.id);
          combinedAccounts[index] = adminAcc;
        }
      });
      
      setAccounts(combinedAccounts.sort((a, b) => b.id - a.id));
    }).catch(() => {
      setAccounts(adminAccounts.sort((a, b) => b.id - a.id));
    });
  };

  const handleAddAccount = (accountData) => {
    // Generate new ID if adding new account
    const newId = editingAccount 
      ? editingAccount.id 
      : accounts.length > 0 
        ? Math.max(...accounts.map(a => a.id)) + 1 
        : 1;
    
    const account = {
      ...accountData,
      id: newId,
      price: parseFloat(accountData.price),
      level: parseInt(accountData.level) || 0,
    };

    // Get existing admin accounts
    const storedAccounts = localStorage.getItem('admin_accounts');
    const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    if (editingAccount) {
      // Update existing account
      const index = adminAccounts.findIndex(a => a.id === editingAccount.id);
      if (index !== -1) {
        adminAccounts[index] = account;
      } else {
        // If it was from JSON, add it to admin accounts
        adminAccounts.push(account);
      }
    } else {
      // Add new account
      adminAccounts.push(account);
    }

    // Save to localStorage
    localStorage.setItem('admin_accounts', JSON.stringify(adminAccounts));
    
    // Reload accounts
    loadAccounts();
    
    // Reset form
    setShowForm(false);
    setEditingAccount(null);
    
    // Trigger page reload to update main site
    window.dispatchEvent(new CustomEvent('accountsUpdated'));
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleDeleteAccount = (accountId) => {
    if (!window.confirm('Are you sure you want to delete this account?')) {
      return;
    }

    // Load JSON accounts to check if this is a JSON account
    import('../../data/accounts.json').then((module) => {
      const jsonAccounts = module.default || [];
      const isJsonAccount = jsonAccounts.some(acc => acc.id === accountId);
      
      if (isJsonAccount) {
        // For JSON accounts, add to deleted list
        const deletedIds = JSON.parse(localStorage.getItem('deleted_account_ids') || '[]');
        if (!deletedIds.includes(accountId)) {
          deletedIds.push(accountId);
          localStorage.setItem('deleted_account_ids', JSON.stringify(deletedIds));
        }
      } else {
        // For admin accounts, remove from localStorage
        const storedAccounts = localStorage.getItem('admin_accounts');
        const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
        const filtered = adminAccounts.filter(a => a.id !== accountId);
        localStorage.setItem('admin_accounts', JSON.stringify(filtered));
      }
      
      loadAccounts();
      window.dispatchEvent(new CustomEvent('accountsUpdated'));
    }).catch(() => {
      // Fallback: try to remove from admin accounts
      const storedAccounts = localStorage.getItem('admin_accounts');
      const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
      const filtered = adminAccounts.filter(a => a.id !== accountId);
      localStorage.setItem('admin_accounts', JSON.stringify(filtered));
      loadAccounts();
      window.dispatchEvent(new CustomEvent('accountsUpdated'));
    });
  };

  const handleExportJSON = () => {
    const storedAccounts = localStorage.getItem('admin_accounts');
    const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    const dataStr = JSON.stringify(adminAccounts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin_accounts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreDeleted = () => {
    // Clear the deleted accounts list to restore all JSON accounts
    localStorage.removeItem('deleted_account_ids');
    loadAccounts();
    window.dispatchEvent(new CustomEvent('accountsUpdated'));
    alert('All deleted accounts have been restored!');
  };

  const handleClearAdminAccounts = () => {
    if (!window.confirm('Are you sure you want to clear ALL accounts (including original examples)? This will hide all JSON accounts and remove all admin-added accounts. This can be undone by clicking "Restore Deleted".')) {
      return;
    }
    
    // Clear admin accounts
    localStorage.removeItem('admin_accounts');
    
    // Hide all JSON accounts by adding all their IDs to deleted list
    import('../../data/accounts.json').then((module) => {
      const jsonAccounts = module.default || [];
      const allJsonIds = jsonAccounts.map(acc => acc.id);
      localStorage.setItem('deleted_account_ids', JSON.stringify(allJsonIds));
      
      loadAccounts();
      window.dispatchEvent(new CustomEvent('accountsUpdated'));
    }).catch(() => {
      loadAccounts();
      window.dispatchEvent(new CustomEvent('accountsUpdated'));
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-actions">
            <button 
              onClick={() => {
                window.location.hash = '#tickets';
                window.dispatchEvent(new CustomEvent('hashchange'));
              }} 
              className="admin-button secondary"
            >
              View Tickets
            </button>
            <button onClick={handleExportJSON} className="admin-button secondary">
              Export JSON
            </button>
            <button onClick={handleRestoreDeleted} className="admin-button secondary">
              Restore Deleted
            </button>
            <button onClick={handleClearAdminAccounts} className="admin-button secondary">
              Clear All
            </button>
            <button onClick={() => setShowForm(!showForm)} className="admin-button primary">
              {showForm ? 'Cancel' : '+ Add New Account'}
            </button>
            <button onClick={onLogout} className="admin-button danger">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AccountForm
              account={editingAccount}
              onSubmit={handleAddAccount}
              onCancel={() => {
                setShowForm(false);
                setEditingAccount(null);
              }}
            />
          </motion.div>
        )}

        <AccountList
          accounts={accounts}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
