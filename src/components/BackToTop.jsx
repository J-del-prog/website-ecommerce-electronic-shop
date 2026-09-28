import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        backgroundColor: 'var(--color-text-primary)',
        color: '#FFFFFF',
        border: '2px solid var(--color-surface)',
        borderRadius: '2px',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'transform 0.15s, background-color 0.15s'
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-text-muted)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-text-primary)'}
    >
      <ArrowUp size={20} />
    </button>
  );
}
