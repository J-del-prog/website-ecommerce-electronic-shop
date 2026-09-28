import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 1000,
      backgroundColor: 'var(--color-text-primary)',
      color: '#FFFFFF',
      borderLeft: `4px solid ${isSuccess ? '#40C057' : isError ? '#FA5252' : '#339AF0'}`,
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '420px',
      fontFamily: 'var(--font-heading)',
      fontSize: '0.85rem',
      borderRadius: '2px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {isSuccess && <CheckCircle2 size={18} color="#40C057" />}
      {isError && <AlertCircle size={18} color="#FA5252" />}
      {!isSuccess && !isError && <Info size={18} color="#339AF0" />}
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
}
