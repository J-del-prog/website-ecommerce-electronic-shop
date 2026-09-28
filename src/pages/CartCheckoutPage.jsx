import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Truck,
  Sparkles,
  Clock
} from 'lucide-react';

const SHIPPING_OPTIONS = [
  { id: 'jne', name: 'JNE Express Reguler (1-2 Hari)', price: 25000, code: 'JNE' },
  { id: 'sicepat', name: 'SiCepat Kilat Next Day (1 Hari)', price: 35000, code: 'SCP' },
  { id: 'gosend', name: 'GoSend / Grab Instant (2-4 Jam Jabodetabek)', price: 50000, code: 'GOS' },
  { id: 'pickup', name: 'Ambil di Toko Fisik (Glodok Plaza)', price: 0, code: 'GLK' }
];

export default function CartCheckoutPage() {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    updateCartQuantity,
    removeFromCart,
    placeOrder,
    formatRupiah,
    navigate,
    showToast
  } = useStore();

  // Multi-step checkout states: 'cart' -> 'payment' -> 'success'
  const [step, setStep] = useState(cart.length > 0 ? 'cart' : 'cart');

  // Customer shipping details
  const [formData, setFormData] = useState({
    fullName: 'David Wijaya',
    email: 'david.wijaya@gmail.com',
    phone: '081299887711',
    address: 'Jl. Boulevard Raya Blok QJ No. 12, Kelapa Gading',
    city: 'Jakarta Utara',
    postalCode: '14240',
    notes: 'Mohon dibungkus bubble wrap tebal dan ditempel stempel fragile elektronik'
  });

  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [couponInput, setCouponInput] = useState('');

  // Payment gateway states
  const [paymentMethod, setPaymentMethod] = useState('QRIS'); // 'QRIS' | 'BCA VA' | 'Mandiri VA' | 'Credit Card'
  const [cardInfo, setCardInfo] = useState({ number: '4000 1234 5678 9010', name: 'DAVID WIJAYA', exp: '12/28', cvv: '789' });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const shippingFee = selectedShipping.price;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCouponCode(couponInput);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      showToast('Harap lengkapi seluruh data pengiriman', 'error');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder = placeOrder({
        customerDetails: formData,
        shippingMethod: selectedShipping,
        paymentMethod
      });
      setConfirmedOrder(newOrder);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Pesanan ${newOrder.id} berhasil diproses!`, 'success');
    }, 1200);
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} disalin ke clipboard!`, 'info');
    }
  };

  // STEP 3: ORDER SUCCESS & RECEIPT
  if (step === 'success' && confirmedOrder) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border-dark)',
            padding: ' clamp(24px, 5vw, 40px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
          }}>
            {/* Header Badge */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#E8F5E9',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                border: '2px solid #2B8A3E'
              }}>
                <CheckCircle2 size={32} color="#2B8A3E" />
              </div>
              <div className="swiss-tag">[ TRANSAKSI BERHASIL ]</div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
                Terima Kasih Atas Pesanan Anda!
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Invoice dan resi pesanan telah diterbitkan oleh sistem Toko Elektronik Jaya Putra.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>NOMOR PESANAN (ORDER ID):</span>
                <strong>{confirmedOrder.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>NOMOR RESI PENGIRIMAN:</span>
                <strong>{confirmedOrder.trackingNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>WAKTU TRANSAKSI:</span>
                <span>{confirmedOrder.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>METODE PEMBAYARAN:</span>
                <strong>{confirmedOrder.paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>EKSPEDISI PENGIRIMAN:</span>
                <span>{confirmedOrder.courier}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', fontSize: '1rem', fontWeight: 800 }}>
                <span>TOTAL DIBAYAR:</span>
                <span>{formatRupiah(confirmedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Purchased Items List in Invoice */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                marginBottom: '10px'
              }}>
                RINCIAN ITEM PESANAN:
              </div>
              <div style={{ border: '1px solid var(--color-border)' }}>
                {confirmedOrder.items.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderBottom: idx !== confirmedOrder.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {item.quantity} x {formatRupiah(item.price)}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>
                      {formatRupiah(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Address */}
            <div style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              padding: '14px',
              fontSize: '0.82rem',
              marginBottom: '24px'
            }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>
                Alamat Tujuan: {confirmedOrder.customerName} ({confirmedOrder.phone})
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>
                {confirmedOrder.address}
              </div>
              {confirmedOrder.notes && (
                <div style={{ marginTop: '6px', fontStyle: 'italic', fontSize: '0.78rem' }}>
                  Catatan: "{confirmedOrder.notes}"
                </div>
              )}
            </div>

            {/* Next Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <button
                onClick={() => navigate('tracking', { orderId: confirmedOrder.id })}
                className="btn btn-primary btn-lg"
              >
                <Truck size={18} />
                <span>Lacak Status Paket</span>
              </button>

              <button
                onClick={() => window.print()}
                className="btn btn-outline btn-lg"
              >
                <Printer size={18} />
                <span>Cetak Nota / Invoice</span>
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => navigate('shop')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Kembali Belanja di Katalog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: SIMPLE PAYMENT GATEWAY SIMULATION
  if (step === 'payment') {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '36px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Back to details */}
          <button
            onClick={() => setStep('cart')}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '16px',
              color: 'var(--color-text-muted)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Data Pengiriman</span>
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Left: Payment Method Selection */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '2px solid var(--color-border-dark)',
              padding: '24px'
            }}>
              <div className="swiss-tag">[ PAYMENT GATEWAY RESMI ]</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', marginBottom: '16px' }}>
                Pilih Jalur Pembayaran
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {[
                  {
                    id: 'QRIS',
                    title: 'QRIS (BCA, GoPay, OVO, Dana, ShopeePay)',
                    desc: 'Pindai barcode instan dengan aplikasi e-wallet / m-banking apa saja',
                    icon: QrCode
                  },
                  {
                    id: 'BCA Virtual Account',
                    title: 'BCA Virtual Account',
                    desc: 'Otomatis terverifikasi 24/7 tanpa perlu kirim bukti transfer manual',
                    icon: Building2
                  },
                  {
                    id: 'Mandiri Virtual Account',
                    title: 'Mandiri Virtual Account',
                    desc: 'Bayar via Livin by Mandiri atau ATM Mandiri terdekat',
                    icon: Building2
                  },
                  {
                    id: 'Kartu Kredit / Debit Visa & Mastercard',
                    title: 'Kartu Kredit / Debit Online',
                    desc: 'Dukungan keamanan 3D Secure dengan OTP resmi bank',
                    icon: CreditCard
                  }
                ].map(m => (
                  <label
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      border: paymentMethod === m.id ? '2px solid var(--color-border-dark)' : '1px solid var(--color-border)',
                      backgroundColor: paymentMethod === m.id ? 'var(--color-surface-subtle)' : 'var(--color-surface)',
                      padding: '14px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      borderRadius: '2px'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === m.id} 
                      onChange={() => setPaymentMethod(m.id)}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <m.icon size={16} />
                        <span>{m.title}</span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {m.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Dynamic Interactive Gateway Interface based on selected method */}
              <div style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: '20px',
                borderRadius: '2px'
              }}>
                {/* 1. QRIS Simulator */}
                {paymentMethod === 'QRIS' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#FFF4E6',
                      color: '#D9480F',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      marginBottom: '12px'
                    }}>
                      <Clock size={14} /> SISA WAKTU: 14:59
                    </div>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      padding: '16px',
                      display: 'inline-block',
                      border: '2px solid var(--color-border-dark)',
                      marginBottom: '12px'
                    }}>
                      {/* Realistic SVG QR Code Simulator */}
                      <svg width="180" height="180" viewBox="0 0 100 100" style={{ display: 'block' }}>
                        <rect width="100" height="100" fill="white" />
                        {/* QR Corners */}
                        <rect x="5" y="5" width="25" height="25" fill="#1E2022" />
                        <rect x="8" y="8" width="19" height="19" fill="white" />
                        <rect x="11" y="11" width="13" height="13" fill="#1E2022" />
                        
                        <rect x="70" y="5" width="25" height="25" fill="#1E2022" />
                        <rect x="73" y="8" width="19" height="19" fill="white" />
                        <rect x="76" y="11" width="13" height="13" fill="#1E2022" />

                        <rect x="5" y="70" width="25" height="25" fill="#1E2022" />
                        <rect x="8" y="73" width="19" height="19" fill="white" />
                        <rect x="11" y="76" width="13" height="13" fill="#1E2022" />

                        {/* QR Matrix Elements */}
                        <rect x="35" y="10" width="5" height="15" fill="#1E2022" />
                        <rect x="45" y="15" width="15" height="5" fill="#1E2022" />
                        <rect x="35" y="35" width="30" height="30" fill="#1E2022" />
                        <rect x="40" y="40" width="20" height="20" fill="white" />
                        <rect x="45" y="45" width="10" height="10" fill="#1E2022" />
                        <rect x="70" y="40" width="15" height="10" fill="#1E2022" />
                        <rect x="75" y="55" width="20" height="5" fill="#1E2022" />
                        <rect x="70" y="70" width="25" height="25" fill="#1E2022" />
                        <rect x="35" y="75" width="20" height="10" fill="#1E2022" />
                      </svg>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '4px', letterSpacing: '0.1em' }}>
                        NMID: ID102026889214JP
                      </div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Scan barcode di atas menggunakan aplikasi BCA Mobile, GoPay, OVO, Dana, LinkAja, atau ShopeePay.
                    </div>
                  </div>
                )}

                {/* 2. Virtual Account Simulator */}
                {(paymentMethod === 'BCA Virtual Account' || paymentMethod === 'Mandiri Virtual Account') && (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      NOMOR VIRTUAL ACCOUNT:
                    </div>
                    <div style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '14px'
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800 }}>
                        {paymentMethod.startsWith('BCA') ? '12808 081299887711' : '88908 081299887711'}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentMethod.startsWith('BCA') ? '12808081299887711' : '88908081299887711', 'Nomor Virtual Account')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700
                        }}
                      >
                        <Copy size={14} /> Salin
                      </button>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      1. Buka aplikasi m-Banking atau kunjungi ATM.<br />
                      2. Pilih menu <strong>Transfer &gt; Virtual Account</strong>.<br />
                      3. Masukkan nomor VA di atas, nominal akan otomatis sesuai total pesanan.
                    </div>
                  </div>
                )}

                {/* 3. Credit Card Simulator */}
                {paymentMethod === 'Kartu Kredit / Debit Visa & Mastercard' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Nomor Kartu (16 Digit):</label>
                      <input 
                        type="text" 
                        value={cardInfo.number} 
                        onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: '1px solid var(--color-border)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Masa Berlaku:</label>
                        <input 
                          type="text" 
                          value={cardInfo.exp} 
                          onChange={e => setCardInfo({ ...cardInfo, exp: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>CVV:</label>
                        <input 
                          type="password" 
                          value={cardInfo.cvv} 
                          maxLength={3}
                          onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Payment Amount & Confirm Button */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '2px solid var(--color-border-dark)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content'
            }}>
              <div className="swiss-tag">[ TOTAL TAGIHAN ]</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)',
                margin: '12px 0 20px'
              }}>
                {formatRupiah(finalTotal)}
              </div>

              <div style={{
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                padding: '14px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.82rem',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Penerima:</span>
                  <strong>{formData.fullName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Alamat:</span>
                  <span style={{ textAlign: 'right', maxWidth: '200px' }}>{formData.city}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Kurir Pilihan:</span>
                  <span>{selectedShipping.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Jumlah Item:</span>
                  <span>{cart.length} produk</span>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isProcessingPayment ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Konfirmasi Pembayaran ({formatRupiah(finalTotal)})</span>
                  </>
                )}
              </button>

              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)'
              }}>
                ENCRYPTED SSL 256-BIT CONNECTION • KEAMANAN BANK TINGKAT TINGGI
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: CART REVIEW & SHIPPING FORM
  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '70vh', padding: '60px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <ShoppingBag size={54} strokeWidth={1.5} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Keranjang Belanja Kamu Kosong</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '6px', marginBottom: '24px' }}>
            Belum ada barang elektronik yang dipilih. Cek katalog laptop, smartphone, TV, atau audio dengan garansi resmi kami!
          </p>
          <button onClick={() => navigate('shop')} className="btn btn-primary btn-lg">
            Mulai Belanja Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Title */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        padding: '24px 0'
      }}>
        <div className="container">
          <div className="swiss-tag">[ CHECKOUT LANGKAH 1 DARI 2 ]</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>
            Keranjang Belanja & Pengiriman
          </h1>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* LEFT: Cart Items & Shipping Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Cart Items Table */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '20px'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                Item Dalam Keranjang ({cart.length})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cart.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      paddingBottom: '14px',
                      borderBottom: '1px solid var(--color-border)'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '64px', height: '64px', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>{item.name}</h4>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '2px' }}>
                        {formatRupiah(item.price)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0 8px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                        {formatRupiah(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-muted)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          marginTop: '4px'
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Customer Shipping Information Form */}
            <form onSubmit={handleProceedToPayment} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '20px'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                Data Penerima & Alamat Pengiriman
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Nama Lengkap *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Nomor WhatsApp / HP *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email (Untuk Invoice & Resi) *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Alamat Lengkap (Jalan, No Rumah, RT/RW, Patokan) *</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Kota / Kabupaten *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Kode Pos *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              {/* Shipping Method Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Pilih Layanan Pengiriman:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {SHIPPING_OPTIONS.map(opt => (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      style={{
                        border: selectedShipping.id === opt.id ? '2px solid var(--color-border-dark)' : '1px solid var(--color-border)',
                        padding: '10px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: selectedShipping.id === opt.id ? 'var(--color-surface-subtle)' : 'var(--color-surface)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="radio" 
                          name="shipping" 
                          checked={selectedShipping.id === opt.id} 
                          onChange={() => setSelectedShipping(opt)} 
                        />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{opt.name}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                        {opt.price === 0 ? 'GRATIS' : formatRupiah(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Lanjut ke Pembayaran Online</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary & Voucher */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border-dark)',
            padding: '24px',
            position: 'sticky',
            top: '90px'
          }}>
            <div className="swiss-tag">[ RINGKASAN BELANJA ]</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', marginBottom: '16px' }}>
              Rincian Pembayaran
            </h3>

            {/* Voucher Code Form */}
            <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>
                KODE VOUCHER / KUPON DISKON:
              </div>
              {appliedCoupon ? (
                <div style={{
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #C8E6C9',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#2E7D32' }}>{appliedCoupon.code}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#388E3C' }}>{appliedCoupon.desc}</div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#C62828', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="text" 
                    placeholder="Contoh: JAYAPUTRA10" 
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    Pakai
                  </button>
                </form>
              )}
            </div>

            {/* Subtotal Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal Produk:</span>
                <span>{formatRupiah(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2B8A3E', fontWeight: 700 }}>
                  <span>Diskon Kupon:</span>
                  <span>- {formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Biaya Pengiriman ({selectedShipping.code}):</span>
                <span>{shippingFee === 0 ? 'GRATIS' : formatRupiah(shippingFee)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Asuransi Elektronik:</span>
                <span style={{ color: '#2B8A3E', fontWeight: 600 }}>Gratis Ditanggung Toko</span>
              </div>

              <div style={{
                borderTop: '2px solid var(--color-border-dark)',
                paddingTop: '12px',
                marginTop: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>TOTAL AKHIR:</span>
                <span style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--color-text-primary)' }}>
                  {formatRupiah(finalTotal)}
                </span>
              </div>
            </div>

            {/* Reassurance notes */}
            <div style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              padding: '12px',
              marginTop: '20px',
              fontSize: '0.74rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div>✓ Jaminan 100% Produk Original Distributor</div>
              <div>✓ Garansi Tukar Unit Baru 7 Hari jika ada cacat pabrik</div>
              <div>✓ Packing Kayu & Bubble wrap gratis tanpa biaya tambahan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
