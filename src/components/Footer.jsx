import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  const { navigate } = useStore();

  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '2px solid var(--color-border-dark)',
      marginTop: 'auto'
    }}>
      {/* 4 Feature Highlights Strip */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface-subtle)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            divideX: '1px solid var(--color-border)'
          }}>
            {[
              {
                icon: ShieldCheck,
                title: '100% Produk Asli',
                desc: 'Garansi resmi pabrikan & distributor Indonesia'
              },
              {
                icon: Truck,
                title: 'Pengiriman Aman',
                desc: 'Packing kayu khusus & asuransi pengiriman penuh'
              },
              {
                icon: CreditCard,
                title: 'Pembayaran Fleksibel',
                desc: 'QRIS, Transfer Bank, VA, & Cicilan 0%'
              },
              {
                icon: Clock,
                title: 'Dukungan Cepat',
                desc: 'Konsultasi spesifikasi via WhatsApp 7 hari seminggu'
              }
            ].map((f, idx) => (
              <div 
                key={idx} 
                style={{
                  padding: '20px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <div style={{
                  padding: '8px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}>
                  <f.icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="container" style={{ paddingBottom: '36px', paddingTop: '36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '26px',
                height: '26px',
                backgroundColor: 'var(--color-text-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                JP
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.05rem',
                textTransform: 'uppercase'
              }}>
                Jaya Putra Elektronik
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Retail elektronik terpercaya sejak 2012 dengan toko fisik di Glodok dan Mangga Dua. Menghadirkan gadget, laptop, smart home, dan audio terlengkap dengan jaminan garansi distributor resmi.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-bg)',
              padding: '6px 10px',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#40C057' }}></span>
              Toko Buka Setiap Hari (10:00 - 20:00 WIB)
            </div>
          </div>

          {/* Column 2: Kategori Populer */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
              paddingBottom: '6px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              [ 01 ] Kategori
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              {[
                { label: 'Smartphone & Tablet', cat: 'smartphone' },
                { label: 'Laptop & Komputer', cat: 'laptop' },
                { label: 'Audio & Headphone', cat: 'audio' },
                { label: 'Smart TV & Visual', cat: 'tv' },
                { label: 'Smart Home & Dapur', cat: 'smarthome' },
                { label: 'Gaming Gear & Aksesoris', cat: 'gaming' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate('shop', { category: item.cat })}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    <span>→</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigasi & Layanan */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
              paddingBottom: '6px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              [ 02 ] Layanan Toko
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              {[
                { label: 'Lacak Status Resi Pengiriman', page: 'tracking' },
                { label: 'Klaim Garansi & Retur', page: 'contact' },
                { label: 'Lokasi & Jam Buka Toko Fisik', page: 'about' },
                { label: 'Panduan Pembayaran Online', page: 'contact' },
                { label: 'Pertanyaan Umum (FAQ)', page: 'contact' },
                { label: 'Masuk Panel Admin Toko', page: 'admin' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(item.page)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    <span>→</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak Toko & Lokasi */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
              paddingBottom: '6px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              [ 03 ] Hubungi Kami
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-text-primary)' }} />
                <span>Pusat Elektronik Glodok Plaza Lt. Dasar No. 42-44, Mangga Besar, Jakarta Barat</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--color-text-primary)' }} />
                <span>+62 812-9988-7766 (WhatsApp CS)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={15} style={{ flexShrink: 0, color: 'var(--color-text-primary)' }} />
                <span>halo@jayaputraelektronik.com</span>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                onClick={() => navigate('about')}
                className="btn btn-steel btn-sm"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Lihat Peta Lokasi Toko</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Logistics Badges */}
        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              display: 'block',
              marginBottom: '6px'
            }}>
              METODE PEMBAYARAN DIDUKUNG:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['QRIS', 'BCA VA', 'MANDIRI VA', 'BRI VA', 'VISA / MC', 'GOPAY', 'OVO'].map((m, i) => (
                <span 
                  key={i} 
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              display: 'block',
              marginBottom: '6px'
            }}>
              MITRA LOGISTIK RESMI:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['JNE REG & YES', 'SICEPAT KLIK', 'GOSEND INSTANT', 'GRABEXPRESS', 'J&T CARGO'].map((l, i) => (
                <span 
                  key={i} 
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Swiss Design Badge */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.76rem',
          color: 'var(--color-text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>Toko Online Elektronik Jaya Putra</strong>. Seluruh hak cipta dilindungi.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
            SWISS INTERNATIONAL TYPOGRAPHY GRID SYSTEM • NORDIC SLATE PALETTE
          </div>
        </div>
      </div>
    </footer>
  );
}
