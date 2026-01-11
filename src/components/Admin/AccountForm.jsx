import { useState, useEffect } from 'react';
import './AccountForm.css';

const AccountForm = ({ account, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    game: '',
    level: '',
    items: '',
    discordLink: '',
    eldoradoLink: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || '',
        price: account.price?.toString() || '',
        description: account.description || '',
        image: account.image || '',
        game: account.game || '',
        level: account.level?.toString() || '',
        items: account.items?.join(', ') || '',
        discordLink: account.discordLink || '',
        eldoradoLink: account.eldoradoLink || '',
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Account name is required';
    if (!formData.price || isNaN(parseFloat(formData.price))) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.game.trim()) newErrors.game = 'Game name is required';
    if (!formData.discordLink.trim()) newErrors.discordLink = 'Discord link is required';
    if (!formData.eldoradoLink.trim()) newErrors.eldoradoLink = 'Eldorado link is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Process items (split by comma and trim)
    const itemsArray = formData.items
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    onSubmit({
      ...formData,
      items: itemsArray,
    });
  };

  return (
    <div className="account-form-container">
      <div className="account-form-box">
        <h2 className="form-title">
          {account ? 'Edit Account' : 'Add New Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Account Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Roblox Account"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Price ($) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="49.99"
                step="0.01"
                min="0"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the account... (Use line breaks for formatting)"
              rows="10"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <small className="form-hint">Press Enter for line breaks. Format: LVL 2800 | 42M+ BELI (new line) RACE: HUMAN V3</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="image">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/account1.png"
              />
            </div>

            <div className="form-group">
              <label htmlFor="game">
                Game <span className="required">*</span>
              </label>
              <input
                type="text"
                id="game"
                name="game"
                value={formData.game}
                onChange={handleChange}
                placeholder="e.g., Roblox, Fortnite"
                className={errors.game ? 'error' : ''}
              />
              {errors.game && <span className="error-text">{errors.game}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <input
                type="number"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                placeholder="150"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="items">Items (comma-separated)</label>
            <input
              type="text"
              id="items"
              name="items"
              value={formData.items}
              onChange={handleChange}
              placeholder="Dominus Empyreus, Korblox Deathspeaker, Rainbow Shaggy"
            />
            <small className="form-hint">Separate multiple items with commas</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="discordLink">
                Discord Link <span className="required">*</span>
              </label>
              <input
                type="url"
                id="discordLink"
                name="discordLink"
                value={formData.discordLink}
                onChange={handleChange}
                placeholder="https://discord.gg/..."
                className={errors.discordLink ? 'error' : ''}
              />
              {errors.discordLink && <span className="error-text">{errors.discordLink}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="eldoradoLink">
                Eldorado Link <span className="required">*</span>
              </label>
              <input
                type="url"
                id="eldoradoLink"
                name="eldoradoLink"
                value={formData.eldoradoLink}
                onChange={handleChange}
                placeholder="https://www.eldorado.gg/..."
                className={errors.eldoradoLink ? 'error' : ''}
              />
              {errors.eldoradoLink && <span className="error-text">{errors.eldoradoLink}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {account ? 'Update Account' : 'Add Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
