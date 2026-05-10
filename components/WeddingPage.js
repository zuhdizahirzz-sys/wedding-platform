'use client'

import { useState, useEffect, useRef } from 'react'
import RSVPForm from './RSVPForm'

// ── Theme presets ─────────────────────────────────────────
const PRESETS = {
  moden:     { bg:'#FDFBF7', heroBg:['#FDFBF7','#F5EEE0','#EDE2CC'], surface:'rgba(255,255,255,0.8)', border:'#EDE2CC', text:'#2C2C2A', sub:'rgba(44,44,42,0.5)' },
  floral:    { bg:'#FDF6F2', heroBg:['#FDF6F2','#FAEBE4','#F0D0C2'], surface:'rgba(255,248,245,0.8)', border:'#F0C8B8', text:'#5C2D3A', sub:'rgba(92,45,58,0.5)' },
  klasik:    { bg:'#1A1714', heroBg:['#1A1714','#221F1B','#2A2620'], surface:'rgba(34,31,27,0.9)',    border:'rgba(212,168,83,0.2)', text:'#F5EFE0', sub:'rgba(245,239,224,0.45)' },
  sage:      { bg:'#F0F4EE', heroBg:['#F0F4EE','#E4ECDF','#D4E2CE'], surface:'rgba(244,248,242,0.8)', border:'#C8D8C0', text:'#2C3E2D', sub:'rgba(44,62,45,0.5)' },
  royal:     { bg:'#0F1B35', heroBg:['#0F1B35','#152040','#1A2848'], surface:'rgba(21,32,64,0.9)',    border:'rgba(200,169,110,0.2)', text:'#E8EEF8', sub:'rgba(232,238,248,0.45)' },
  dusty:     { bg:'#FDF4F5', heroBg:['#FDF4F5','#F7E8EC','#EED4DB'], surface:'rgba(255,248,249,0.8)', border:'#E8C8D0', text:'#6B3A47', sub:'rgba(107,58,71,0.5)' },
  islamik:   { bg:'#F8F3E8', heroBg:['#F8F3E8','#F0E8D0','#E4D8B8'], surface:'rgba(253,249,240,0.9)', border:'#D4C080', text:'#1E3214', sub:'rgba(30,50,20,0.5)' },
  songket:   { bg:'#1C0A00', heroBg:['#1C0A00','#2A1200','#381800'], surface:'rgba(42,18,0,0.9)',     border:'rgba(212,160,48,0.3)', text:'#F5E8C8', sub:'rgba(245,232,200,0.5)' },
  noir:      { bg:'#0D0D0D', heroBg:['#0D0D0D','#141414','#1C1C1C'], surface:'rgba(26,26,26,0.9)',    border:'rgba(255,255,255,0.12)', text:'#F0F0F0', sub:'rgba(240,240,240,0.45)' },
  hutan:     { bg:'#0F1F0F', heroBg:['#0F1F0F','#142014','#1A2A1A'], surface:'rgba(20,32,20,0.9)',    border:'rgba(124,184,124,0.25)', text:'#D8F0D0', sub:'rgba(216,240,208,0.5)' },
  pantai:    { bg:'#0A1628', heroBg:['#0A1628','#0D1C30','#102238'], surface:'rgba(14,28,48,0.9)',    border:'rgba(74,158,191,0.25)', text:'#D8EEF8', sub:'rgba(216,238,248,0.5)' },
  lavender:  { bg:'#F5F0FF', heroBg:['#F5F0FF','#EDE5FF','#E0D4F8'], surface:'rgba(250,247,255,0.8)', border:'#D4C4F0', text:'#3D2A60', sub:'rgba(61,42,96,0.5)' },
  arabesque: { bg:'#F9F4ED', heroBg:['#F9F4ED','#F2E8D8','#E8D8C0'], surface:'rgba(253,249,244,0.9)', border:'#E0C8A8', text:'#3D2010', sub:'rgba(61,32,16,0.5)' },
  batik:     { bg:'#FFF8F0', heroBg:['#FFF8F0','#FFE8D0','#FFD8B8'], surface:'rgba(255,252,248,0.9)', border:'#F0C8A0', text:'#4A1808', sub:'rgba(74,24,8,0.5)' },
  emerald:   { bg:'#0A1F14', heroBg:['#0A1F14','#0D2618','#102E1C'], surface:'rgba(15,38,26,0.9)',    border:'rgba(46,204,113,0.2)', text:'#D5F5E3', sub:'rgba(213,245,227,0.5)' },
  rustic:    { bg:'#F5ECD8', heroBg:['#F5ECD8','#EDE0C4','#E0D0A8'], surface:'rgba(250,243,232,0.9)', border:'#DEC8A0', text:'#3A2010', sub:'rgba(58,32,16,0.5)' },
}

