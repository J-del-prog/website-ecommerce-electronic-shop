import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast, setAdminAuthenticated } = useStore();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin credentials
    if (username === 'admin' && password === 'admin123') {
      setAdminAuthenticated(true);
      showToast('Login berhasil', 'success');
      navigate('/admin');
    } else {
      showToast('Username atau password salah', 'error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg)',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Admin Login</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Masukkan kredensial untuk masuk ke panel admin</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}>
                <User size={18} />
              </span>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}>
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
