'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const THEMES = [
  {
    id: 'moden',
    name: 'Moden Minimalis',
    tag: 'Terlaris',
    demo: '/demo/moden',
    bg: '#F5F0E8',
    surface: '#FDFBF7',
    accent: '#2C2C2A',
    gold: '#C9A84C',
    text: '#2C2C2A',
    subtext: 'rgba(44,44,42,0.5)',
    border: '#E8D9BF',
    desc: 'Bersih, elegan, dan timeless. Sesuai untuk pasangan yang suka kesederhanaan berkelas.',
    tags: ['Minimalis', 'Elegan', 'Timeless'],
  },
  {
    id: 'floral',
    name: 'Floral Romantik',
    tag: 'Baru',
    demo: '/demo/floral',
    bg: '#FDF0EC',
    surface: '#FFF8F5',
    accent: '#8B4058',
    gold: '#D4956A',
    text: '#5C2D3A',
    subtext: 'rgba(92,45,58,0.5)',
    border: '#F0C8B8',
    desc: 'Hangat, romantik, dan penuh kasih sayang. Pilihan sempurna untuk majlis yang berbunga.',
    tags: ['Romantik', 'Hangat', 'Floral'],
  },
  {
    id: 'klasik',
    name: 'Klasik Emas',
    tag: 'Premium',
    demo: '/demo/klasik',
    bg: '#1A1714',
    surface: '#221F1B',
    accent: '#D4A853',
    gold: '#D4A853',
    text: '#F5EFE0',
    subtext: 'rgba(245,239,224,0.5)',
    border: 'rgba(212,168,83,0.25)',
    desc: 'Mewah, gelap, dan berkilauan. Untuk pasangan yang mahukan kesan malam yang memukau.',
    tags: ['Mewah', 'Glamour', 'Premium'],
  },
  {
    id: 'sage',
    name: 'Sage Garden',
    tag: 'Popular',
    demo: '/demo/sage',
    bg: '#EEF2EC',
    surface: '#F5F8F3',
    accent: '#3D5A3E',
    gold: '#8FAF6E',
    text: '#2C3E2D',
    subtext: 'rgba(44,62,45,0.5)',
    border: '#C8D8C0',
    desc: 'Segar, natural, dan tenang. Terinspirasi dari taman bunga yang indah.',
    tags: ['Natural', 'Segar', 'Taman'],
  },
  {
    id: 'royal',
    name: 'Royal Blue',
    tag: '',
    demo: '/demo/royal',
    bg: '#0F1B35',
    surface: '#162040',
    accent: '#C8A96E',
    gold: '#C8A96E',
    text: '#E8EEF8',
    subtext: 'rgba(232,238,248,0.5)',
    border: 'rgba(200,169,110,0.2)',
    desc: 'Anggun, berwibawa, dan penuh maruah. Memberi kesan majlis diraja yang takkan dilupakan.',
    tags: ['Anggun', 'Royal', 'Berwibawa'],
  },
  {
    id: 'dusty',
    name: 'Dusty Rose',
    tag: '',
    demo: '/demo/dusty',
    bg: '#F7EEF0',
    surface: '#FDF6F7',
    accent: '#9E5E6F',
    gold: '#C4909F',
    text: '#6B3A47',
    subtext: 'rgba(107,58,71,0.5)',
    border: '#E8C8D0',
    desc: 'Lembut, feminin, dan penuh pesona. Warna dusty rose yang menjadi kegemaran ramai.',
    tags: ['Lembut', 'Feminin', 'Pastel'],
  },
]

