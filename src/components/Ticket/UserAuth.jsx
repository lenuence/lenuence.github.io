import { useState } from 'react';
import './UserAuth.css';

const UserAuth = ({ onLogin, onCreateAccount }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isLogin) {
      // Login
      const users = JSON.parse(localStorage.getItem('ticket_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('current_user', JSON.stringify({ id: user.id, email: user.email, name: user.name }));
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Create account
      if (!name || !email || !password) {
        setError('All fields are required');
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem('ticket_users') || '[]');
      
      if (users.find(u => u.email === email)) {
        setError('Email already registered');
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In production, hash this!
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('ticket_users', JSON.stringify(users));
      localStorage.setItem('current_user', JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name }));
      
      onLogin(newUser);
    }

    setIsLoading(false);
  };

  return (
    <div className="user-auth-container">
      <div className="user-auth-box">
        <h1 className="auth-title">{isLogin ? 'Login' : 'Create Account'}</h1>
        <p className="auth-subtitle">
          {isLogin 
            ? 'Login to access your tickets' 
            : 'Create an account to purchase accounts on-site'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <div className="auth-switch">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="switch-button"
          >
            {isLogin 
              ? "Don't have an account? Create one" 
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
