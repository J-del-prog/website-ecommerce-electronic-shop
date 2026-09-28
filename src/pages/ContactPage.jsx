import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_ITEMS } from '../data/products';
import { 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle,
  Clock
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useStore();

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Contact Form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Konsultasi Spesifikasi Produk',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Harap lengkapi semua kolom yang wajib diisi', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Pesan kamu berhasil dikirim ke Customer Service!', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        paddingTop: '32px',
        paddingBottom: '28px'
      }}>
        <div className="container">
          <div className="swiss-tag">[ PUSAT BANTUAN & FAQ ]</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginTop: '4px'
          }}>
            Ada Pertanyaan? Kami Siap Membantu
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '680px', marginTop: '6px' }}>
            Temukan jawaban cepat seputar garansi resmi, metode pembayaran, panduan retur, atau hubungi langsung konsultan spesialis toko kami.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* Support Channel Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '36px'
        }}>
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#E7F5FF', color: '#1971C2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <Phone size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>WhatsApp Konsultasi CS</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '4px 0 10px' }}>
              Respon cepat dalam hitungan menit untuk cek stok & panduan spek.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800 }}>
              +62 812-9988-7766
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#EBFBEE', color: '#2B8A3E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <Mail size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Email Resmi Toko</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '4px 0 10px' }}>
              Untuk kerjasama korporat, B2B procurement, atau pertanyaan invoice pajak.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800 }}>
              halo@jayaputraelektronik.com
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#FFF4E6', color: '#D9480F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <Clock size={18} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Jam Operasional Toko</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '4px 0 10px' }}>
              Buka setiap hari termasuk hari libur nasional & akhir pekan.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800 }}>
              09.00 - 21.00 WIB
            </div>
          </div>
        </div>

        {/* Main Grid: FAQ Accordion (Left) + Contact Form (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {/* FAQ Accordion */}
          <div>
            <div className="section-header" style={{ marginBottom: '16px' }}>
              <div>
                <div className="swiss-tag">[ PERTANYAAN UMUM ]</div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Frequently Asked Questions</h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: isOpen ? '2px solid var(--color-border-dark)' : '1px solid var(--color-border)',
                      transition: 'border 0.15s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      <span>{item.question}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 18px 16px',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '12px'
                      }}>
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Message Form */}
          <div>
            <div className="section-header" style={{ marginBottom: '16px' }}>
              <div>
                <div className="swiss-tag">[ FORMULIR HUBUNGI KAMI ]</div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Kirim Pesan ke Tim Toko</h2>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '2px solid var(--color-border-dark)',
              padding: '24px'
            }}>
              {isSubmitted ? (
                <div style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CheckCircle2 size={48} color="#2B8A3E" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Pesan Berhasil Terkirim!</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '380px' }}>
                    Tiket bantuan kamu telah dicatat. Staf kami akan merespons melalui WhatsApp atau email dalam waktu maksimal 1-2 jam kerja.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setContactForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Konsultasi Spesifikasi Produk',
                        message: ''
                      });
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '8px' }}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Nama Lengkap *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Rendi Pratama"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                        Email *
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="nama@email.com"
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--color-border)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                        Nomor WhatsApp
                      </label>
                      <input 
                        type="tel" 
                        placeholder="0812xxxxxxx"
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--color-border)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Kategori Pertanyaan
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      <option value="Konsultasi Spesifikasi Produk">Konsultasi Spesifikasi Produk</option>
                      <option value="Bantuan Pembayaran & QRIS">Bantuan Pembayaran & QRIS</option>
                      <option value="Status & Nomor Resi Pengiriman">Status & Nomor Resi Pengiriman</option>
                      <option value="Klaim Garansi & Retur 7 Hari">Klaim Garansi & Retur 7 Hari</option>
                      <option value="Permintaan Faktur Pajak B2B">Permintaan Faktur Pajak B2B</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Pesan atau Pertanyaan Anda *
                    </label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tuliskan pertanyaan atau kendala yang ingin kamu tanyakan..."
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>Kirim Pertanyaan Sekarang</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
