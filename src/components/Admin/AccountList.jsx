import { motion } from 'framer-motion';
import './AccountList.css';

const AccountList = ({ accounts, onEdit, onDelete }) => {
  const getAdminAccounts = () => {
    const stored = localStorage.getItem('admin_accounts');
    return stored ? JSON.parse(stored).map(a => a.id) : [];
  };

  const adminAccountIds = getAdminAccounts();

  return (
    <div className="account-list">
      <h2 className="list-title">
        All Accounts ({accounts.length})
      </h2>

      {accounts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p>No accounts found. Add your first account to get started!</p>
        </div>
      ) : (
        <div className="accounts-grid">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              className={`account-item ${adminAccountIds.includes(account.id) ? 'admin-added' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {adminAccountIds.includes(account.id) && (
                <div className="admin-badge">Admin Added</div>
              )}
              
              <div className="account-item-header">
                <div className="account-item-image">
                  {account.image && account.image !== '' ? (
                    <img src={account.image} alt={account.name} onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }} />
                  ) : null}
                  <div className="account-item-placeholder" style={{ display: account.image && account.image !== '' ? 'none' : 'flex' }}>
                    <span>🎮</span>
                  </div>
                </div>
                <div className="account-item-info">
                  <h3 className="account-item-name">{account.name}</h3>
                  <div className="account-item-price">${account.price}</div>
                </div>
              </div>

              <div className="account-item-details">
                <div className="detail-row">
                  <span className="detail-label">Game:</span>
                  <span className="detail-value">{account.game}</span>
                </div>
                {account.level && (
                  <div className="detail-row">
                    <span className="detail-label">Level:</span>
                    <span className="detail-value">{account.level}</span>
                  </div>
                )}
                {account.items && account.items.length > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Items:</span>
                    <span className="detail-value">{account.items.slice(0, 3).join(', ')}{account.items.length > 3 ? '...' : ''}</span>
                  </div>
                )}
              </div>

              <div className="account-item-actions">
                <button
                  onClick={() => onEdit(account)}
                  className="action-button edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(account.id)}
                  className="action-button delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountList;