// ── SVG Decorations per theme ─────────────────────────────
function ThemeDecoration({ themeId, gold, position = 'top' }) {
  const opacity = 0.55
  const style = {
    position: 'absolute', pointerEvents: 'none',
    ...(position === 'top'    ? { top: 0, left: 0, right: 0 }    : {}),
    ...(position === 'bottom' ? { bottom: 0, left: 0, right: 0 } : {}),
    ...(position === 'topleft'    ? { top: 0, left: 0 }     : {}),
    ...(position === 'topright'   ? { top: 0, right: 0 }    : {}),
    ...(position === 'bottomleft' ? { bottom: 0, left: 0 }  : {}),
    ...(position === 'bottomright'? { bottom: 0, right: 0 } : {}),
  }

  // FLORAL — bunga ros di sudut
  if (themeId === 'floral' || themeId === 'dusty' || themeId === 'lavender') {
    const c = themeId === 'lavender' ? gold : themeId === 'dusty' ? '#C4909F' : gold
    if (position === 'topleft') return (
      <svg style={{ ...style, width:160, height:160, opacity }} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" fill={c} opacity="0.3"/>
        <circle cx="20" cy="20" r="7" fill={c} opacity="0.5"/>
        <circle cx="40" cy="10" r="9" fill={c} opacity="0.25"/>
        <circle cx="10" cy="42" r="8" fill={c} opacity="0.25"/>
        <circle cx="55" cy="25" r="6" fill={c} opacity="0.2"/>
        <circle cx="25" cy="58" r="6" fill={c} opacity="0.2"/>
        <ellipse cx="15" cy="30" rx="18" ry="8" fill={c} opacity="0.15" transform="rotate(-30 15 30)"/>
        <ellipse cx="30" cy="15" rx="18" ry="7" fill={c} opacity="0.15" transform="rotate(20 30 15)"/>
        <ellipse cx="60" cy="40" rx="14" ry="6" fill={c} opacity="0.12" transform="rotate(-45 60 40)"/>
        <ellipse cx="40" cy="62" rx="14" ry="5" fill={c} opacity="0.12" transform="rotate(15 40 62)"/>
        <line x1="20" y1="20" x2="60" y2="60" stroke={c} strokeWidth="0.5" opacity="0.3"/>
        <line x1="10" y1="40" x2="45" y2="75" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <circle cx="65" cy="65" r="4" fill={c} opacity="0.15"/>
        <circle cx="75" cy="45" r="3" fill={c} opacity="0.1"/>
        <circle cx="45" cy="78" r="3" fill={c} opacity="0.1"/>
      </svg>
    )
    if (position === 'topright') return (
      <svg style={{ ...style, width:160, height:160, opacity, transform:'scaleX(-1)' }} viewBox="0 0 160 160" fill="none">
        <circle cx="20" cy="20" r="12" fill={c} opacity="0.3"/>
        <circle cx="20" cy="20" r="7" fill={c} opacity="0.5"/>
        <circle cx="40" cy="10" r="9" fill={c} opacity="0.25"/>
        <circle cx="10" cy="42" r="8" fill={c} opacity="0.25"/>
        <circle cx="55" cy="25" r="6" fill={c} opacity="0.2"/>
        <circle cx="25" cy="58" r="6" fill={c} opacity="0.2"/>
        <ellipse cx="15" cy="30" rx="18" ry="8" fill={c} opacity="0.15" transform="rotate(-30 15 30)"/>
        <ellipse cx="30" cy="15" rx="18" ry="7" fill={c} opacity="0.15" transform="rotate(20 30 15)"/>
        <ellipse cx="60" cy="40" rx="14" ry="6" fill={c} opacity="0.12" transform="rotate(-45 60 40)"/>
        <ellipse cx="40" cy="62" rx="14" ry="5" fill={c} opacity="0.12" transform="rotate(15 40 62)"/>
        <line x1="20" y1="20" x2="60" y2="60" stroke={c} strokeWidth="0.5" opacity="0.3"/>
        <circle cx="65" cy="65" r="4" fill={c} opacity="0.15"/>
      </svg>
    )
    if (position === 'bottomleft') return (
      <svg style={{ ...style, width:160, height:160, opacity, transform:'scaleY(-1)' }} viewBox="0 0 160 160" fill="none">
        <circle cx="20" cy="20" r="12" fill={c} opacity="0.3"/>
        <circle cx="20" cy="20" r="7" fill={c} opacity="0.5"/>
        <circle cx="40" cy="10" r="9" fill={c} opacity="0.25"/>
        <circle cx="10" cy="42" r="8" fill={c} opacity="0.25"/>
        <ellipse cx="15" cy="30" rx="18" ry="8" fill={c} opacity="0.15" transform="rotate(-30 15 30)"/>
        <ellipse cx="30" cy="15" rx="18" ry="7" fill={c} opacity="0.15" transform="rotate(20 30 15)"/>
        <line x1="20" y1="20" x2="55" y2="55" stroke={c} strokeWidth="0.5" opacity="0.3"/>
      </svg>
    )
    if (position === 'bottomright') return (
      <svg style={{ ...style, width:160, height:160, opacity, transform:'scale(-1,-1)' }} viewBox="0 0 160 160" fill="none">
        <circle cx="20" cy="20" r="12" fill={c} opacity="0.3"/>
        <circle cx="20" cy="20" r="7" fill={c} opacity="0.5"/>
        <circle cx="40" cy="10" r="9" fill={c} opacity="0.25"/>
        <ellipse cx="15" cy="30" rx="18" ry="8" fill={c} opacity="0.15" transform="rotate(-30 15 30)"/>
        <ellipse cx="30" cy="15" rx="18" ry="7" fill={c} opacity="0.15" transform="rotate(20 30 15)"/>
      </svg>
    )
  }

  // ISLAMIK / ARABESQUE — corak geometri & kaligrafi
  if (themeId === 'islamik' || themeId === 'arabesque') {
    if (position === 'top') return (
      <svg style={{ ...style, width:'100%', height:80, opacity }} viewBox="0 0 400 80" preserveAspectRatio="xMidYMid meet" fill="none">
        <path d="M200 5 L210 20 L225 10 L220 25 L235 20 L225 32 L235 40 L220 38 L225 55 L210 45 L200 60 L190 45 L175 55 L180 38 L165 40 L175 32 L165 20 L180 25 L175 10 L190 20 Z" fill={gold} opacity="0.4"/>
        <path d="M200 15 L207 25 L218 18 L214 28 L224 24 L217 33 L224 40 L214 38 L218 50 L207 43 L200 53 L193 43 L182 50 L186 38 L176 40 L183 33 L176 24 L186 28 L182 18 L193 25 Z" fill={gold} opacity="0.2"/>
        <line x1="100" y1="40" x2="170" y2="40" stroke={gold} strokeWidth="0.5" opacity="0.4"/>
        <line x1="230" y1="40" x2="300" y2="40" stroke={gold} strokeWidth="0.5" opacity="0.4"/>
        <circle cx="95" cy="40" r="2" fill={gold} opacity="0.5"/>
        <circle cx="305" cy="40" r="2" fill={gold} opacity="0.5"/>
        <path d="M120 30 Q130 40 120 50" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <path d="M280 30 Q270 40 280 50" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <rect x="60" y="35" width="10" height="10" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.3" transform="rotate(45 65 40)"/>
        <rect x="330" y="35" width="10" height="10" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.3" transform="rotate(45 335 40)"/>
      </svg>
    )
  }

  // SONGKET / BATIK — motif tenun
  if (themeId === 'songket' || themeId === 'batik') {
    const c = themeId === 'batik' ? gold : gold
    if (position === 'top') return (
      <svg style={{ ...style, width:'100%', height:60, opacity:0.5 }} viewBox="0 0 400 60" preserveAspectRatio="xMidYMid meet" fill="none">
        <line x1="0" y1="5" x2="400" y2="5" stroke={c} strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="10" x2="400" y2="10" stroke={c} strokeWidth="1.5" opacity="0.6"/>
        <line x1="0" y1="15" x2="400" y2="15" stroke={c} strokeWidth="0.5" opacity="0.5"/>
        {[0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375].map(x => (
          <g key={x}>
            <rect x={x+5} y="20" width="10" height="10" fill="none" stroke={c} strokeWidth="0.8" opacity="0.5" transform={`rotate(45 ${x+10} 25)`}/>
            <circle cx={x+10} cy={40} r="2" fill={c} opacity="0.3"/>
          </g>
        ))}
        <line x1="0" y1="50" x2="400" y2="50" stroke={c} strokeWidth="1" opacity="0.4"/>
      </svg>
    )
    if (position === 'bottom') return (
      <svg style={{ ...style, width:'100%', height:60, opacity:0.5, transform:'scaleY(-1)' }} viewBox="0 0 400 60" preserveAspectRatio="xMidYMid meet" fill="none">
        <line x1="0" y1="5" x2="400" y2="5" stroke={c} strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="10" x2="400" y2="10" stroke={c} strokeWidth="1.5" opacity="0.6"/>
        <line x1="0" y1="15" x2="400" y2="15" stroke={c} strokeWidth="0.5" opacity="0.5"/>
        {[0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375].map(x => (
          <g key={x}><rect x={x+5} y="20" width="10" height="10" fill="none" stroke={c} strokeWidth="0.8" opacity="0.5" transform={`rotate(45 ${x+10} 25)`}/></g>
        ))}
        <line x1="0" y1="50" x2="400" y2="50" stroke={c} strokeWidth="1" opacity="0.4"/>
      </svg>
    )
  }

  // SAGE / HUTAN — daun & ranting
  if (themeId === 'sage' || themeId === 'hutan' || themeId === 'rustic') {
    if (position === 'topleft') return (
      <svg style={{ ...style, width:180, height:180, opacity }} viewBox="0 0 180 180" fill="none">
        <path d="M10 80 Q30 20 80 10" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M10 80 Q5 50 30 40" stroke={gold} strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="45" cy="25" rx="18" ry="10" fill={gold} opacity="0.15" transform="rotate(-40 45 25)"/>
        <ellipse cx="65" cy="18" rx="16" ry="8" fill={gold} opacity="0.12" transform="rotate(-20 65 18)"/>
        <ellipse cx="20" cy="55" rx="14" ry="7" fill={gold} opacity="0.12" transform="rotate(-60 20 55)"/>
        <ellipse cx="30" cy="38" rx="12" ry="6" fill={gold} opacity="0.1" transform="rotate(-50 30 38)"/>
        <circle cx="82" cy="10" r="3" fill={gold} opacity="0.3"/>
        <circle cx="70" cy="8" r="2" fill={gold} opacity="0.2"/>
        <path d="M15 90 Q8 70 18 60" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <ellipse cx="14" cy="72" rx="10" ry="5" fill={gold} opacity="0.1" transform="rotate(-70 14 72)"/>
      </svg>
    )
    if (position === 'topright') return (
      <svg style={{ ...style, width:180, height:180, opacity, transform:'scaleX(-1)' }} viewBox="0 0 180 180" fill="none">
        <path d="M10 80 Q30 20 80 10" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="45" cy="25" rx="18" ry="10" fill={gold} opacity="0.15" transform="rotate(-40 45 25)"/>
        <ellipse cx="65" cy="18" rx="16" ry="8" fill={gold} opacity="0.12" transform="rotate(-20 65 18)"/>
        <ellipse cx="20" cy="55" rx="14" ry="7" fill={gold} opacity="0.12" transform="rotate(-60 20 55)"/>
        <circle cx="82" cy="10" r="3" fill={gold} opacity="0.3"/>
      </svg>
    )
    if (position === 'bottomleft') return (
      <svg style={{ ...style, width:180, height:180, opacity, transform:'scaleY(-1)' }} viewBox="0 0 180 180" fill="none">
        <path d="M10 80 Q30 20 80 10" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="45" cy="25" rx="18" ry="10" fill={gold} opacity="0.15" transform="rotate(-40 45 25)"/>
        <ellipse cx="65" cy="18" rx="16" ry="8" fill={gold} opacity="0.12" transform="rotate(-20 65 18)"/>
        <circle cx="82" cy="10" r="3" fill={gold} opacity="0.3"/>
      </svg>
    )
    if (position === 'bottomright') return (
      <svg style={{ ...style, width:180, height:180, opacity, transform:'scale(-1,-1)' }} viewBox="0 0 180 180" fill="none">
        <path d="M10 80 Q30 20 80 10" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="45" cy="25" rx="18" ry="10" fill={gold} opacity="0.15" transform="rotate(-40 45 25)"/>
        <circle cx="82" cy="10" r="3" fill={gold} opacity="0.3"/>
      </svg>
    )
  }

  // ROYAL / NOIR / KLASIK / EMERALD / PANTAI — border mewah
  if (['royal','noir','klasik','emerald','pantai'].includes(themeId)) {
    if (position === 'top') return (
      <svg style={{ ...style, width:'100%', height:50, opacity:0.5 }} viewBox="0 0 400 50" preserveAspectRatio="xMidYMid meet" fill="none">
        <line x1="20" y1="8" x2="380" y2="8" stroke={gold} strokeWidth="0.5" opacity="0.6"/>
        <line x1="20" y1="12" x2="380" y2="12" stroke={gold} strokeWidth="1" opacity="0.8"/>
        <line x1="20" y1="16" x2="380" y2="16" stroke={gold} strokeWidth="0.5" opacity="0.6"/>
        <circle cx="200" cy="30" r="8" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6"/>
        <circle cx="200" cy="30" r="4" fill={gold} opacity="0.3"/>
        <line x1="160" y1="30" x2="188" y2="30" stroke={gold} strokeWidth="0.5" opacity="0.5"/>
        <line x1="212" y1="30" x2="240" y2="30" stroke={gold} strokeWidth="0.5" opacity="0.5"/>
        <path d="M20 12 L30 8 L20 4" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M380 12 L370 8 L380 4" stroke={gold} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <rect x="190" y="22" width="20" height="16" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.3" transform="rotate(45 200 30)"/>
      </svg>
    )
    if (position === 'bottom') return (
      <svg style={{ ...style, width:'100%', height:50, opacity:0.5, transform:'scaleY(-1)' }} viewBox="0 0 400 50" preserveAspectRatio="xMidYMid meet" fill="none">
        <line x1="20" y1="8" x2="380" y2="8" stroke={gold} strokeWidth="0.5" opacity="0.6"/>
        <line x1="20" y1="12" x2="380" y2="12" stroke={gold} strokeWidth="1" opacity="0.8"/>
        <line x1="20" y1="16" x2="380" y2="16" stroke={gold} strokeWidth="0.5" opacity="0.6"/>
        <circle cx="200" cy="30" r="8" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6"/>
        <circle cx="200" cy="30" r="4" fill={gold} opacity="0.3"/>
        <line x1="160" y1="30" x2="188" y2="30" stroke={gold} strokeWidth="0.5" opacity="0.5"/>
        <line x1="212" y1="30" x2="240" y2="30" stroke={gold} strokeWidth="0.5" opacity="0.5"/>
      </svg>
    )
  }

  return null
}

