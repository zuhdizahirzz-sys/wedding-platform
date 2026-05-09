'use client'

import { useState, useEffect, useRef } from 'react'
import RSVPForm from './RSVPForm'

// Theme presets — each has its own bg, surface, text colors
const THEME_PRESETS = {
  moden:  { bg: '#FDFBF7', heroBg: ['#FDFBF7','#F5EEE0','#EDE2CC'], surface: 'rgba(255,255,255,0.8)', border: '#EDE2CC', text: '#2C2C2A', subtext: 'rgba(44,44,42,0.5)' },
  floral: { bg: '#FDF6F2', heroBg: ['#FDF6F2','#FAEBE4','#F0D0C2'], surface: 'rgba(255,248,245,0.8)', border: '#F0C8B8', text: '#5C2D3A', subtext: 'rgba(92,45,58,0.5)' },
  klasik: { bg: '#1A1714', heroBg: ['#1A1714','#221F1B','#2A2620'], surface: 'rgba(34,31,27,0.9)', border: 'rgba(212,168,83,0.2)', text: '#F5EFE0', subtext: 'rgba(245,239,224,0.45)' },
  sage:   { bg: '#F0F4EE', heroBg: ['#F0F4EE','#E4ECDF','#D4E2CE'], surface: 'rgba(244,248,242,0.8)', border: '#C8D8C0', text: '#2C3E2D', subtext: 'rgba(44,62,45,0.5)' },
  royal:  { bg: '#0F1B35', heroBg: ['#0F1B35','#152040','#1A2848'], surface: 'rgba(21,32,64,0.9)', border: 'rgba(200,169,110,0.2)', text: '#E8EEF8', subtext: 'rgba(232,238,248,0.45)' },
  dusty:  { bg: '#FDF4F5', heroBg: ['#FDF4F5','#F7E8EC','#EED4DB'], surface: 'rgba(255,248,249,0.8)', border: '#E8C8D0', text: '#6B3A47', subtext: 'rgba(107,58,71,0.5)' },
}

function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false })
  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate) - new Date()
      const abs = Math.abs(diff)
      setTime({ days: Math.floor(abs/86400000), hours: Math.floor((abs%86400000)/3600000), minutes: Math.floor((abs%3600000)/60000), seconds: Math.floor((abs%60000)/1000), passed: diff<=0 })
    }
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id)
  }, [targetDate])
  return time
}

const TABS = [
  { id: 'jemputan', label: 'Jemputan', icon: '✉' },
  { id: 'majlis',   label: 'Majlis',   icon: '📍' },
  { id: 'kisah',    label: 'Kisah',    icon: '💛' },
  { id: 'rsvp',     label: 'RSVP',     icon: '✓' },
]

