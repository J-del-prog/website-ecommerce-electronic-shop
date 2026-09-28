import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    formatRupiah,
    navigate
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleShopClick = () => {
    setIsCartDrawerOpen(false);
    navigate('shop');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(30, 32, 34, 0.55)',
      backdropFilter: 'blur(3px)'
    }}>
      {/* Backdrop overlay */}
      <div 
        style={{ flex: 1 }} 
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: 'var(--color-surface)',
        borderLeft: '2px solid var(--color-border-dark)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.25s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface-subtle)'
        }}>
          <div>
            <div className="swiss-tag">[ KERANJANG BELANJA ]</div>
            <h3 style={{ fontSize: '1.2rem', marginTop: '2px' }}>
              Item Pilihan ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--color-text-primary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Reassurance Bar */}
        <div style={{
          padding: '8px 20px',
          backgroundColor: '#E8F5E9',
          borderBottom: '1px solid #C8E6C9',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#2E7D32'
        }}>
          <ShieldCheck size={16} />
          <span>Garansi distributor resmi & packing kayu gratis untuk item rapuh!</span>
        </div>

        {/* Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              margin: 'auto',
              textAlign: 'center',
              padding: '40px 10px',
              color: 'var(--color-text-muted)'
            }}>
              <ShoppingBag size={48} strokeWidth={1.5} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>Keranjang Masih Kosong</h4>
              <p style={{ fontSize: '0.82rem', marginTop: '4px', marginBottom: '16px' }}>
                Yuk, jelajahi berbagai gadget dan peralatan elektronik impianmu sekarang!
              </p>
              <button onClick={handleShopClick} className="btn btn-primary btn-sm">
                Buka Katalog Produk
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '68px',
                    height: '68px',
                    objectFit: 'cover',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)'
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    marginBottom: '4px'
                  }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {formatRupiah(item.price)}
                  </div>
                  
                  {/* Quantity Stepper & Remove */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px'
                    }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{
                        padding: '0 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      title="Hapus"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#E03131'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px',
            borderTop: '2px solid var(--color-border-dark)',
            backgroundColor: 'var(--color-surface-subtle)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal Produk:</span>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                {formatRupiah(cartSubtotal)}
              </span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
              fontFamily: 'var(--font-mono)'
            }}>
              * Pajak PPN & biaya kirim dihitung di halaman kasir
            </div>

            <button
              onClick={handleCheckoutClick}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Lanjut ke Kasir & Bayar</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
