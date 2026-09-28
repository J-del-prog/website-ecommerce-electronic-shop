import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingBag, Eye, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { navigate, addToCart, toggleWishlist, isInWishlist, formatRupiah } = useStore();
  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'row',
        padding: '16px',
        gap: '20px',
        alignItems: 'center',
        position: 'relative',
        transition: 'border-color 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-dark)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {/* Thumbnail */}
        <div 
          onClick={() => navigate('detail', { productId: product.id })}
          style={{ width: '130px', height: '130px', flexShrink: 0, cursor: 'pointer', overflow: 'hidden', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
        >
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 700,
              backgroundColor: 'var(--color-bg)',
              padding: '2px 6px',
              border: '1px solid var(--color-border)'
            }}>
              {product.brand}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
              • {product.category.toUpperCase()}
            </span>
            {product.tag && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: 'var(--color-text-primary)',
                color: '#fff',
                padding: '2px 6px'
              }}>
                {product.tag}
              </span>
            )}
          </div>

          <h3 
            onClick={() => navigate('detail', { productId: product.id })}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              lineHeight: 1.3,
              marginBottom: '6px'
            }}
          >
            {product.name}
          </h3>

          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59F00' }}>
              <Star size={13} fill="#F59F00" stroke="#F59F00" />
              <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{product.rating}</span>
            </div>
            <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount} ulasan)</span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span style={{ color: product.stock > 0 ? '#2B8A3E' : '#C92A2A', fontWeight: 600 }}>
              {product.stock > 0 ? `Tersedia (${product.stock} unit)` : 'Stok Habis'}
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '170px' }}>
          <div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.78rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                {formatRupiah(product.originalPrice)}
              </div>
            )}
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {formatRupiah(product.price)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                background: 'none',
                border: '1px solid var(--color-border)',
                padding: '8px',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
              title="Tambah ke Wishlist"
            >
              <Heart size={16} fill={wishlisted ? '#E03131' : 'none'} color={wishlisted ? '#E03131' : 'currentColor'} />
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="btn btn-primary btn-sm"
              disabled={product.stock <= 0}
            >
              <ShoppingBag size={14} />
              <span>{product.stock > 0 ? '+ Keranjang' : 'Habis'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View (Swiss Card)
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: '100%',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--color-border-dark)';
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Top Badges */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {discountPercent > 0 && (
          <span style={{
            backgroundColor: 'var(--color-badge-sale)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '1px'
          }}>
            HEMAT {discountPercent}%
          </span>
        )}
        {product.tag && (
          <span style={{
            backgroundColor: 'var(--color-text-primary)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '1px'
          }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Wishlist Icon Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Wishlist"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid var(--color-border)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <Heart size={15} fill={wishlisted ? '#E03131' : 'none'} color={wishlisted ? '#E03131' : 'var(--color-text-primary)'} />
      </button>

      {/* Image Container */}
      <div 
        onClick={() => navigate('detail', { productId: product.id })}
        style={{
          width: '100%',
          paddingTop: '85%',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Card Body */}
      <div style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Brand & Stock Status */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--color-text-muted)'
          }}>
            {product.brand.toUpperCase()}
          </span>

          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            color: product.stock > 0 ? '#2B8A3E' : '#C92A2A',
            fontWeight: 600
          }}>
            {product.stock > 0 ? `STOK: ${product.stock}` : 'HABIS'}
          </span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => navigate('detail', { productId: product.id })}
          style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            lineHeight: 1.35,
            cursor: 'pointer',
            marginBottom: '8px',
            minHeight: '38px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </h3>

        {/* Rating & Warranty Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.74rem',
          marginBottom: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59F00' }}>
            <Star size={12} fill="#F59F00" stroke="#F59F00" />
            <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{product.rating}</span>
          </div>
          <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount})</span>
          <span style={{ color: 'var(--color-border)' }}>•</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Garansi Resmi
          </span>
        </div>

        {/* Pricing & Add to Cart button */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '8px'
        }}>
          <div>
            {product.originalPrice && (
              <div style={{
                fontSize: '0.72rem',
                textDecoration: 'line-through',
                color: 'var(--color-text-muted)',
                lineHeight: 1.1
              }}>
                {formatRupiah(product.originalPrice)}
              </div>
            )}
            <div style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2
            }}>
              {formatRupiah(product.price)}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            aria-label="Beli"
            style={{
              backgroundColor: product.stock > 0 ? 'var(--color-text-primary)' : 'var(--color-border)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '2px',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <ShoppingBag size={14} />
            <span>{product.stock > 0 ? '+ Beli' : 'Habis'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
