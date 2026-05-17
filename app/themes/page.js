'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ALL_THEMES } from '@/lib/themes.config'

const CATEGORIES = ['Semua', 'Moden', 'Romantik', 'Islamik', 'Tradisional', 'Nature', 'Mewah']

function ThemePreview({ theme, couple, date }) {
  const displayCouple = couple || theme.demo.couple
  const displayDate   = date
    ? new Date(date).toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })
    : theme.demo.date

  return (
    <div style={{ background:theme.bg, borderRadius:12, padding:'20px 12px', textAlign:'center', position:'relative', overflow:'hidden', minHeight:180, border:`1px solid ${theme.border}` }}>
      <span style={{ position:'absolute', top:8, left:8, color:theme.gold, fontSize:10, opacity:0.6 }}>✦</span>
      <span style={{ position:'absolute', top:8, right:8, color:theme.gold, fontSize:10, opacity:0.6 }}>✦</span>
      <p style={{ fontSize:7, letterSpacing:'0.25em', color:theme.gold, textTransform:'uppercase', marginBottom:6 }}>Walimatul Urus</p>
      <div style={{ display:'flex', alignItems:'center', gap:6, margin:'0 auto 8px', width:'fit-content' }}>
        <div style={{ width:24, height:1, background:`${theme.gold}60` }} />
        <span style={{ color:theme.gold, fontSize:9 }}>❧</span>
        <div style={{ width:24, height:1, background:`${theme.gold}60` }} />
      </div>
      <p style={{ fontFamily:'Georgia,serif', fontSize:'clamp(14px,3.5vw,18px)', color:theme.textColor, fontWeight:400, lineHeight:1.3, marginBottom:6 }}>{displayCouple}</p>
      <p style={{ fontSize:8, letterSpacing:'0.12em', color:theme.subtext, textTransform:'uppercase', marginBottom:12 }}>{displayDate}</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
        {[['00','Hari'],['00','Jam'],['00','Minit'],['00','Saat']].map(([v,l]) => (
          <div key={l} style={{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:3, padding:'3px 1px', textAlign:'center' }}>
            <div style={{ fontFamily:'Georgia,serif', fontSize:11, color:theme.textColor, lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:6, letterSpacing:'0.06em', color:theme.subtext, textTransform:'uppercase', marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>
      <span style={{ position:'absolute', bottom:8, left:8, color:theme.gold, fontSize:10, opacity:0.6 }}>✦</span>
      <span style={{ position:'absolute', bottom:8, right:8, color:theme.gold, fontSize:10, opacity:0.6 }}>✦</span>
    </div>
  )
}

export default function ThemesPage() {
  const [selected, setSelected]         = useState(null)
  const [category, setCategory]         = useState('Semua')
  const [customCouple, setCustomCouple] = useState('')
  const [customDate, setCustomDate]     = useState('')
  const [menuOpen, setMenuOpen]         = useState(false)

  const filtered      = category === 'Semua' ? ALL_THEMES : ALL_THEMES.filter(t => t.category === category)
  const selectedTheme = ALL_THEMES.find(t => t.id === selected)

  function handleOrder() {
    if (!selected) return
    const msg = encodeURIComponent(`Salam WarkahCinta! 🌹\n\nSaya berminat nak order kad kahwin digital.\n\nTema pilihan: *${selectedTheme.name}*\nNama pengantin: ${customCouple || '?'}\nTarikh majlis: ${customDate || '?'}\n\nBoleh terangkan pakej dan cara bayar?`)
    window.open(`https://wa.me/60175364098?text=${msg}`, '_blank')
  }

  const demoUrl = (theme) => {
    let url = `/demo?theme=${theme.id}`
    if (customCouple) url += `&couple=${encodeURIComponent(customCouple)}`
    if (customDate)   url += `&date=${customDate}`
    return url
  }

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#FDFBF7', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        input, button { font-family: inherit; outline: none; }
        .theme-card { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .theme-card:hover { transform: translateY(-4px); }

        .cat-scroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 0 5% 8px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        justify-content: center;
        flex-wrap: wrap;
        }
        .cat-scroll::-webkit-scrollbar { display: none; }

        /* Theme grid */
        .themes-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        }

        @media (max-width: 900px) {
        .themes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
        }

        /* Personalise bar */
        .personalise-bar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          background: #FAF6EE;
          border: 1px solid #E8D9BF;
          border-radius: 12px;
          padding: 14px 16px;
          max-width: 500px;
          margin: 0 auto 24px;
          width: 100%;
        }

        /* Sticky bar */
        .sticky-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .sticky-btns {
          display: flex;
          gap: 10px;
        }

        /* Desktop nav */
        .nav-status { display: flex; align-items: center; gap: 12px; }
        .mobile-close-btn { display: none; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          /* Nav */
          .nav-status span { display: none; }

          /* Header */
          .themes-header { padding: 32px 16px 20px !important; }
          .themes-header h1 { font-size: clamp(26px, 8vw, 36px) !important; }
          .themes-header p { font-size: 13px !important; }

          /* Personalise bar — stack vertically */
          .personalise-bar {
            flex-direction: column;
            align-items: stretch;
            padding: 12px;
          }
          .personalise-bar span { text-align: center; }
          .personalise-bar input { width: 100% !important; }

          /* Theme grid — 1 column */
          .themes-grid {
            grid-template-columns: 1fr !important;
          }

          /* Sticky bar — stack on mobile */
          .sticky-inner {
            flex-direction: column;
            gap: 10px;
          }
          .sticky-btns {
            flex-direction: column;
            width: 100%;
          }
          .sticky-btns button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          /* Smaller padding */
          .themes-grid-wrap { padding: 20px 12px 140px !important; }
          .cat-scroll { padding: 0 12px 8px; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position:'sticky', top:0, zIndex:50, background:'rgba(253,251,247,0.97)', borderBottom:'1px solid #E8D9BF', backdropFilter:'blur(12px)', padding:'0 5%' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
          <Link href="/" style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400 }}>
            Warkah<span style={{ color:'#C9A84C' }}>Cinta</span>
          </Link>
          <div className="nav-status">
            <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)' }}>
              {selected ? `✓ ${selectedTheme?.name} dipilih` : `${ALL_THEMES.length} tema tersedia`}
            </span>
            <Link href="/#pakej" style={{ background:'#2C2C2A', color:'#FDFBF7', fontSize:12, padding:'8px 16px', letterSpacing:'0.08em', borderRadius:4 }}>
              Pakej
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="themes-header" style={{ background:'linear-gradient(160deg,#FDFBF7,#F5EFE3)', padding:'50px 5% 28px', textAlign:'center' }}>
        <p style={{ fontSize:10, letterSpacing:'0.3em', color:'#C9A84C', textTransform:'uppercase', marginBottom:10 }}>Koleksi Eksklusif</p>
        <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(26px,5vw,44px)', fontWeight:400, color:'#2C2C2A', marginBottom:10, lineHeight:1.2 }}>
          Pilih Tema <span style={{ fontStyle:'italic', color:'#C9A84C' }}>Impian Anda</span>
        </h1>
        <p style={{ fontSize:14, color:'rgba(44,44,42,0.55)', maxWidth:480, margin:'0 auto 24px', lineHeight:1.7 }}>
          Preview dengan nama anda sendiri. {ALL_THEMES.length} tema eksklusif.
        </p>

        {/* Personalise bar */}
        <div className="personalise-bar">
          <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)', whiteSpace:'nowrap' }}>Preview nama anda:</span>
          <input
            type="text"
            placeholder="cth: Ahmad & Siti"
            value={customCouple}
            onChange={e => setCustomCouple(e.target.value)}
            style={{ flex:1, minWidth:140, padding:'9px 12px', fontSize:13, border:'1px solid #E8D9BF', background:'#FDFBF7', color:'#2C2C2A', borderRadius:6 }}
          />
          <input
            type="date"
            value={customDate}
            onChange={e => setCustomDate(e.target.value)}
            style={{ flex:1, minWidth:130, padding:'9px 12px', fontSize:13, border:'1px solid #E8D9BF', background:'#FDFBF7', color:'#2C2C2A', borderRadius:6 }}
          />
        </div>

        {/* Category filter — horizontal scroll on mobile */}
        <div className="cat-scroll">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding:'8px 16px', borderRadius:99, fontSize:12,
                border:'1px solid',
                borderColor: category===cat ? '#2C2C2A' : '#E8D9BF',
                background: category===cat ? '#2C2C2A' : 'transparent',
                color: category===cat ? '#FDFBF7' : 'rgba(44,44,42,0.6)',
                cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.15s',
                flexShrink: 0,
              }}
            >
              {cat} ({cat === 'Semua' ? ALL_THEMES.length : ALL_THEMES.filter(t => t.category===cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Theme grid */}
      <div className="themes-grid-wrap" style={{ maxWidth:1100, margin:'0 auto', padding:'28px 5% 150px' }}>
        <p style={{ fontSize:12, color:'rgba(44,44,42,0.4)', marginBottom:16 }}>
          {filtered.length} tema {category !== 'Semua' ? `dalam kategori "${category}"` : 'tersedia'}
        </p>
        <div className="themes-grid">
          {filtered.map(theme => {
            const isSel = selected === theme.id
            return (
              <div
                key={theme.id}
                className="theme-card"
                onClick={() => setSelected(isSel ? null : theme.id)}
                style={{
                  border: isSel ? `2px solid ${theme.gold}` : '2px solid transparent',
                  borderRadius:16, overflow:'hidden', background:'#FDFBF7',
                  position:'relative',
                  boxShadow: isSel ? `0 12px 32px ${theme.gold}25` : '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                {/* Badge */}
                {isSel && (
                  <div style={{ position:'absolute', top:10, right:10, zIndex:10, background:theme.gold, color:theme.bg, fontSize:11, fontWeight:500, padding:'3px 10px', borderRadius:99 }}>✓ Dipilih</div>
                )}
                {theme.tag && !isSel && (
                  <div style={{ position:'absolute', top:10, right:10, zIndex:10, background:'#2C2C2A', color:'#FDFBF7', fontSize:10, padding:'3px 10px', borderRadius:99 }}>{theme.tag}</div>
                )}

                {/* Preview */}
                <div style={{ padding:'14px 14px 0' }}>
                  <ThemePreview theme={theme} couple={customCouple} date={customDate} />
                </div>

                {/* Info */}
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                    <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:17, fontWeight:400, color:'#2C2C2A' }}>{theme.name}</div>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FAF6EE', color:'rgba(44,44,42,0.5)', border:'1px solid #E8D9BF', whiteSpace:'nowrap', marginLeft:6, flexShrink:0 }}>{theme.category}</span>
                  </div>
                  <p style={{ fontSize:12, color:'rgba(44,44,42,0.55)', lineHeight:1.5, marginBottom:8 }}>{theme.desc}</p>
                  <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                    {theme.tags.map(tag => (
                      <span key={tag} style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FAF6EE', border:'1px solid #E8D9BF', color:'rgba(44,44,42,0.5)' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom bar */}
                <div style={{ padding:'11px 14px', borderTop:'1px solid #E8D9BF', background: isSel ? theme.bg : '#FAF6EE', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'background 0.2s' }}>
                  <span style={{ fontSize:12, color: isSel ? theme.textColor : 'rgba(44,44,42,0.4)', fontWeight: isSel ? 500 : 400 }}>
                    {isSel ? '✓ Tema ini dipilih' : 'Klik untuk pilih'}
                  </span>
                  <Link
                    href={demoUrl(theme)}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize:11, color:'#C9A84C', border:'1px solid #C9A84C', padding:'5px 12px', borderRadius:4, whiteSpace:'nowrap' }}
                  >
                    Demo →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div style={{
        position:'fixed', bottom:0, left:0, right:0, zIndex:100,
        background: selected ? '#2C2C2A' : 'rgba(253,251,247,0.97)',
        borderTop:`1px solid ${selected ? 'transparent' : '#E8D9BF'}`,
        backdropFilter:'blur(12px)',
        padding:'12px 5%',
        transition:'background 0.3s',
      }}>
        <div className="sticky-inner">
          {selected ? (
            <>
              <div>
                <div style={{ fontSize:11, color:'rgba(253,251,247,0.5)', marginBottom:2 }}>Tema dipilih</div>
                <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:17, color:'#FDFBF7' }}>
                  {selectedTheme?.name}
                  <span style={{ fontSize:11, color:'rgba(253,251,247,0.4)', marginLeft:8 }}>{selectedTheme?.category}</span>
                </div>
              </div>
              <div className="sticky-btns">
                <button
                  onClick={() => setSelected(null)}
                  style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.6)', padding:'11px 20px', fontSize:12, cursor:'pointer', letterSpacing:'0.08em', borderRadius:6 }}
                >
                  Tukar Tema
                </button>
                <button
                  onClick={handleOrder}
                  style={{ background:'#C9A84C', color:'#1A1714', border:'none', padding:'12px 24px', fontSize:13, fontWeight:500, cursor:'pointer', letterSpacing:'0.08em', textTransform:'uppercase', borderRadius:6 }}
                >
                  💬 Order via WhatsApp →
                </button>
              </div>
            </>
          ) : (
            <div style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
              <p style={{ fontSize:13, color:'rgba(44,44,42,0.6)' }}>👆 Pilih tema untuk order</p>
              <Link href="/#pakej" style={{ fontSize:12, color:'#C9A84C', whiteSpace:'nowrap' }}>Lihat pakej →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}