import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AccountCard from './AccountCard';
import accountsData from '../data/accounts.json';
import './AccountsSection.css';

const AccountsSection = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'basic', 'premium', 'elite'
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const priceFilters = {
    all: { min: 0, max: Infinity, label: 'All Accounts' },
    basic: { min: 1, max: 10, label: 'Basic ($1-10)' },
    premium: { min: 10, max: 30, label: 'Premium ($10-30)' },
    elite: { min: 30, max: Infinity, label: 'Elite ($30+)' }
  };

  useEffect(() => {
    loadAccounts();

    // Listen for accounts update events
    const handleAccountsUpdate = () => {
      loadAccounts();
    };

    // Listen for filter changes from pricing section
    const handleFilterChange = (e) => {
      const filter = e.detail.filter;
      setActiveFilter(filter);
    };

    window.addEventListener('accountsUpdated', handleAccountsUpdate);
    window.addEventListener('filterAccounts', handleFilterChange);

    return () => {
      window.removeEventListener('accountsUpdated', handleAccountsUpdate);
      window.removeEventListener('filterAccounts', handleFilterChange);
    };
  }, []);

  useEffect(() => {
    applyFilter();
  }, [accounts, activeFilter]);

  const loadAccounts = () => {
    // Load deleted account IDs (accounts to hide from JSON)
    const deletedIds = JSON.parse(localStorage.getItem('deleted_account_ids') || '[]');
    
    // Load from localStorage (admin-added accounts)
    const storedAccounts = localStorage.getItem('admin_accounts');
    const adminAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    // Filter out deleted JSON accounts
    const visibleJsonAccounts = accountsData.filter(acc => !deletedIds.includes(acc.id));
    
    // Combine JSON accounts with admin accounts
    // Admin accounts take precedence (no duplicates based on ID)
    const combinedAccounts = [...visibleJsonAccounts];
    
    // Add admin accounts that aren't already in visible JSON accounts
    adminAccounts.forEach(adminAcc => {
      const exists = combinedAccounts.find(acc => acc.id === adminAcc.id);
      if (!exists) {
        combinedAccounts.push(adminAcc);
      } else {
        // Update existing account if it's from admin
        const index = combinedAccounts.findIndex(acc => acc.id === adminAcc.id);
        combinedAccounts[index] = adminAcc;
      }
    });
    
    setAccounts(combinedAccounts);
  };

  const applyFilter = () => {
    const filter = priceFilters[activeFilter];
    const filtered = accounts.filter(account => {
      const price = parseFloat(account.price) || 0;
      return price >= filter.min && price <= filter.max;
    });
    setFilteredAccounts(filtered);
  };

  return (
    <section id="accounts" className="accounts-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Available Accounts</h2>
          <p className="section-subtitle">Browse our collection of premium gaming accounts</p>
          
          <div className="filter-buttons">
            {Object.entries(priceFilters).map(([key, filter]) => (
              <button
                key={key}
                className={`filter-button ${activeFilter === key ? 'active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {filteredAccounts.length === 0 ? (
            <div className="no-accounts">
              <p>No accounts found in this price range.</p>
            </div>
          ) : (
            <div className="accounts-grid">
              {filteredAccounts.map((account, index) => (
                <AccountCard key={account.id} account={account} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AccountsSection;