'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClientDashboard({ client, rsvps }) {
  const [tab, setTab] = useState('overview')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')

  const PRIMARY = client.theme_color  || '#2C2C2A'
  const GOLD    = client.accent_color || '#C9A84C'

  const weddingDate = new Date(client.wedding_date)
  const daysLeft    = Math.ceil((weddingDate - new Date()) / 86400000)
  const isPast      = daysLeft < 0
  const dateFormatted = weddingDate.toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })

  // Stats
  const hadir    = rsvps.filter(r => r.status === 'hadir')
  const tidak    = rsvps.filter(r => r.status === 'tidak')
  const tunggu   = rsvps.filter(r => r.status === 'tunggu')
  const totalPax = hadir.reduce((s, r) => s + (r.bilangan || 1), 0)
  const ucapan   = rsvps.filter(r => r.ucapan)

  // Filtered list
  const filtered = rsvps.filter(r => {
    const matchStatus = filterStatus === 'semua' || r.status === filterStatus
    const matchSearch = r.nama.toLowerCase().includes(search.toLowerCase()) || r.telefon.includes(search)
    return matchStatus && matchSearch
  })

  const pct = rsvps.length > 0 ? Math.round((hadir.length / rsvps.length) * 100) : 0

  const s = {
    page: { fontFamily:"'DM Sans',system-ui,sans-serif", background:'#F5EFE3', minHeight:'100vh' },
    header: { background:PRIMARY, padding:'0 20px' },
    card: { background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:16, padding:'20px 24px', marginBottom:12 },
    tag: { fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:GOLD, marginBottom:8, display:'block' },
    tabBtn: (active) => ({
      flex:1, padding:'12px 8px', background:'none', border:'none',
      borderBottom: active ? `2px solid ${PRIMARY}` : '2px solid transparent',
      cursor:'pointer', fontFamily:'inherit', fontSize:12, letterSpacing:'0.05em',
      color: active ? PRIMARY : 'rgba(44,44,42,0.45)', fontWeight: active ? 500 : 400,
      transition:'all 0.15s',
    }),
  }

  return (
    <div style={s.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input{outline:none;font-family:inherit;}`}</style>

      {/* Header */}
      <header style={{ ...s.header, paddingTop:20, paddingBottom:20 }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
            <div>
              <p style={{ fontSize:10, letterSpacing:'0.2em', color:`${GOLD}`, textTransform:'uppercase', marginBottom:6, opacity:0.8 }}>Dashboard Pengantin</p>
              <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:'clamp(24px,6vw,36px)', fontWeight:400, color:'#FDFBF7', lineHeight:1.1 }}>
                {client.groom_name} <span style={{ color:GOLD, fontStyle:'italic' }}>&</span> {client.bride_name}
              </h1>
              <p style={{ fontSize:13, color:'rgba(253,251,247,0.55)', marginTop:6 }}>{dateFormatted}</p>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:48, fontWeight:300, color:GOLD, lineHeight:1 }}>
                {isPast ? '🎉' : Math.abs(daysLeft)}
              </div>
              <div style={{ fontSize:11, color:'rgba(253,251,247,0.5)', letterSpacing:'0.1em' }}>
                {isPast ? 'Majlis telah berlangsung' : 'hari lagi'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div style={{ background:PRIMARY, borderTop:'1px solid rgba(255,255,255,0.08)', padding:'16px 20px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {[
            { val:hadir.length,  lbl:'Hadir',       color:GOLD },
            { val:tidak.length,  lbl:'Tidak hadir', color:'rgba(253,251,247,0.5)' },
            { val:tunggu.length, lbl:'Belum pasti',  color:'rgba(253,251,247,0.5)' },
            { val:totalPax,      lbl:'Jumlah pax',  color:GOLD },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, fontWeight:400, color, lineHeight:1 }}>{val}</div>
              <div style={{ fontSize:10, color:'rgba(253,251,247,0.4)', letterSpacing:'0.08em', marginTop:3 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'20px 16px 80px' }}>

        {/* Tab nav */}
        <div style={{ display:'flex', background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, overflow:'hidden', marginBottom:20 }}>
          {[
            { id:'overview', label:'📊 Overview' },
            { id:'tetamu',   label:`👥 Tetamu (${rsvps.length})` },
            { id:'ucapan',   label:`💌 Ucapan (${ucapan.length})` },
          ].map(t => (
            <button key={t.id} style={s.tabBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            {/* Progress */}
            <div style={s.card}>
              <span style={s.tag}>Penerimaan RSVP</span>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
                <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:32, fontWeight:400, color:PRIMARY }}>{hadir.length} hadir</span>
                <span style={{ fontSize:13, color:'rgba(44,44,42,0.5)' }}>{pct}% daripada {rsvps.length} respons</span>
              </div>
              <div style={{ height:8, background:'#EDE2CC', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(to right,${GOLD},${PRIMARY})`, borderRadius:99, transition:'width 0.5s' }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:12, color:'rgba(44,44,42,0.45)' }}>
                <span>0</span>
                <span>Sasaran tetamu anda</span>
              </div>
            </div>

            {/* Majlis details */}
            <div style={s.card}>
              <span style={s.tag}>Butiran Majlis</span>
              {[
                { icon:'📅', label:'Tarikh', value:dateFormatted },
                { icon:'🕙', label:'Masa', value:client.time || '11:00 pagi — 3:00 petang' },
                { icon:'📍', label:'Dewan', value:client.venue },
                { icon:'🗺️', label:'Alamat', value:client.venue_address },
              ].filter(i => i.value).map(({ icon, label, value }) => (
                <div key={label} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:12 }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(44,44,42,0.4)', marginBottom:2 }}>{label}</p>
                    <p style={{ fontSize:14, color:'#2C2C2A', lineHeight:1.4 }}>{value}</p>
                  </div>
                </div>
              ))}
              {client.maps_link && (
                <a href={client.maps_link} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:PRIMARY, border:`1px solid ${PRIMARY}`, padding:'7px 16px', borderRadius:8, textDecoration:'none', marginTop:4 }}>
                  🗺️ Buka Google Maps
                </a>
              )}
            </div>

            {/* Share link */}
            <div style={{ ...s.card, background:`linear-gradient(135deg,${PRIMARY}08,${GOLD}10)`, border:`1px solid ${GOLD}30` }}>
              <span style={s.tag}>Link Kad Jemputan</span>
              <p style={{ fontSize:13, color:'rgba(44,44,42,0.6)', marginBottom:12, lineHeight:1.6 }}>
                Kongsi link ini kepada semua tetamu. Mereka boleh tengok kad dan hantar RSVP terus dari telefon.
              </p>
              <div style={{ display:'flex', gap:8, alignItems:'center', background:'rgba(255,255,255,0.7)', border:`1px solid ${GOLD}40`, borderRadius:8, padding:'10px 14px' }}>
                <span style={{ fontSize:13, color:PRIMARY, fontFamily:'monospace', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  warkahcinta.com/{client.slug}
                </span>
                <button onClick={() => { navigator.clipboard.writeText(`https://warkahcinta.com/${client.slug}`); alert('Link disalin! ✓') }}
                  style={{ fontSize:11, padding:'5px 12px', borderRadius:6, background:PRIMARY, color:'#FDFBF7', border:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                  Copy
                </button>
              </div>
              <div style={{ display:'flex', gap:8, marginTop:10 }}>
                <a href={`https://warkahcinta.com/${client.slug}`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:12, padding:'7px 14px', borderRadius:8, border:`1px solid ${PRIMARY}`, color:PRIMARY, textDecoration:'none' }}>
                  Lihat Kad →
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`Assalamualaikum! Kami menjemput anda ke majlis perkahwinan kami 🌸\n\n${client.groom_name} & ${client.bride_name}\n📅 ${dateFormatted}\n\n🔗 https://warkahcinta.com/${client.slug}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:12, padding:'7px 14px', borderRadius:8, background:'#25D366', color:'#fff', textDecoration:'none' }}>
                  💬 Share WA
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TETAMU */}
        {tab === 'tetamu' && (
          <div>
            {/* Filter & search */}
            <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
              <input
                type="text" placeholder="🔍 Cari nama atau telefon..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ flex:1, minWidth:180, padding:'10px 14px', fontSize:13, border:'1px solid #E8D9BF', borderRadius:8, background:'#FDFBF7', color:'#2C2C2A' }}
              />
              <div style={{ display:'flex', gap:6 }}>
                {[['semua','Semua'],['hadir','Hadir'],['tidak','Tidak'],['tunggu','Tunggu']].map(([val, label]) => (
                  <button key={val} onClick={() => setFilterStatus(val)}
                    style={{ fontSize:11, padding:'8px 12px', borderRadius:8, border:'1px solid', borderColor:filterStatus===val?PRIMARY:'#E8D9BF', background:filterStatus===val?PRIMARY:'transparent', color:filterStatus===val?'#FDFBF7':'rgba(44,44,42,0.5)', cursor:'pointer', fontFamily:'inherit' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize:12, color:'rgba(44,44,42,0.4)', marginBottom:12 }}>{filtered.length} rekod dijumpai</p>

            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px 20px', background:'#FDFBF7', borderRadius:16, border:'1px solid #E8D9BF' }}>
                <p style={{ fontSize:14, color:'rgba(44,44,42,0.4)' }}>Tiada rekod dijumpai</p>
              </div>
            ) : (
              <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:16, overflow:'hidden' }}>
                {filtered.map((r, i) => (
                  <div key={r.id} style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:12, padding:'14px 16px', borderBottom:i < filtered.length-1 ? '1px solid #F5EFE3' : 'none', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:500, color:'#2C2C2A', marginBottom:2 }}>{r.nama}</div>
                      <div style={{ fontSize:12, color:'rgba(44,44,42,0.45)', display:'flex', gap:12 }}>
                        <span>{r.telefon}</span>
                        <span>{r.bilangan} orang</span>
                        <span>{new Date(r.created_at).toLocaleDateString('ms-MY',{day:'numeric',month:'short'})}</span>
                      </div>
                    </div>
                    <span style={{ fontSize:11, padding:'3px 10px', borderRadius:99, background:r.status==='hadir'?'#EAF3DE':r.status==='tidak'?'#FCEBEB':'#FAEEDA', color:r.status==='hadir'?'#27500A':r.status==='tidak'?'#A32D2D':'#633806', whiteSpace:'nowrap' }}>
                      {r.status==='hadir'?'Hadir':r.status==='tidak'?'Tidak hadir':'Belum pasti'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UCAPAN */}
        {tab === 'ucapan' && (
          <div>
            {ucapan.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 20px', background:'#FDFBF7', borderRadius:16, border:'1px solid #E8D9BF' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>💌</div>
                <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, color:'#2C2C2A', marginBottom:6 }}>Belum ada ucapan</p>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.4)' }}>Ucapan dari tetamu akan muncul di sini</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {ucapan.map(r => (
                  <div key={r.id} style={{ background:'#FDFBF7', border:`1px solid ${GOLD}30`, borderRadius:14, padding:'18px 20px', position:'relative' }}>
                    <div style={{ position:'absolute', top:16, right:16, color:GOLD, fontSize:20, opacity:0.3 }}>❝</div>
                    <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:17, fontStyle:'italic', color:'#2C2C2A', lineHeight:1.7, marginBottom:12 }}>
                      "{r.ucapan}"
                    </p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:'1px solid #EDE2CC' }}>
                      <div>
                        <span style={{ fontSize:13, fontWeight:500, color:'#2C2C2A' }}>{r.nama}</span>
                        <span style={{ fontSize:11, color:'rgba(44,44,42,0.4)', marginLeft:8 }}>{r.telefon}</span>
                      </div>
                      <span style={{ fontSize:11, padding:'2px 8px', borderRadius:99, background:r.status==='hadir'?'#EAF3DE':'#FAEEDA', color:r.status==='hadir'?'#27500A':'#633806' }}>
                        {r.status==='hadir'?'Hadir':'Belum pasti'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign:'center', marginTop:32, fontSize:12, color:'rgba(44,44,42,0.3)' }}>
          <p>Dashboard ini hanya untuk {client.groom_name} & {client.bride_name}</p>
          <p style={{ marginTop:4 }}>Dikuasakan oleh <a href="https://warkahcinta.com" style={{ color:GOLD, textDecoration:'none' }}>WarkahCinta.com</a></p>
        </div>
      </div>
    </div>
  )
}