import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS, INITIAL_TESTIMONIALS, STORE_STATS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  Mail, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Tv, 
  Home, 
  Gamepad2, 
  Flame, 
  TrendingUp,
  ShieldCheck,
  Star
} from 'lucide-react';

const CATEGORY_ICONS = {
  smartphone: Smartphone,
  laptop: Laptop,
  audio: Headphones,
  tv: Tv,
  smarthome: Home,
  gaming: Gamepad2
};

export default function HomePage() {
  const { products, navigate, showToast } = useStore();

  // Testimonial Carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Animated Counter numbers state
  const [animatedStats, setAnimatedStats] = useState(STORE_STATS.map(() => 0));

  useEffect(() => {
    // Run smooth number animation on mount
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = Math.min(stepCount / steps, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(
        STORE_STATS.map(stat => {
          if (stat.isDecimal) {
            return +(stat.value * easedProgress).toFixed(1);
          }
          return Math.floor(stat.value * easedProgress);
        })
      );

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Filter products for homepage sections
  const flashSaleProducts = products.filter(p => p.isFlashSale).slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  // Testimonials control
  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev === 0 ? INITIAL_TESTIMONIALS.length - 1 : prev - 1));
  };
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev === INITIAL_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Harap masukkan alamat email yang valid', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Terima kasih! Voucher diskon telah dikirim ke email kamu.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. HERO SECTION: Minimal Text-Only Hero with Bold Typography, No Background Image (Swiss Poster Style) */}
      <section style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '2px solid var(--color-border-dark)',
        paddingTop: '48px',
        paddingBottom: '48px',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '980px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="swiss-tag">[ 01 ] TOKO ONLINE ELEKTRONIK RESMI</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                backgroundColor: 'var(--color-surface-subtle)',
                padding: '2px 8px',
                border: '1px solid var(--color-border)',
                fontWeight: 600
              }}>
                EDISI 2026
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              marginBottom: '20px'
            }}>
              Elektronik Terpercaya. <br />
              Harga Jujur. <br />
              <span style={{ color: 'var(--color-text-muted)' }}>Garansi Distributor Resmi.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.55,
              maxWidth: '720px',
              marginBottom: '32px'
            }}>
              Selamat datang di <strong>Toko Online Elektronik Jaya Putra</strong>. Kami menyediakan laptop, smartphone flagship, Smart TV OLED, perlengkapan audio, hingga smart home dengan pengemasan kayu aman dan jaminan garansi resmi ke seluruh Nusantara.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center'
            }}>
              <button 
                onClick={() => navigate('shop')}
                className="btn btn-primary btn-lg"
              >
                <span>Jelajahi Seluruh Katalog</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => navigate('shop', { flashSaleOnly: true })}
                className="btn btn-outline btn-lg"
              >
                <Flame size={18} color="#D9480F" />
                <span>Lihat Promo Flash Sale</span>
              </button>

              <button 
                onClick={() => navigate('about')}
                className="btn btn-steel btn-lg"
              >
                <span>Kunjungi Toko Fisik</span>
              </button>
            </div>
          </div>

          {/* Swiss Architectural Spec Strip */}
          <div style={{
            marginTop: '44px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem'
          }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>LOKASI GUDANG & TOKO:</span>
              <strong>Glodok Plaza & Mangga Dua, Jakarta</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>JAMINAN KEASLIAN:</span>
              <strong>100% Produk Original Distributor</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>PENGIRIMAN:</span>
              <strong>Asuransi Penuh + Packing Kayu Ekstra</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>PELAYANAN CS:</span>
              <strong>Senin - Minggu (09.00 - 21.00 WIB)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATISTICS COUNTER SECTION */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ 02 ] STATISTIK PERFORMA</div>
              <h2 className="section-title">Bukti Nyata Kepuasan Pelanggan</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '380px' }}>
              Transparansi adalah prioritas kami. Angka berikut mencerminkan kepercayaan ribuan konsumen Indonesia sejak 2012.
            </p>
          </div>

          {/* 4-Column Stat Counter Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            border: '2px solid var(--color-border-dark)',
            backgroundColor: 'var(--color-surface)'
          }}>
            {STORE_STATS.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '28px 24px',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '10px'
                }}>
                  METRIC 0{idx + 1}
                </div>

                <div style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--color-text-primary)'
                }}>
                  {stat.isDecimal 
                    ? animatedStats[idx].toFixed(1) 
                    : animatedStats[idx].toLocaleString('id-ID')}
                  <span style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    {stat.suffix}
                  </span>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{stat.label}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {stat.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES GRID */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ 03 ] JELAJAHI KATEGORI</div>
              <h2 className="section-title">Koleksi Perangkat Elektronik</h2>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="btn btn-steel btn-sm"
            >
              <span>Semua Kategori ({CATEGORIES.length - 1})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
              const IconComp = CATEGORY_ICONS[cat.id] || Sparkles;
              const count = products.filter(p => p.category === cat.id).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => navigate('shop', { category: cat.id })}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    padding: '22px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '140px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border-dark)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      padding: '10px',
                      display: 'inline-flex'
                    }}>
                      <IconComp size={22} color="var(--color-text-primary)" />
                    </div>
                    <ArrowRight size={16} color="var(--color-text-muted)" />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      {count} Produk Tersedia
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FLASH SALE & TRENDING DEALS (GRID-BASED) */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="swiss-tag">[ 04 ] PENAWARAN TERBATAS</span>
                <span style={{
                  backgroundColor: 'var(--color-badge-sale)',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '1px'
                }}>
                  FLASH SALE HARI INI
                </span>
              </div>
              <h2 className="section-title">Harga Spesial Distributor</h2>
            </div>
            <button
              onClick={() => navigate('shop', { flashSaleOnly: true })}
              className="btn btn-outline btn-sm"
            >
              <span>Lihat Semua Promo</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4 Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESTSELLER FEATURED PRODUCTS */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ 05 ] PRODUK PILIHAN</div>
              <h2 className="section-title">Paling Banyak Dicari Minggu Ini</h2>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="btn btn-primary btn-sm"
            >
              <span>Buka Katalog Lengkap</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. OFFICIAL BRAND PARTNERS STRIP */}
      <section style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '28px',
        paddingBottom: '28px'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span className="swiss-tag">[ 06 ] MITRA DISTRIBUTOR RESMI</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Produk dijamin 100% garansi servis resmi pabrikan
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '8px'
          }}>
            {BRANDS.map((brand, i) => (
              <div
                key={i}
                onClick={() => navigate('shop', { brand })}
                style={{
                  padding: '14px 10px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'background-color 0.15s, border-color 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                {brand.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL CAROUSEL / SLIDER */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ 07 ] TESTIMONI PEMBELI</div>
              <h2 className="section-title">Ulasan Pembeli Terverifikasi</h2>
            </div>
            
            {/* Carousel Navigation Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={prevTestimonial}
                aria-label="Sebelumnya"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Selanjutnya"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Testimonial Active Slide */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border-dark)',
            padding: '36px 32px',
            position: 'relative'
          }}>
            {(() => {
              const item = INITIAL_TESTIMONIALS[currentTestimonial];
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', alignItems: 'center' }}>
                  <div>
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="#F59F00" stroke="#F59F00" />
                      ))}
                    </div>

                    <blockquote style={{
                      fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      lineHeight: 1.45,
                      color: 'var(--color-text-primary)',
                      marginBottom: '20px'
                    }}>
                      "{item.comment}"
                    </blockquote>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {item.role} • {item.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Tag & Date box */}
                  <div style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border)',
                    padding: '24px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2B8A3E', fontWeight: 700 }}>
                      <CheckCircle size={16} />
                      PEMBELIAN TERVERIFIKASI SISTEM
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>TANGGAL TRANSAKSI: </span>
                      <strong>{item.date}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>GARANSI DIAKTIFKAN: </span>
                      <strong>Ya (Distributor Resmi Indonesia)</strong>
                    </div>
                    <div style={{ marginTop: '8px', borderTop: '1px dashed var(--color-border)', paddingTop: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>PENGIRIMAN: </span>
                      <strong>Packing Kayu Aman + Asuransi Penuh</strong>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Slide Dots Indicator */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '28px',
              justifyContent: 'center'
            }}>
              {INITIAL_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  style={{
                    width: idx === currentTestimonial ? '28px' : '8px',
                    height: '8px',
                    backgroundColor: idx === currentTestimonial ? 'var(--color-text-primary)' : 'var(--color-border)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderRadius: '1px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION FORM */}
      <section className="compact-section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--color-text-primary)',
            color: '#FFFFFF',
            padding: 'clamp(28px, 5vw, 44px)',
            border: '2px solid var(--color-border-dark)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-steel)',
                  marginBottom: '8px'
                }}>
                  [ 08 ] NEWSLETTER TOKO ELEKTRONIK
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '10px'
                }}>
                  Dapatkan Voucher Rp 50.000 & Update Gadget Terbaru!
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#C9D6DF',
                  lineHeight: 1.5,
                  maxWidth: '460px'
                }}>
                  Kami mengirimkan kabar penawaran flash sale, rilis produk baru, dan tips perawatan elektronik tanpa spam.
                </p>
              </div>

              <div>
                {newsletterSubscribed ? (
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid #40C057',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <CheckCircle size={24} color="#40C057" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Berhasil Terdaftar!</div>
                      <div style={{ fontSize: '0.8rem', color: '#E0E7ED' }}>
                        Kode kupon eksklusif sudah dikirim ke email kamu. Gunakan di keranjang belanja!
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <input 
                        type="email"
                        placeholder="Masukkan alamat email kamu..."
                        value={newsletterEmail}
                        onChange={e => setNewsletterEmail(e.target.value)}
                        required
                        style={{
                          flex: 1,
                          minWidth: '220px',
                          padding: '12px 16px',
                          border: '1px solid #52616B',
                          backgroundColor: '#2B2D30',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          borderRadius: '2px'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: 'var(--color-text-primary)',
                          border: 'none',
                          padding: '12px 20px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Mail size={16} />
                        <span>Klaim Voucher</span>
                      </button>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#A0B2C0' }}>
                      * Privasi terjamin aman. Kamu dapat berhenti berlangganan kapan saja.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
