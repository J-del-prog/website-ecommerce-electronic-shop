import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function TrackingPage() {
  const { orders, pageParams, formatRupiah, navigate } = useStore();

  const [inputOrderId, setInputOrderId] = useState(pageParams.orderId || 'JP-88291');
  const [searchedOrderId, setSearchedOrderId] = useState(pageParams.orderId || 'JP-88291');

  useEffect(() => {
    if (pageParams.orderId) {
      setInputOrderId(pageParams.orderId);
      setSearchedOrderId(pageParams.orderId);
    }
  }, [pageParams]);

  const matchedOrder = orders.find(
    o => o.id.toLowerCase() === searchedOrderId.trim().toLowerCase()
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedOrderId(inputOrderId.trim());
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Menunggu Pembayaran': return 1;
      case 'Diproses': return 2;
      case 'Dikirim': return 3;
      case 'Selesai': return 4;
      default: return 2;
    }
  };

  const activeStep = matchedOrder ? getStatusStep(matchedOrder.status) : 1;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Page Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        padding: '28px 0'
      }}>
        <div className="container">
          <div className="swiss-tag">[ LAYANAN LOGISTIK ]</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>
            Lacak Status Pengiriman Pesanan
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Pantau pergerakan pesanan elektronik Anda secara transparan dari gudang kami hingga tiba di alamat Anda.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px', maxWidth: '880px' }}>
        {/* Search Bar for Order ID */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1,
              minWidth: '240px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)'
            }}>
              <Search size={18} style={{ marginLeft: '12px', color: 'var(--color-text-muted)' }} />
              <input 
                type="text"
                placeholder="Masukkan Nomor Pesanan (Contoh: JP-88291)"
                value={inputOrderId}
                onChange={e => setInputOrderId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              <Truck size={16} />
              <span>Cek Status Resi</span>
            </button>
          </form>

          {/* Quick Demo Order Links */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', fontSize: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>CONTOH PESANAN AKTIF:</span>
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                onClick={() => {
                  setInputOrderId(o.id);
                  setSearchedOrderId(o.id);
                }}
                style={{
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                {o.id} ({o.status})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Result View */}
        {matchedOrder ? (
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border-dark)',
            padding: 'clamp(20px, 4vw, 32px)'
          }}>
            {/* Top Order Status Banner */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span className="swiss-tag">[ RESI TERVERIFIKASI ]</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '2px' }}>
                  Pesanan #{matchedOrder.id}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Waktu Pemesanan: {matchedOrder.date}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: matchedOrder.status === 'Selesai' ? '#E8F5E9' : matchedOrder.status === 'Dikirim' ? '#E7F5FF' : '#FFF9DB',
                  color: matchedOrder.status === 'Selesai' ? '#2B8A3E' : matchedOrder.status === 'Dikirim' ? '#1971C2' : '#F59F00',
                  border: '1px solid currentColor',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '2px'
                }}>
                  STATUS: {matchedOrder.status.toUpperCase()}
                </span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  No. Resi: {matchedOrder.trackingNumber}
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                textAlign: 'center',
                position: 'relative'
              }}>
                {[
                  { step: 1, label: 'Pesanan Dibuat', desc: 'Menunggu konfirmasi' },
                  { step: 2, label: 'Diproses Gudang', desc: 'Packing & QC' },
                  { step: 3, label: 'Sedang Dikirim', desc: 'Kurir dalam perjalanan' },
                  { step: 4, label: 'Tiba di Tujuan', desc: 'Selesai diterima' }
                ].map(s => {
                  const isDone = activeStep >= s.step;
                  const isCurrent = activeStep === s.step;

                  return (
                    <div key={s.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? 'var(--color-text-primary)' : 'var(--color-bg)',
                        color: isDone ? '#FFFFFF' : 'var(--color-text-muted)',
                        border: isCurrent ? '3px solid #40C057' : '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        marginBottom: '6px'
                      }}>
                        {isDone ? '✓' : s.step}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', display: 'none', sm: 'block' }}>
                        {s.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Log Timeline */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
                Riwayat Perjalanan Paket:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {matchedOrder.history && matchedOrder.history.length > 0 ? (
                  matchedOrder.history.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: i === matchedOrder.history.length - 1 ? '#40C057' : 'var(--color-text-muted)',
                        marginTop: '5px',
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{h.status}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                          {h.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Pesanan baru saja dibuat dan sedang dipersiapkan oleh tim ekspedisi.
                  </div>
                )}
              </div>
            </div>

            {/* Order Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              fontSize: '0.82rem'
            }}>
              <div style={{ border: '1px solid var(--color-border)', padding: '14px', backgroundColor: 'var(--color-surface)' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Penerima:</strong>
                <div>{matchedOrder.customerName} ({matchedOrder.phone})</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>{matchedOrder.address}</div>
              </div>

              <div style={{ border: '1px solid var(--color-border)', padding: '14px', backgroundColor: 'var(--color-surface)' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Ekspedisi & Kurir:</strong>
                <div>{matchedOrder.courier}</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>Metode Bayar: {matchedOrder.paymentMethod}</div>
                <div style={{ fontWeight: 700, marginTop: '4px' }}>Total: {formatRupiah(matchedOrder.totalAmount)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: '36px',
            textAlign: 'center'
          }}>
            <AlertCircle size={36} color="#FA5252" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Nomor Pesanan Tidak Ditemukan</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 16px' }}>
              Pastikan Anda memasukkan kode pesanan yang sesuai (contoh: JP-88291) yang tertera pada faktur atau email Anda.
            </p>
            <button onClick={() => navigate('contact')} className="btn btn-outline btn-sm">
              Hubungi Bantuan CS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
