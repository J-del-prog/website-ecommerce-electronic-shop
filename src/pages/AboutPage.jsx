import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Truck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function AboutPage() {
  const { navigate } = useStore();

  const storeLocations = [
    {
      name: 'Toko Jaya Putra — Glodok Plaza (Kantor Pusat)',
      address: 'Pusat Elektronik Glodok Plaza, Lantai Dasar Blok A No. 42-44, Jl. Pinangsia Raya, Mangga Besar, Taman Sari, Jakarta Barat 11180',
      hours: 'Senin - Minggu: 09.30 - 19.30 WIB',
      phone: '+62 21-628-9900 / +62 812-9988-7766',
      services: ['Display Laptop & PC', 'Audisi Headphone & Audio', 'Service Center & Klaim Garansi', 'Pengambilan Pesanan Online (Pick-up)'],
      mapQuery: 'Glodok Plaza Jakarta'
    },
    {
      name: 'Toko Jaya Putra — Mangga Dua Mall (Cabang IT & Gaming)',
      address: 'Mall Mangga Dua, Lantai 2 Blok B No. 18-20, Jl. Mangga Dua Raya, Sawah Besar, Jakarta Pusat 10730',
      hours: 'Senin - Minggu: 10.00 - 20.00 WIB',
      phone: '+62 21-612-4422 / +62 813-7722-1100',
      services: ['Komponen Gaming & PC Rakitan', 'Smart TV OLED Gallery', 'Konsultasi Perangkat Kantor & Bisnis', 'Pick-up Toko Online'],
      mapQuery: 'Mangga Dua Mall Jakarta'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Page Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        paddingTop: '32px',
        paddingBottom: '28px'
      }}>
        <div className="container">
          <div className="swiss-tag">[ PROFIL PERUSAHAAN & TOKO FISIK ]</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginTop: '4px'
          }}>
            Tentang Toko Elektronik Jaya Putra
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', maxWidth: '720px', marginTop: '6px' }}>
            Dari toko retail fisik di pusat perdagangan elektronik Glodok sejak 2012, kini bertransformasi menjadi toko online elektronik terpercaya melayani pengiriman ke seluruh pelosok Indonesia.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* Story Section Grid */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-border-dark)',
          padding: 'clamp(24px, 4vw, 40px)',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}>
            <div>
              <div className="swiss-tag">[ SEJARAH KAMI ]</div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px', marginBottom: '14px' }}>
                Dedikasi Menghadirkan Teknologi Asli dengan Kejujuran Harga
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '12px' }}>
                Toko Elektronik Jaya Putra berawal dari kios kecil di Glodok Plaza pada tahun 2012. Pendiri kami percaya bahwa masyarakat berhak mendapatkan produk elektronik yang terjamin orisinalitasnya dengan kartu garansi distributor resmi, tanpa takut tertipu barang rekondisi atau distributor gelap.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                Kini melalui website resmi ini, Anda bisa menikmati kemudahan belanja online dari rumah dengan keamanan standar toko fisik kami: nota faktur pajak resmi, garansi tukar baru 7 hari, dan pengemasan kayu berlapis bubble wrap tebal.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => navigate('shop')} className="btn btn-primary btn-md">
                  Lihat Katalog Produk
                </button>
                <button onClick={() => navigate('contact')} className="btn btn-outline btn-md">
                  Kontak Tim Kami
                </button>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                FAKTA KUNCI TOKO JAYA PUTRA
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>TAHUN PENDIRIAN: </span>
                <strong>2012 di Glodok, Jakarta</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>STATUS BADAN USAHA: </span>
                <strong>PT Jaya Putra Elektronika Indonesia</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>LEGALITAS DISTRIBUSI: </span>
                <strong>Authorized Dealer Resmi (Apple, Sony, Samsung, Asus, LG)</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>KAPASITAS GUDANG: </span>
                <strong>2 Hub Distribusi Utama di Glodok & Mangga Dua</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>JANGKAUAN LOGISTIK: </span>
                <strong>38 Provinsi di Seluruh Indonesia</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ marginBottom: '36px' }}>
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ KOMITMEN TOKO ]</div>
              <h2 className="section-title">4 Nilai Dasar Pelayanan Kami</h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}>
            {[
              {
                icon: ShieldCheck,
                title: 'Garansi Resmi Pabrikan',
                desc: 'Seluruh barang kami bersertifikat garansi resmi distributor Indonesia (bukan barang Black Market atau garansi toko semata).'
              },
              {
                icon: Award,
                title: 'Jaminan Harga Jujur',
                desc: 'Harga transparan sudah termasuk PPN 11% dan bebas biaya siluman. Promo diskon kami murni langsung dari subsidi distributor.'
              },
              {
                icon: Truck,
                title: 'Protokol Pengiriman Aman',
                desc: 'Setiap pengiriman barang berharga seperti Laptop atau TV dilengkapi peti kayu khusus dan asuransi proteksi kehilangan kurir.'
              },
              {
                icon: CheckCircle2,
                title: 'Garansi Ganti Baru 7 Hari',
                desc: 'Jika perangkat yang kamu terima mengalami cacat bawaan pabrik dalam 7 hari pertama, kami tukar langsung unit yang baru.'
              }
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-primary)'
                }}>
                  <p.icon size={22} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Retail Locations Section */}
        <div>
          <div className="section-header">
            <div>
              <div className="swiss-tag">[ CABANG TOKO FISIK ]</div>
              <h2 className="section-title">Kunjungi Toko Fisik Jaya Putra</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '380px' }}>
              Mau lihat langsung barangnya atau coba display sebelum beli? Kunjungi showroom kami di Jakarta.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {storeLocations.map((loc, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '2px solid var(--color-border-dark)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '8px'
                  }}>
                    <Building2 size={14} />
                    <span>LOKASI TOKO FISIK 0{idx + 1}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px' }}>
                    {loc.name}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <MapPin size={16} style={{ color: 'var(--color-text-primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{loc.address}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Clock size={16} style={{ color: 'var(--color-text-primary)', flexShrink: 0 }} />
                      <span>{loc.hours}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Phone size={16} style={{ color: 'var(--color-text-primary)', flexShrink: 0 }} />
                      <span>{loc.phone}</span>
                    </div>
                  </div>

                  {/* Services Available */}
                  <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                      LAYANAN TERSEDIA DI TOKO:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {loc.services.map((svc, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.72rem',
                            padding: '3px 8px'
                          }}
                        >
                          ✓ {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-md"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <span>Buka Petunjuk Arah di Google Maps</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