// ── Mini wedding card preview ─────────────────────────────
function ThemePreview({ theme, couple = 'Ahmad & Siti', date = '15 Jun 2026' }) {
  return (
    <div style={{
      background: theme.bg,
      borderRadius: 12,
      padding: '24px 16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 220,
      border: `1px solid ${theme.border}`,
    }}>
      {/* Corner ornaments */}
      <span style={{ position: 'absolute', top: 8, left: 10, color: theme.gold, fontSize: 12, opacity: 0.6 }}>✦</span>
      <span style={{ position: 'absolute', top: 8, right: 10, color: theme.gold, fontSize: 12, opacity: 0.6 }}>✦</span>
      <span style={{ position: 'absolute', bottom: 8, left: 10, color: theme.gold, fontSize: 12, opacity: 0.6 }}>✦</span>
      <span style={{ position: 'absolute', bottom: 8, right: 10, color: theme.gold, fontSize: 12, opacity: 0.6 }}>✦</span>

      <p style={{ fontSize: 8, letterSpacing: '0.25em', color: theme.gold, textTransform: 'uppercase', marginBottom: 8 }}>
        Walimatul Urus
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto 10px', width: 'fit-content' }}>
        <div style={{ width: 30, height: 1, background: `${theme.gold}60` }} />
        <span style={{ color: theme.gold, fontSize: 10 }}>❧</span>
        <div style={{ width: 30, height: 1, background: `${theme.gold}60` }} />
      </div>
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: theme.text, fontWeight: 400, lineHeight: 1.3, marginBottom: 6 }}>
        {couple}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto 10px', width: 'fit-content' }}>
        <div style={{ width: 20, height: 1, background: `${theme.gold}60` }} />
        <span style={{ color: theme.gold, fontSize: 10 }}>✦</span>
        <div style={{ width: 20, height: 1, background: `${theme.gold}60` }} />
      </div>
      <p style={{ fontSize: 9, letterSpacing: '0.15em', color: theme.subtext, textTransform: 'uppercase', marginBottom: 14 }}>
        {date}
      </p>
      {/* Mini countdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
        {[['00','Hari'],['00','Jam'],['00','Minit'],['00','Saat']].map(([v, l]) => (
          <div key={l} style={{ background: `${theme.surface}`, border: `1px solid ${theme.border}`, borderRadius: 4, padding: '4px 2px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: theme.text, lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 7, letterSpacing: '0.1em', color: theme.subtext, textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────
export default function ThemeSelectorPage() {
  const [selected, setSelected] = useState(null)
  const [customCouple, setCustomCouple] = useState('')
  const [customDate, setCustomDate] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const displayCouple = customCouple || 'Ahmad & Siti'
  const displayDate = customDate
    ? new Date(customDate).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })
    : '15 Jun 2026'

  const selectedTheme = THEMES.find(t => t.id === selected)

  function handleOrder() {
    if (!selected) return
    const tema = selectedTheme?.name || ''
    const msg = encodeURIComponent(`Salam, saya ingin order kad kahwin digital.\n\nTema pilihan: *${tema}*\nNama pengantin: ${displayCouple}\n\nBoleh terangkan pakej yang ada?`)
    window.open(`https://wa.me/60175364098?text=${msg}`, '_blank')
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#FDFBF7', color: '#2C2C2A', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .theme-card { transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; }
        .theme-card:hover { transform: translateY(-4px); }
        .tag-pill { display: inline-block; font-size: 10px; padding: 3px 10px; border-radius: 99px; }
        input[type=text], input[type=date] {
          width: 100%; padding: 10px 14px; font-size: 13px;
          border: 1px solid #E8D9BF; background: #FAF6EE;
          color: #2C2C2A; font-family: inherit; outline: none;
          transition: border 0.15s; border-radius: 4px;
        }
        input:focus { border-color: #C9A84C; }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(253,251,247,0.97)' : '#FDFBF7',
        borderBottom: '1px solid #E8D9BF',
        backdropFilter: 'blur(12px)', padding: '0 5%',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link href="/" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 20, fontWeight: 400, textDecoration: 'none', color: '#2C2C2A' }}>
            Warkah<span style={{ color: '#C9A84C' }}>Cinta</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, color: 'rgba(44,44,42,0.5)' }}>
              {selected ? `✓ ${selectedTheme?.name} dipilih` : `${THEMES.length} tema tersedia`}
            </span>
            <Link href="/#pakej" style={{
              background: '#2C2C2A', color: '#FDFBF7', fontSize: 12,
              padding: '8px 20px', textDecoration: 'none', letterSpacing: '0.1em',
            }}>
              Lihat Pakej
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #FDFBF7, #F5EFE3)', padding: '50px 5% 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 10 }}>
          Koleksi Eksklusif
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 400, color: '#2C2C2A', marginBottom: 12, lineHeight: 1.2 }}>
          Pilih Tema <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Impian Anda</span>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.55)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.7 }}>
          Preview kad kahwin digital anda dengan nama sebenar. Pilih tema, tekan order, siap dalam 24 jam.
        </p>

        {/* Personalise bar */}
        <div style={{
          display: 'inline-flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
          background: '#FAF6EE', border: '1px solid #E8D9BF', borderRadius: 12, padding: '16px 20px',
          maxWidth: 520, margin: '0 auto',
        }}>
          <span style={{ fontSize: 12, color: 'rgba(44,44,42,0.5)', whiteSpace: 'nowrap' }}>Preview dengan nama anda:</span>
          <input
            type="text"
            placeholder="cth: Izzat & Hana"
            value={customCouple}
            onChange={e => setCustomCouple(e.target.value)}
            style={{ width: 160 }}
          />
          <input
            type="date"
            value={customDate}
            onChange={e => setCustomDate(e.target.value)}
            style={{ width: 150 }}
          />
        </div>
      </div>

      {/* Theme grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 5% 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {THEMES.map(theme => {
            const isSelected = selected === theme.id
            return (
              <div
                key={theme.id}
                className="theme-card"
                onClick={() => setSelected(isSelected ? null : theme.id)}
                style={{
                  border: isSelected ? `2px solid ${theme.gold}` : '2px solid transparent',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: isSelected
                    ? `0 16px 40px ${theme.gold}30`
                    : '0 2px 12px rgba(0,0,0,0.06)',
                  background: '#FDFBF7',
                  position: 'relative',
                }}
              >
                {/* Selected badge */}
                {isSelected && (
                  <div className="slide-up" style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 10,
                    background: theme.gold, color: theme.bg,
                    fontSize: 11, fontWeight: 500, padding: '4px 12px',
                    borderRadius: 99, letterSpacing: '0.05em',
                  }}>
                    ✓ Dipilih
                  </div>
                )}

                {/* Tag */}
                {theme.tag && !isSelected && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 10,
                    background: '#2C2C2A', color: '#FDFBF7',
                    fontSize: 10, padding: '3px 10px', borderRadius: 99,
                  }}>
                    {theme.tag}
                  </div>
                )}

                {/* Preview */}
                <div style={{ padding: '20px 20px 0' }}>
                  <ThemePreview theme={theme} couple={displayCouple} date={displayDate} />
                </div>

                {/* Info */}
                <div style={{ padding: '16px 20px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 18, fontWeight: 400, color: '#2C2C2A' }}>
                      {theme.name}
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(44,44,42,0.55)', lineHeight: 1.6, marginBottom: 12 }}>
                    {theme.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {theme.tags.map(tag => (
                      <span key={tag} className="tag-pill" style={{ background: '#FAF6EE', color: 'rgba(44,44,42,0.6)', border: '1px solid #E8D9BF' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Select / Deselect bar */}
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #E8D9BF',
                  background: isSelected ? theme.bg : '#FAF6EE',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'background 0.2s',
                }}>
                  <span style={{ fontSize: 12, color: isSelected ? theme.accent : 'rgba(44,44,42,0.4)', fontWeight: isSelected ? 500 : 400 }}>
                    {isSelected ? '✓ Tema ini dipilih' : 'Klik untuk pilih'}
                  </span>
                  <Link
                    href={`/demo?theme=${theme.id}${customCouple ? `&couple=${encodeURIComponent(customCouple)}` : ''}${customDate ? `&date=${customDate}` : ''}`}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: 11, color: '#C9A84C', textDecoration: 'none', border: '1px solid #C9A84C', padding: '4px 12px', borderRadius: 4 }}
                  >
                    Demo →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Sticky bottom bar ──────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: selected ? '#2C2C2A' : 'rgba(253,251,247,0.97)',
        borderTop: `1px solid ${selected ? 'transparent' : '#E8D9BF'}`,
        backdropFilter: 'blur(12px)',
        padding: '14px 5%',
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          {selected ? (
            <>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(253,251,247,0.5)', marginBottom: 2 }}>Tema dipilih</div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 20, color: '#FDFBF7', fontWeight: 400 }}>
                  {selectedTheme?.name}
                  <span style={{ fontSize: 12, color: '#C9A84C', marginLeft: 8 }}>✦</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '10px 20px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
                >
                  Tukar
                </button>
                <button
                  onClick={handleOrder}
                  style={{ background: '#C9A84C', color: '#1A1714', border: 'none', padding: '12px 32px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  Order Sekarang via WhatsApp →
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.6)' }}>
                👆 Pilih tema di atas untuk meneruskan order
              </p>
              <Link href="/#pakej" style={{ fontSize: 12, color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.05em' }}>
                Lihat harga pakej →
              </Link>
            </>
          )}
        </div>
      </div>

    </div>
  )
}