// ── Countdown ─────────────────────────────────────────────
function useCountdown(targetDate) {
  const [time, setTime] = useState({ days:0, hours:0, minutes:0, seconds:0, passed:false })
  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate) - new Date()
      const abs = Math.abs(diff)
      setTime({ days:Math.floor(abs/86400000), hours:Math.floor((abs%86400000)/3600000), minutes:Math.floor((abs%3600000)/60000), seconds:Math.floor((abs%60000)/1000), passed:diff<=0 })
    }
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id)
  }, [targetDate])
  return time
}

const TABS = [
  { id:'jemputan', label:'Jemputan', icon:'✉' },
  { id:'majlis',   label:'Majlis',   icon:'📍' },
  { id:'kisah',    label:'Kisah',    icon:'💛' },
  { id:'rsvp',     label:'RSVP',     icon:'✓' },
]

export default function WeddingPage({ client }) {
  const [tab, setTab] = useState('jemputan')
  const countdown = useCountdown(client.wedding_date)
  const navRef = useRef(null)

  const dateFormatted = new Date(client.wedding_date).toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const dateShort     = new Date(client.wedding_date).toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })

  const PRIMARY  = client.theme_color  || '#2C2C2A'
  const GOLD     = client.accent_color || '#C9A84C'
  const themeKey = client.theme_id || client.slug?.replace('demo-','') || 'moden'
  const P        = PRESETS[themeKey] || PRESETS.moden

  function goTab(id) {
    setTab(id)
    setTimeout(() => navRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 50)
  }

  const s = {
    page:      { fontFamily:"'DM Sans',system-ui,sans-serif", background:P.bg, color:P.text, minHeight:'100vh' },
    wrap:      { maxWidth:480, margin:'0 auto' },
    hero:      { minHeight:'100svh', background:`linear-gradient(175deg,${P.heroBg[0]} 0%,${P.heroBg[1]} 55%,${P.heroBg[2]} 100%)`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px 80px', textAlign:'center', position:'relative', overflow:'hidden' },
    orn:       { display:'flex', alignItems:'center', gap:10, margin:'0 auto', width:'fit-content', color:GOLD },
    ornLine:   (dir) => ({ display:'block', height:1, width:48, background:`linear-gradient(to ${dir},transparent,${GOLD}70)` }),
    cdBox:     { background:P.surface, border:`1px solid ${GOLD}25`, borderRadius:8, padding:'12px 4px', textAlign:'center' },
    cdNum:     { fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:32, fontWeight:300, color:PRIMARY, lineHeight:1 },
    cdLbl:     { fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:P.sub, marginTop:4 },
    navWrap:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', background:P.bg, borderBottom:`1px solid ${P.border}`, position:'sticky', top:0, zIndex:50, maxWidth:480, margin:'0 auto', width:'100%', boxShadow:'0 2px 20px rgba(0,0,0,0.06)' },
    tabBtn:    (active) => ({ padding:'14px 4px', background:'none', border:'none', borderBottom:active?`2px solid ${PRIMARY}`:'2px solid transparent', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, fontFamily:'inherit' }),
    tabLabel:  (active) => ({ fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:active?PRIMARY:P.sub, fontWeight:active?500:400, marginTop:2 }),
    content:   { padding:'32px 24px 80px', maxWidth:480, margin:'0 auto' },
    secTag:    { fontSize:9, letterSpacing:'0.25em', color:GOLD, textTransform:'uppercase', marginBottom:10 },
    infoCard:  { display:'flex', gap:14, alignItems:'flex-start', background:P.surface, border:`1px solid ${P.border}`, borderRadius:12, padding:16, marginBottom:12 },
    infoLbl:   { fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:P.sub, marginBottom:3 },
    infoVal:   { fontSize:14, color:P.text, lineHeight:1.5 },
    verseCard: { background:`linear-gradient(135deg,${PRIMARY}06,${GOLD}08)`, border:`1px solid ${GOLD}25`, borderRadius:16, padding:'28px 20px', textAlign:'center', position:'relative', overflow:'hidden', marginBottom:20 },
    invCard:   { background:`linear-gradient(160deg,${P.heroBg[0]},${P.heroBg[1]})`, border:`1px solid ${P.border}`, borderRadius:16, padding:'32px 24px', textAlign:'center', marginBottom:20, position:'relative', overflow:'hidden' },
    ctaBtn:    { display:'block', width:'100%', background:PRIMARY, color:'#FDFBF7', border:'none', padding:15, fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', borderRadius:8, cursor:'pointer', fontFamily:'inherit', textDecoration:'none', textAlign:'center' },
    outlineBtn:{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', border:`1px solid ${PRIMARY}`, color:PRIMARY, background:'transparent', padding:13, fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', borderRadius:8, cursor:'pointer', fontFamily:'inherit', textDecoration:'none' },
    footer:    { textAlign:'center', padding:'40px 24px 48px', borderTop:`1px solid ${P.border}`, background:`linear-gradient(to bottom,${P.bg},${P.heroBg[1]||P.bg})`, position:'relative', overflow:'hidden' },
  }

  return (
    <div style={s.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}.anim{opacity:0;animation:fadeUp 0.7s ease forwards}.d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.6s}.d5{animation-delay:.8s}.d6{animation-delay:1s}`}</style>

      <div style={s.wrap}>

        {/* HERO */}
        <section style={s.hero}>
          {/* Background dots */}
          <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle,${GOLD}18 1px,transparent 1px)`, backgroundSize:'28px 28px', opacity:0.4 }} />

          {/* Theme-specific decorations */}
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="topleft" />
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="topright" />
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="bottomleft" />
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="bottomright" />
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="top" />
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="bottom" />

          {/* Simple corner ornaments untuk semua tema */}
          <span style={{ position:'absolute', top:20, left:20, color:GOLD, fontSize:20, opacity:0.3, pointerEvents:'none' }}>✦</span>
          <span style={{ position:'absolute', top:20, right:20, color:GOLD, fontSize:20, opacity:0.3, pointerEvents:'none' }}>✦</span>
          <span style={{ position:'absolute', bottom:90, left:20, color:GOLD, fontSize:20, opacity:0.3, pointerEvents:'none' }}>✦</span>
          <span style={{ position:'absolute', bottom:90, right:20, color:GOLD, fontSize:20, opacity:0.3, pointerEvents:'none' }}>✦</span>

          <div style={{ position:'relative', zIndex:1, width:'100%' }}>
            <p className="anim d1" style={{ fontSize:9, letterSpacing:'0.35em', color:GOLD, textTransform:'uppercase', marginBottom:20 }}>Walimatul Urus</p>
            <div className="anim d2" style={{ marginBottom:20 }}>
              <div style={s.orn}><span style={s.ornLine('right')} /><span style={{ fontSize:14 }}>❧</span><span style={s.ornLine('left')} /></div>
            </div>
            <p className="anim d2" style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:15, fontStyle:'italic', color:P.sub, fontWeight:300, marginBottom:28, lineHeight:1.6 }}>
              Dengan nama Allah yang Maha Pemurah<br />lagi Maha Penyayang
            </p>
            <div className="anim d3">
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(52px,14vw,72px)', fontWeight:300, color:PRIMARY, lineHeight:1.1, letterSpacing:'0.02em', marginBottom:4 }}>{client.groom_name}</h1>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, color:GOLD, fontWeight:300, fontStyle:'italic', margin:'4px 0' }}>&</p>
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(52px,14vw,72px)', fontWeight:300, color:PRIMARY, lineHeight:1.1, letterSpacing:'0.02em' }}>{client.bride_name}</h1>
            </div>
            <div className="anim d4" style={{ margin:'24px 0' }}>
              <div style={s.orn}><span style={s.ornLine('right')} /><span style={{ fontSize:14 }}>❧</span><span style={s.ornLine('left')} /></div>
            </div>
            <p className="anim d4" style={{ fontSize:11, letterSpacing:'0.2em', color:P.sub, textTransform:'uppercase', marginBottom:28 }}>{dateFormatted}</p>
            <div className="anim d5" style={{ marginBottom:32 }}>
              <p style={{ fontSize:9, letterSpacing:'0.2em', color:P.sub, textTransform:'uppercase', marginBottom:10 }}>
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

        {/* NAV */}
        <nav ref={navRef} style={s.navWrap}>
          {TABS.map(t => (
            <button key={t.id} style={s.tabBtn(tab===t.id)} onClick={() => goTab(t.id)}>
              <span style={{ fontSize:14 }}>{t.icon}</span>
              <span style={s.tabLabel(tab===t.id)}>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* JEMPUTAN */}
        {tab === 'jemputan' && (
          <div style={s.content}>
            <div style={s.verseCard}>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontStyle:'italic', fontWeight:300, color:PRIMARY, lineHeight:1.8, marginBottom:10, position:'relative', zIndex:1 }}>
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu dapat ketenangan."
              </p>
              <p style={{ fontSize:11, color:GOLD, letterSpacing:'0.1em' }}>— Ar-Rum: 21</p>
            </div>
            <div style={{ ...s.invCard }}>
              {/* Decoration dalam kad jemputan */}
              <ThemeDecoration themeId={themeKey} gold={GOLD} position="topleft" />
              <ThemeDecoration themeId={themeKey} gold={GOLD} position="topright" />
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={s.secTag}>Jemputan Istimewa</div>
                <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
                <p style={{ fontSize:14, color:P.sub, lineHeight:1.9, margin:'16px 0 20px' }}>
                  Dengan penuh rasa syukur ke hadrat Ilahi, kami dengan hormatnya menjemput
                  <strong style={{ color:PRIMARY, fontWeight:500 }}> Tuan / Puan sekeluarga</strong> ke majlis perkahwinan kami.
                </p>
                <div style={{ borderTop:`1px solid ${P.border}`, paddingTop:20 }}>
                  <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:32, fontWeight:300, color:PRIMARY, marginBottom:6 }}>{client.groom_name} & {client.bride_name}</p>
                  <p style={{ fontSize:11, letterSpacing:'0.15em', color:P.sub, textTransform:'uppercase' }}>{dateShort}</p>
                </div>
              </div>
            </div>
            <button onClick={() => goTab('rsvp')} style={s.ctaBtn}>Sahkan Kehadiran Anda →</button>
          </div>
        )}

        {/* MAJLIS */}
        {tab === 'majlis' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:28 }}>
              <p style={s.secTag}>Butiran Majlis</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
            </div>
            {[
              { icon:'📅', label:'Tarikh', value:dateFormatted },
              { icon:'🕙', label:'Masa', value:client.time||'11:00 pagi — 3:00 petang' },
              { icon:'🏛️', label:'Dewan', value:client.venue },
              { icon:'📍', label:'Alamat', value:client.venue_address },
              { icon:'👗', label:'Kod Pakaian', value:client.dress_code||'Warna pastel & krim' },
            ].filter(i => i.value).map(({ icon, label, value }) => (
              <div key={label} style={s.infoCard}>
                <span style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{icon}</span>
                <div><p style={s.infoLbl}>{label}</p><p style={s.infoVal}>{value}</p></div>
              </div>
            ))}
            <div style={{ ...s.infoCard, flexDirection:'column', gap:10 }}>
              <p style={s.infoLbl}>Warna yang disyorkan</p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {[['#F5F0E8','Krim'],['#E8D9BF','Champagne'],['#C8D8C0','Sage'],['#E0C8D0','Dusty Rose'],['#D0D8E8','Periwinkle']].map(([color,name]) => (
                  <div key={name} style={{ textAlign:'center' }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:color, border:`1px solid ${P.border}`, margin:'0 auto 4px' }} />
                    <p style={{ fontSize:9, color:P.sub }}>{name}</p>
                  </div>
                ))}
              </div>
            </div>
            {client.maps_link && (
              <a href={client.maps_link} target="_blank" rel="noopener noreferrer" style={s.outlineBtn}>🗺️ Buka Google Maps</a>
            )}
          </div>
        )}

        {/* KISAH */}
        {tab === 'kisah' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <p style={s.secTag}>Perjalanan Cinta Kami</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
            </div>
            {getStory(client).map((item, i, arr) => (
              <div key={i} style={{ display:'flex', gap:14, paddingBottom:i<arr.length-1?28:0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:4 }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:GOLD, flexShrink:0 }} />
                  {i<arr.length-1 && <div style={{ width:1, flex:1, background:`linear-gradient(to bottom,${GOLD}50,transparent)`, marginTop:4 }} />}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:9, letterSpacing:'0.2em', color:GOLD, textTransform:'uppercase', marginBottom:3 }}>{item.year}</p>
                  <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400, color:P.text, marginBottom:4 }}>{item.title}</p>
                  <p style={{ fontSize:13, color:P.sub, lineHeight:1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
            <div style={{ background:`linear-gradient(135deg,${PRIMARY}06,${GOLD}08)`, border:`1px solid ${GOLD}25`, borderRadius:16, padding:'24px 20px', marginTop:32, textAlign:'center' }}>
              <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontStyle:'italic', color:PRIMARY, fontWeight:300, lineHeight:1.7 }}>
                "Alhamdulillah, dengan izin-Nya<br />dua hati kini bersatu."
              </p>
              <div style={{ ...s.orn, marginTop:12 }}><span style={s.ornLine('right')} /><span style={{ color:GOLD }}>✦</span><span style={s.ornLine('left')} /></div>
            </div>
          </div>
        )}

        {/* RSVP */}
        {tab === 'rsvp' && (
          <div style={s.content}>
            <div style={{ textAlign:'center', marginBottom:28 }}>
              <p style={s.secTag}>Pengesahan Kehadiran</p>
              <div style={s.orn}><span style={s.ornLine('right')} /><span>✦</span><span style={s.ornLine('left')} /></div>
              <p style={{ fontSize:13, color:P.sub, marginTop:14, lineHeight:1.7 }}>
                Sila sahkan kehadiran sebelum <strong style={{ color:PRIMARY }}>{getRSVPDeadline(client.wedding_date)}</strong>
              </p>
            </div>
            <RSVPForm client={client} accentColor={GOLD} primaryColor={PRIMARY} textColor={P.text} surfaceColor={P.surface} borderColor={P.border} />
          </div>
        )}

        {/* FOOTER */}
        <footer style={s.footer}>
          <ThemeDecoration themeId={themeKey} gold={GOLD} position="top" />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={s.orn}><span style={s.ornLine('right')} /><span>❧</span><span style={s.ornLine('left')} /></div>
            <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, fontWeight:300, color:PRIMARY, margin:'16px 0 6px' }}>{client.groom_name} & {client.bride_name}</p>
            <p style={{ fontSize:10, letterSpacing:'0.2em', color:P.sub, textTransform:'uppercase', marginBottom:20 }}>{dateShort}</p>
            <p style={{ fontSize:11, color:P.sub, opacity:0.5 }}>Kad digital oleh WarkahCinta.com</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function getStory(client) {
  if (client.love_story) return client.love_story
  return [
    { year:'2019', title:'Mula Berkenalan', text:'Takdir mempertemukan kami buat pertama kali dalam satu program yang tidak kami sangka-sangka.' },
    { year:'2022', title:'Detik Melamar', text:`${client.groom_name} melamar ${client.bride_name} dengan penuh keikhlasan dan rasa cinta yang tulus.` },
    { year:new Date(client.wedding_date).getFullYear().toString(), title:'Menyempurnakan Separuh Agama', text:'Alhamdulillah, dengan izin Allah kami bersatu dalam ikatan yang suci dan mulia.' },
  ]
}

function getRSVPDeadline(weddingDate) {
  const d = new Date(weddingDate); d.setDate(d.getDate()-7)
  return d.toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })
}