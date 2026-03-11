import React, { useState } from 'react';
import { X, MessageCircle, ExternalLink, AlertTriangle } from 'lucide-react';

const WA_LINK      = 'https://wa.me/+6288991568151';
const ARTIKEL_LINK = 'https://adsense-eosin.vercel.app/';

export default function DemoBanner() {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [dismissed,  setDismissed]  = useState(false);

  if (dismissed) return null;

  return (
    <>
      {/* ── STICKY TOP BAR ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000,
        background: 'linear-gradient(90deg, #b91c1c 0%, #d97706 100%)',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '10px', padding: '6px 40px 6px 12px',
        fontSize: '12px', fontWeight: 700,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        flexWrap: 'wrap', textAlign: 'center',
      }}>
        <AlertTriangle size={14} style={{ flexShrink: 0 }} />
        <span>⚠️ VERSI DEMO — Data dapat direset sewaktu-waktu. Tidak untuk operasional bisnis nyata.</span>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: '#fff', color: '#b91c1c', border: 'none',
            borderRadius: '20px', padding: '3px 12px',
            fontSize: '11px', fontWeight: 800, cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          🛒 BELI VERSI FULL
        </button>
        <button
          onClick={() => setDismissed(true)}
          style={{
            position: 'absolute', right: '10px', top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '4px',
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Spacer agar konten tidak tertutup banner */}
      <div style={{ height: '32px', flexShrink: 0 }} />

      {/* ── MODAL PEMBELIAN ── */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1e1a18',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '20px', maxWidth: '380px', width: '100%',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #991b1b, #b45309)',
              padding: '20px 24px', color: '#fef3c7', position: 'relative',
            }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'rgba(0,0,0,0.25)', border: 'none',
                  color: '#fef3c7', borderRadius: '50%',
                  width: '28px', height: '28px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={14} />
              </button>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏪</div>
              <div style={{ fontSize: '17px', fontWeight: 800 }}>
                GG Pasoryan Enterprise POS
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                Sistem Kasir Cloud — Versi Full &amp; Custom
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px' }}>
              <p style={{
                fontSize: '11px', color: '#92400e', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px',
              }}>
                Yang didapat di versi full:
              </p>

              {[
                '✅ Data permanen — tidak pernah direset',
                '✅ Firebase database milik sendiri',
                '✅ Custom nama toko, logo &amp; tema',
                '✅ Multi kasir &amp; multi cabang',
                '✅ Laporan laba rugi + ekspor Excel',
                '✅ APK Android + EXE Windows',
                '✅ Support &amp; update seumur hidup',
              ].map((f, i) => (
                <div key={i} style={{
                  fontSize: '13px', color: '#fef3c7',
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  dangerouslySetInnerHTML: undefined,
                }}
                  dangerouslySetInnerHTML={{ __html: f }}
                />
              ))}

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '18px' }}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', background: '#16a34a', color: '#fff',
                    textDecoration: 'none', padding: '13px', borderRadius: '12px',
                    fontWeight: 800, fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(22,163,74,0.35)',
                  }}
                >
                  <MessageCircle size={18} />
                  Hubungi via WhatsApp
                </a>

                <a
                  href={ARTIKEL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fbbf24', textDecoration: 'none',
                    padding: '11px', borderRadius: '12px',
                    fontWeight: 700, fontSize: '13px',
                    border: '1px solid rgba(251,191,36,0.3)',
                  }}
                >
                  <ExternalLink size={15} />
                  Info Lengkap &amp; Harga di Artikel
                </a>
              </div>

              <p style={{
                textAlign: 'center', fontSize: '11px',
                color: '#78350f', marginTop: '14px',
              }}>
                Balas cepat · Harga terjangkau · Setup dalam 1 hari
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
