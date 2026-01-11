import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AccountCard from './AccountCard';
import accountsData from '../data/accounts.json';
import './AccountsSection.css';

const AccountsSection = () => {
  const [accounts, setAccounts] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    setAccounts(accountsData);
  }, []);

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
          
          <div className="accounts-grid">
            {accounts.map((account, index) => (
              <AccountCard key={account.id} account={account} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccountsSection;