export default function WeddingPage({ client }) {
  const [tab, setTab] = useState('jemputan')
  const countdown = useCountdown(client.wedding_date)
  const navRef = useRef(null)

  const dateFormatted = new Date(client.wedding_date).toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const dateShort     = new Date(client.wedding_date).toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })

  // Pick colors from client data
  const PRIMARY = client.theme_color  || '#2C2C2A'
  const GOLD    = client.accent_color || '#C9A84C'

  // Pick theme preset based on slug or theme_id
  const themeKey = client.theme_id || client.slug?.replace('demo-','') || 'moden'
  const P = THEME_PRESETS[themeKey] || THEME_PRESETS.moden

  function goTab(id) {
    setTab(id)
    setTimeout(() => navRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 50)
  }

  // Dynamic styles using inline — fully theme reactive
  const s = {
    page:      { fontFamily:"'DM Sans',system-ui,sans-serif", background: P.bg, color: P.text, minHeight:'100vh' },
    wrap:      { maxWidth:480, margin:'0 auto' },
    hero:      { minHeight:'100svh', background:`linear-gradient(175deg, ${P.heroBg[0]} 0%, ${P.heroBg[1]} 55%, ${P.heroBg[2]} 100%)`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden' },
    dots:      { position:'absolute', inset:0, pointerEvents:'none', backgroundImage:`radial-gradient(circle, ${GOLD}18 1px, transparent 1px)`, backgroundSize:'28px 28px' },
    corner:    { position:'absolute', fontSize:24, color:GOLD, opacity:0.3, pointerEvents:'none', fontFamily:'Georgia,serif' },
    orn:       { display:'flex', alignItems:'center', gap:10, margin:'0 auto', width:'fit-content', color:GOLD },
    ornLine:   (dir) => ({ display:'block', height:1, width:48, background:`linear-gradient(to ${dir}, transparent, ${GOLD}70)` }),
    cdBox:     { background:P.surface, border:`1px solid ${GOLD}25`, borderRadius:8, padding:'12px 4px', textAlign:'center', backdropFilter:'blur(4px)' },
    cdNum:     { fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:32, fontWeight:300, color:PRIMARY, lineHeight:1 },
    cdLbl:     { fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:P.subtext, marginTop:4 },
    navWrap:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', background:P.bg, borderBottom:`1px solid ${P.border}`, position:'sticky', top:0, zIndex:50, maxWidth:480, margin:'0 auto', width:'100%', boxShadow:'0 2px 20px rgba(0,0,0,0.06)' },
    tabBtn:    (active) => ({ padding:'14px 4px', background:'none', border:'none', borderBottom: active ? `2px solid ${PRIMARY}` : '2px solid transparent', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, transition:'all 0.2s', fontFamily:'inherit' }),
    tabIcon:   { fontSize:14 },
    tabLabel:  (active) => ({ fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color: active ? PRIMARY : P.subtext, fontWeight: active ? 500 : 400, marginTop:2 }),
    content:   { padding:'32px 24px 80px', maxWidth:480, margin:'0 auto' },
    secTag:    { fontSize:9, letterSpacing:'0.25em', color:GOLD, textTransform:'uppercase', marginBottom:10 },
    infoCard:  { display:'flex', gap:14, alignItems:'flex-start', background:P.surface, border:`1px solid ${P.border}`, borderRadius:12, padding:16, marginBottom:12 },
    infoLbl:   { fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:P.subtext, marginBottom:3 },
    infoVal:   { fontSize:14, color:P.text, lineHeight:1.5 },
    verseCard: { background:`linear-gradient(135deg, ${PRIMARY}06, ${GOLD}08)`, border:`1px solid ${GOLD}25`, borderRadius:16, padding:'28px 20px', textAlign:'center', position:'relative', overflow:'hidden', marginBottom:20 },
    invCard:   { background: P.heroBg ? `linear-gradient(160deg, ${P.heroBg[0]}, ${P.heroBg[1]})` : '#FAF6EE', border:`1px solid ${P.border}`, borderRadius:16, padding:'32px 24px', textAlign:'center', marginBottom:20 },
    ctaBtn:    { display:'block', width:'100%', background:PRIMARY, color: themeKey==='klasik'||themeKey==='royal' ? '#FDFBF7' : '#FDFBF7', border:'none', padding:15, fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', borderRadius:8, cursor:'pointer', fontFamily:'inherit', textAlign:'center', textDecoration:'none', transition:'opacity 0.2s' },
    outlineBtn:{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', border:`1px solid ${PRIMARY}`, color:PRIMARY, background:'transparent', padding:13, fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', borderRadius:8, cursor:'pointer', fontFamily:'inherit', textDecoration:'none', transition:'all 0.2s' },
    storyDot:  { width:10, height:10, borderRadius:'50%', background:GOLD, flexShrink:0 },
    storyLine: { width:1, flex:1, background:`linear-gradient(to bottom, ${GOLD}50, transparent)`, marginTop:4 },
    storyYear: { fontSize:9, letterSpacing:'0.2em', color:GOLD, textTransform:'uppercase', marginBottom:3 },
    storyTitle:{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400, color:P.text, marginBottom:4 },
    storyText: { fontSize:13, color:P.subtext, lineHeight:1.7 },
    footer:    { textAlign:'center', padding:'40px 24px 48px', borderTop:`1px solid ${P.border}`, background:`linear-gradient(to bottom, ${P.bg}, ${P.heroBg?.[1]||P.bg})` },
  }

  return (
    <div style={s.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}.anim{opacity:0;animation:fadeUp 0.7s ease forwards}.d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.6s}.d5{animation-delay:.8s}.d6{animation-delay:1s}`}</style>

      <div style={s.wrap}>

        {/* ── HERO ──────────────────────────────────────── */}
        <section style={s.hero}>
          <div style={s.dots} />
          <span style={{ ...s.corner, top:20, left:20 }}>✦</span>
          <span style={{ ...s.corner, top:20, right:20 }}>✦</span>
          <span style={{ ...s.corner, bottom:90, left:20 }}>✦</span>
          <span style={{ ...s.corner, bottom:90, right:20 }}>✦</span>

          <div style={{ position:'relative', zIndex:1, width:'100%' }}>
            <p className="anim d1" style={{ fontSize:9, letterSpacing:'0.35em', color:GOLD, textTransform:'uppercase', marginBottom:20 }}>Walimatul Urus</p>

            <div className="anim d2" style={{ marginBottom:20 }}>
              <div style={s.orn}>
                <span style={s.ornLine('right')} /><span style={{ fontSize:14 }}>❧</span><span style={s.ornLine('left')} />
              </div>
            </div>

            <p className="anim d2" style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:15, fontStyle:'italic', color:P.subtext, fontWeight:300, marginBottom:28, lineHeight:1.6 }}>
              Dengan nama Allah yang Maha Pemurah<br />lagi Maha Penyayang
            </p>

            <div className="anim d3">
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(52px,14vw,72px)', fontWeight:300, color:PRIMARY, lineHeight:1.1, letterSpacing:'0.02em', marginBottom:4 }}>{client.groom_name}</h1>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, color:GOLD, fontWeight:300, fontStyle:'italic', margin:'4px 0' }}>&</p>
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(52px,14vw,72px)', fontWeight:300, color:PRIMARY, lineHeight:1.1, letterSpacing:'0.02em' }}>{client.bride_name}</h1>
            </div>

            <div className="anim d4" style={{ margin:'24px 0' }}>
              <div style={s.orn}>
                <span style={s.ornLine('right')} /><span style={{ fontSize:14 }}>❧</span><span style={s.ornLine('left')} />
              </div>
            </div>

            <p className="anim d4" style={{ fontSize:11, letterSpacing:'0.2em', color:P.subtext, textTransform:'uppercase', marginBottom:28 }}>{dateFormatted}</p>

            <div className="anim d5" style={{ marginBottom:32 }}>
              <p style={{ fontSize:9, letterSpacing:'0.2em', color:P.subtext, textTransform:'uppercase', marginBottom:10 }}>
                {countdown.passed ? `${countdown.days} hari yang lalu` : 'Majlis bermula dalam'}
              </p>
              {!countdown.passed && (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                  {[{val:countdown.days,lbl:'Hari'},{val:countdown.hours,lbl:'Jam'},{val:countdown.minutes,lbl:'Minit'},{val:countdown.seconds,lbl:'Saat'}].map(({val,lbl}) => (
                    <div key={lbl} style={s.cdBox}>
                      <div style={s.cdNum}>{String(val).padStart(2,'0')}</div>
                      <div style={s.cdLbl}>{lbl}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="anim d6" style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => goTab('rsvp')} style={{ ...s.ctaBtn, width:'auto', padding:'13px 28px' }}>Hantar RSVP</button>
              <button onClick={() => goTab('majlis')} style={{ ...s.outlineBtn, width:'auto', padding:'12px 24px' }}>Butiran Majlis</button>
            </div>
          </div>

          <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:4, opacity:0.25 }}>
            <div style={{ width:1, height:32, background:PRIMARY }} />
            <p style={{ fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:PRIMARY }}>Scroll</p>
          </div>
        </section>

        {/* ── NAV TABS ──────────────────────────────────── */}
        <nav ref={navRef} style={s.navWrap}>
          {TABS.map(t => (
            <button key={t.id} style={s.tabBtn(tab===t.id)} onClick={() => goTab(t.id)}>
              <span style={s.tabIcon}>{t.icon}</span>
              <span style={s.tabLabel(tab===t.id)}>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* ── TAB: JEMPUTAN ─────────────────────────────── */}
        {tab === 'jemputan' && (
          <div style={s.content}>
            <div style={s.verseCard}>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontStyle:'italic', fontWeight:300, color:PRIMARY, lineHeight:1.8, marginBottom:10, position:'relative', zIndex:1 }}>
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu dapat ketenangan."
              </p>
              <p style={{ fontSize:11, color:GOLD, letterSpacing:'0.1em' }}>— Ar-Rum: 21</p>
            </div>

            <div style={s.invCard}>
              <div style={s.secTag}>Jemputan Istimewa</div>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
              <p style={{ fontSize:14, color:P.subtext, lineHeight:1.9, margin:'16px 0 20px' }}>
                Dengan penuh rasa syukur ke hadrat Ilahi, kami dengan hormatnya menjemput
                <strong style={{ color:PRIMARY, fontWeight:500 }}> Tuan / Puan sekeluarga</strong> ke majlis perkahwinan kami.
              </p>
              <div style={{ borderTop:`1px solid ${P.border}`, paddingTop:20 }}>
                <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:32, fontWeight:300, color:PRIMARY, marginBottom:6 }}>{client.groom_name} & {client.bride_name}</p>
                <p style={{ fontSize:11, letterSpacing:'0.15em', color:P.subtext, textTransform:'uppercase' }}>{dateShort}</p>
              </div>
            </div>

            <button onClick={() => goTab('rsvp')} style={s.ctaBtn}>Sahkan Kehadiran Anda →</button>
          </div>
        )}

        {/* ── TAB: MAJLIS ───────────────────────────────── */}
        {tab === 'majlis' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:28 }}>
              <p style={s.secTag}>Butiran Majlis</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
            </div>

            {[
              { icon:'📅', label:'Tarikh',       value: dateFormatted },
              { icon:'🕙', label:'Masa',         value: client.time || '11:00 pagi — 3:00 petang' },
              { icon:'🏛️', label:'Dewan',        value: client.venue },
              { icon:'📍', label:'Alamat',       value: client.venue_address },
              { icon:'👗', label:'Kod Pakaian',  value: client.dress_code || 'Warna pastel & krim' },
            ].filter(i => i.value).map(({ icon, label, value }) => (
              <div key={label} style={s.infoCard}>
                <span style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{icon}</span>
                <div>
                  <p style={s.infoLbl}>{label}</p>
                  <p style={s.infoVal}>{value}</p>
                </div>
              </div>
            ))}

            {/* Dress code swatches */}
            <div style={{ ...s.infoCard, flexDirection:'column', gap:10 }}>
              <p style={s.infoLbl}>Warna yang disyorkan</p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {[['#F5F0E8','Krim'],['#E8D9BF','Champagne'],['#C8D8C0','Sage'],['#E0C8D0','Dusty Rose'],['#D0D8E8','Periwinkle']].map(([color,name]) => (
                  <div key={name} style={{ textAlign:'center' }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:color, border:`1px solid ${P.border}`, margin:'0 auto 4px' }} />
                    <p style={{ fontSize:9, color:P.subtext }}>{name}</p>
                  </div>
                ))}
              </div>
            </div>

            {client.maps_link && (
              <a href={client.maps_link} target="_blank" rel="noopener noreferrer" style={s.outlineBtn}>🗺️ Buka Google Maps</a>
            )}
          </div>
        )}

        {/* ── TAB: KISAH ────────────────────────────────── */}
        {tab === 'kisah' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <p style={s.secTag}>Perjalanan Cinta Kami</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
            </div>

            {getStory(client).map((item, i, arr) => (
              <div key={i} style={{ display:'flex', gap:14, paddingBottom: i < arr.length-1 ? 28 : 0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:4 }}>
                  <div style={s.storyDot} />
                  {i < arr.length-1 && <div style={s.storyLine} />}
                </div>
                <div style={{ flex:1 }}>
                  <p style={s.storyYear}>{item.year}</p>
                  <p style={s.storyTitle}>{item.title}</p>
                  <p style={s.storyText}>{item.text}</p>
                </div>
              </div>
            ))}

            <div style={{ background:`linear-gradient(135deg, ${PRIMARY}06, ${GOLD}08)`, border:`1px solid ${GOLD}25`, borderRadius:16, padding:'24px 20px', marginTop:32, textAlign:'center' }}>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontStyle:'italic', color:PRIMARY, fontWeight:300, lineHeight:1.7 }}>
                "Alhamdulillah, dengan izin-Nya<br />dua hati kini bersatu."
              </p>
              <div style={{ ...s.orn, marginTop:12 }}><span style={s.ornLine('right')} /><span style={{ color:GOLD }}>✦</span><span style={s.ornLine('left')} /></div>
            </div>
          </div>
        )}

        {/* ── TAB: RSVP ─────────────────────────────────── */}
        {tab === 'rsvp' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:28 }}>
              <p style={s.secTag}>Pengesahan Kehadiran</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
              <p style={{ fontSize:13, color:P.subtext, marginTop:14, lineHeight:1.7 }}>
                Sila sahkan kehadiran sebelum <strong style={{ color:PRIMARY }}>{getRSVPDeadline(client.wedding_date)}</strong>
              </p>
            </div>
            <RSVPForm client={client} accentColor={GOLD} primaryColor={PRIMARY} textColor={P.text} surfaceColor={P.surface} borderColor={P.border} />
          </div>
        )}

        {/* ── FOOTER ────────────────────────────────────── */}
        <footer style={s.footer}>
          <div style={s.orn}><span style={s.ornLine('right')} /><span>❧</span><span style={s.ornLine('left')} /></div>
          <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, fontWeight:300, color:PRIMARY, margin:'16px 0 6px' }}>
            {client.groom_name} & {client.bride_name}
          </p>
          <p style={{ fontSize:10, letterSpacing:'0.2em', color:P.subtext, textTransform:'uppercase', marginBottom:20 }}>{dateShort}</p>
          <p style={{ fontSize:11, color:P.subtext, opacity:0.5 }}>Kad digital oleh WarkahCinta.my</p>
        </footer>
      </div>
    </div>
  )
}

function getStory(client) {
  if (client.love_story) return client.love_story
  return [
    { year:'2019', title:'Mula Berkenalan', text:'Takdir mempertemukan kami buat pertama kali dalam satu program yang tidak kami sangka-sangka.' },
    { year:'2022', title:'Detik Melamar',   text:`${client.groom_name} melamar ${client.bride_name} dengan penuh keikhlasan dan rasa cinta yang tulus.` },
    { year: new Date(client.wedding_date).getFullYear().toString(), title:'Menyempurnakan Separuh Agama', text:'Alhamdulillah, dengan izin Allah kami bersatu dalam ikatan yang suci dan mulia.' },
  ]
}

function getRSVPDeadline(weddingDate) {
  const d = new Date(weddingDate); d.setDate(d.getDate()-7)
  return d.toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })
}