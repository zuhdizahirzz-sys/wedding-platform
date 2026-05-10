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
    <div style={{ background:theme.bg, borderRadius:12, padding:'24px 16px', textAlign:'center', position:'relative', overflow:'hidden', minHeight:200, border:`1px solid ${theme.border}` }}>
      <span style={{ position:'absolute', top:8, left:10, color:theme.gold, fontSize:12, opacity:0.6 }}>✦</span>
      <span style={{ position:'absolute', top:8, right:10, color:theme.gold, fontSize:12, opacity:0.6 }}>✦</span>
      <p style={{ fontSize:8, letterSpacing:'0.25em', color:theme.gold, textTransform:'uppercase', marginBottom:8 }}>Walimatul Urus</p>
      <div style={{ display:'flex', alignItems:'center', gap:8, margin:'0 auto 10px', width:'fit-content' }}>
        <div style={{ width:30, height:1, background:`${theme.gold}60` }} />
        <span style={{ color:theme.gold, fontSize:10 }}>❧</span>
        <div style={{ width:30, height:1, background:`${theme.gold}60` }} />
      </div>
      <p style={{ fontFamily:'Georgia,serif', fontSize:18, color:theme.textColor, fontWeight:400, lineHeight:1.3, marginBottom:8 }}>{displayCouple}</p>
      <p style={{ fontSize:9, letterSpacing:'0.15em', color:theme.subtext, textTransform:'uppercase', marginBottom:14 }}>{displayDate}</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:3 }}>
        {[['00','Hari'],['00','Jam'],['00','Minit'],['00','Saat']].map(([v,l]) => (
          <div key={l} style={{ background:theme.surface, border:`1px solid ${theme.border}`, borderRadius:4, padding:'4px 2px', textAlign:'center' }}>
            <div style={{ fontFamily:'Georgia,serif', fontSize:13, color:theme.textColor, lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:7, letterSpacing:'0.08em', color:theme.subtext, textTransform:'uppercase', marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <span style={{ position:'absolute', bottom:8, left:10, color:theme.gold, fontSize:12, opacity:0.6 }}>✦</span>
      <span style={{ position:'absolute', bottom:8, right:10, color:theme.gold, fontSize:12, opacity:0.6 }}>✦</span>
    </div>
  )
}

export default function ThemesPage() {
  const [selected, setSelected]     = useState(null)
  const [category, setCategory]     = useState('Semua')
  const [customCouple, setCustomCouple] = useState('')
  const [customDate, setCustomDate]   = useState('')

  const filtered = category === 'Semua' ? ALL_THEMES : ALL_THEMES.filter(t => t.category === category)
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}a{text-decoration:none;color:inherit;}.theme-card{transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;}.theme-card:hover{transform:translateY(-4px);}input{outline:none;}@media(max-width:600px){.themes-grid{grid-template-columns:1fr!important}.cat-scroll{overflow-x:auto;flex-wrap:nowrap!important;}}`}</style>

      {/* Navbar */}
      <nav style={{ position:'sticky', top:0, zIndex:50, background:'rgba(253,251,247,0.97)', borderBottom:'1px solid #E8D9BF', backdropFilter:'blur(12px)', padding:'0 5%' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
          <Link href="/" style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400 }}>
            Warkah<span style={{ color:'#C9A84C' }}>Cinta</span>
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)' }}>
              {selected ? `✓ ${selectedTheme?.name} dipilih` : `${ALL_THEMES.length} tema tersedia`}
            </span>
            <Link href="/#pakej" style={{ background:'#2C2C2A', color:'#FDFBF7', fontSize:12, padding:'8px 18px', letterSpacing:'0.1em' }}>
              Lihat Pakej
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background:'linear-gradient(160deg,#FDFBF7,#F5EFE3)', padding:'50px 5% 36px', textAlign:'center' }}>
        <p style={{ fontSize:10, letterSpacing:'0.3em', color:'#C9A84C', textTransform:'uppercase', marginBottom:10 }}>Koleksi Eksklusif</p>
        <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(28px,5vw,44px)', fontWeight:400, color:'#2C2C2A', marginBottom:10, lineHeight:1.2 }}>
          Pilih Tema <span style={{ fontStyle:'italic', color:'#C9A84C' }}>Impian Anda</span>
        </h1>
        <p style={{ fontSize:14, color:'rgba(44,44,42,0.55)', maxWidth:480, margin:'0 auto 28px', lineHeight:1.7 }}>
          Preview dengan nama anda sendiri. {ALL_THEMES.length} tema eksklusif untuk dipilih.
        </p>

        {/* Personalise */}
        <div style={{ display:'inline-flex', gap:10, alignItems:'center', flexWrap:'wrap', justifyContent:'center', background:'#FAF6EE', border:'1px solid #E8D9BF', borderRadius:12, padding:'14px 20px', maxWidth:500, margin:'0 auto 24px' }}>
          <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)', whiteSpace:'nowrap' }}>Preview nama anda:</span>
          <input type="text" placeholder="cth: Ahmad & Siti" value={customCouple} onChange={e => setCustomCouple(e.target.value)}
            style={{ width:160, padding:'8px 12px', fontSize:13, border:'1px solid #E8D9BF', background:'#FDFBF7', color:'#2C2C2A', borderRadius:6, fontFamily:'inherit' }} />
          <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)}
            style={{ width:140, padding:'8px 12px', fontSize:13, border:'1px solid #E8D9BF', background:'#FDFBF7', color:'#2C2C2A', borderRadius:6, fontFamily:'inherit' }} />
        </div>

        {/* Category filter */}
        <div className="cat-scroll" style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', padding:'0 5%' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding:'7px 18px', borderRadius:99, fontSize:12, border:'1px solid', borderColor: category===cat ? '#2C2C2A' : '#E8D9BF', background: category===cat ? '#2C2C2A' : 'transparent', color: category===cat ? '#FDFBF7' : 'rgba(44,44,42,0.6)', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', transition:'all 0.15s' }}>
              {cat} {cat !== 'Semua' ? `(${ALL_THEMES.filter(t => t.category===cat).length})` : `(${ALL_THEMES.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Theme grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 5% 140px' }}>
        <div className="themes-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
          {filtered.map(theme => {
            const isSel = selected === theme.id
            return (
              <div key={theme.id} className="theme-card" onClick={() => setSelected(isSel ? null : theme.id)}
                style={{ border: isSel ? `2px solid ${theme.gold}` : '2px solid transparent', borderRadius:16, overflow:'hidden', background:'#FDFBF7', position:'relative', boxShadow: isSel ? `0 16px 40px ${theme.gold}25` : '0 2px 12px rgba(0,0,0,0.06)' }}>

                {isSel && (
                  <div style={{ position:'absolute', top:12, right:12, zIndex:10, background:theme.gold, color:theme.bg, fontSize:11, fontWeight:500, padding:'3px 10px', borderRadius:99 }}>✓ Dipilih</div>
                )}
                {theme.tag && !isSel && (
                  <div style={{ position:'absolute', top:12, right:12, zIndex:10, background:'#2C2C2A', color:'#FDFBF7', fontSize:10, padding:'3px 10px', borderRadius:99 }}>{theme.tag}</div>
                )}

                <div style={{ padding:'16px 16px 0' }}>
                  <ThemePreview theme={theme} couple={customCouple} date={customDate} />
                </div>

                <div style={{ padding:'14px 16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                    <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:17, fontWeight:400, color:'#2C2C2A' }}>{theme.name}</div>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FAF6EE', color:'rgba(44,44,42,0.5)', border:'1px solid #E8D9BF', whiteSpace:'nowrap', marginLeft:8 }}>{theme.category}</span>
                  </div>
                  <p style={{ fontSize:12, color:'rgba(44,44,42,0.55)', lineHeight:1.5, marginBottom:10 }}>{theme.desc}</p>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                    {theme.tags.map(tag => (
                      <span key={tag} style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FAF6EE', border:'1px solid #E8D9BF', color:'rgba(44,44,42,0.5)' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div style={{ padding:'12px 16px', borderTop:'1px solid #E8D9BF', background: isSel ? theme.bg : '#FAF6EE', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'background 0.2s' }}>
                  <span style={{ fontSize:12, color: isSel ? theme.textColor : 'rgba(44,44,42,0.4)', fontWeight: isSel ? 500 : 400 }}>
                    {isSel ? '✓ Tema ini dipilih' : 'Klik untuk pilih'}
                  </span>
                  <Link href={demoUrl(theme)} target="_blank" onClick={e => e.stopPropagation()}
                    style={{ fontSize:11, color:'#C9A84C', border:'1px solid #C9A84C', padding:'4px 12px', borderRadius:4, whiteSpace:'nowrap' }}>
                    Demo →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:100, background: selected ? '#2C2C2A' : 'rgba(253,251,247,0.97)', borderTop:`1px solid ${selected ? 'transparent' : '#E8D9BF'}`, backdropFilter:'blur(12px)', padding:'14px 5%', transition:'background 0.3s' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
          {selected ? (
            <>
              <div>
                <div style={{ fontSize:11, color:'rgba(253,251,247,0.5)', marginBottom:2 }}>Tema dipilih</div>
                <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, color:'#FDFBF7' }}>
                  {selectedTheme?.name} <span style={{ fontSize:12, color:'#C9A84C', marginLeft:4 }}>·</span> <span style={{ fontSize:12, color:'rgba(253,251,247,0.5)' }}>{selectedTheme?.category}</span>
                </div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setSelected(null)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.6)', padding:'10px 20px', fontSize:12, cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.08em', borderRadius:4 }}>Tukar</button>
                <button onClick={handleOrder} style={{ background:'#C9A84C', color:'#1A1714', border:'none', padding:'12px 28px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.1em', textTransform:'uppercase', borderRadius:4 }}>
                  Order via WhatsApp →
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize:13, color:'rgba(44,44,42,0.6)' }}>👆 Pilih tema di atas untuk meneruskan order</p>
              <Link href="/#pakej" style={{ fontSize:12, color:'#C9A84C', letterSpacing:'0.05em' }}>Lihat harga pakej →</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}