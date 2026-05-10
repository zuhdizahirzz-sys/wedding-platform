'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import WeddingPage from '@/components/WeddingPage'
import { getTheme } from '@/lib/themes.config'

function DemoContent() {
  const searchParams = useSearchParams()
  const themeId     = searchParams.get('theme') || 'moden'
  const coupleParam = searchParams.get('couple')
  const dateParam   = searchParams.get('date')

  const theme = getTheme(themeId)
  const parts     = coupleParam ? coupleParam.split('&') : []
  const groomName = parts[0]?.trim() || theme.demo.couple.split('&')[0].trim()
  const brideName = parts[1]?.trim() || theme.demo.couple.split('&')[1]?.trim() || ''

  // Convert "12 April 2026" → "2026-04-12" kalau tiada dateParam
  let weddingDate = dateParam || ''
  if (!weddingDate) {
    const months = { 'Januari':1,'Februari':2,'Mac':3,'April':4,'Mei':5,'Jun':6,'Julai':7,'Ogos':8,'September':9,'Oktober':10,'November':11,'Disember':12 }
    const p = theme.demo.date.split(' ')
    const m = months[p[1]]
    weddingDate = m ? `${p[2]}-${String(m).padStart(2,'0')}-${p[0].padStart(2,'0')}` : '2026-06-15'
  }

  const clientData = {
    id: `demo-${themeId}`, slug: `demo-${themeId}`,
    groom_name: groomName, bride_name: brideName,
    wedding_date: weddingDate,
    time: '11:00 pagi — 3:00 petang',
    venue: 'Dewan Seri Angkasa', venue_address: 'Shah Alam, Selangor',
    dress_code: 'Warna pastel & krim', maps_link: 'https://maps.google.com',
    theme_id: themeId, theme_color: theme.accent, accent_color: theme.gold,
    love_story: theme.loveStory || null, active: true,
  }

  return (
    <div>
      <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:999, background:'#2C2C2A', padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, gap:8, fontFamily:"'DM Sans',system-ui,sans-serif" }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ background:'#C9A84C', color:'#1A1714', fontSize:10, padding:'2px 8px', borderRadius:99, fontWeight:500 }}>DEMO</span>
          <span style={{ color:'rgba(253,251,247,0.7)' }}>Tema: <strong style={{ color:'#FDFBF7' }}>{theme.name}</strong></span>
          <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'rgba(255,255,255,0.08)', color:'rgba(253,251,247,0.5)' }}>{theme.category}</span>
        </div>
        <a href="/themes" style={{ color:'#C9A84C', textDecoration:'none', fontSize:11, border:'1px solid rgba(201,168,76,0.4)', padding:'4px 12px', borderRadius:4, whiteSpace:'nowrap' }}>← Tukar Tema</a>
      </div>
      <div style={{ paddingTop:40 }}>
        <WeddingPage client={clientData} />
      </div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#FDFBF7' }}><p style={{ fontFamily:'Georgia,serif', fontSize:18, color:'rgba(44,44,42,0.4)' }}>Memuatkan demo...</p></div>}>
      <DemoContent />
    </Suspense>
  )
}