'use client'

import { useState } from 'react'

const THEME_OPTIONS = ['moden', 'floral', 'klasik', 'sage', 'royal', 'dusty']

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPw, setWrongPw] = useState(false)
  const [clients, setClients] = useState([])
  const [rsvps, setRsvps] = useState({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('klien')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [saved, setSaved] = useState(false)
  const [newClient, setNewClient] = useState({
    groom_name: '', bride_name: '', wedding_date: '',
    time: '11:00 pagi — 3:00 petang', venue: '', venue_address: '',
    dress_code: 'Warna pastel & krim', maps_link: '',
    theme_id: 'moden', theme_color: '#2C2C2A', accent_color: '#C9A84C', slug: '',
  })

  function handleLogin(e) {
    e.preventDefault()
    const pw = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'warkahcinta123'
    if (password === pw) {
      setAuth(true)
      loadClients()
    } else {
      setWrongPw(true)
      setTimeout(() => setWrongPw(false), 2000)
    }
  }

  async function loadClients() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/clients')
      const data = await res.json()
      setClients(data.clients || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function loadRSVP(clientId) {
    try {
      const res = await fetch(`/api/admin/rsvp?client_id=${clientId}`)
      const data = await res.json()
      setRsvps(prev => ({ ...prev, [clientId]: data.rsvps || [] }))
    } catch (e) { console.error(e) }
  }

  async function addClient(e) {
    e.preventDefault()
    try {
      const slug = newClient.slug ||
        `${newClient.groom_name.toLowerCase().replace(/\s+/g,'-')}-${newClient.bride_name.toLowerCase().replace(/\s+/g,'-')}-${new Date(newClient.wedding_date).getFullYear()}`
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newClient, slug }),
      })
      if (res.ok) {
        setShowAddForm(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
        setNewClient({ groom_name:'', bride_name:'', wedding_date:'', time:'11:00 pagi — 3:00 petang', venue:'', venue_address:'', dress_code:'Warna pastel & krim', maps_link:'', theme_id:'moden', theme_color:'#2C2C2A', accent_color:'#C9A84C', slug:'' })
        loadClients()
      }
    } catch (e) { console.error(e) }
  }

  async function toggleActive(client) {
    try {
      await fetch('/api/admin/clients', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: client.id, active: !client.active }),
      })
      loadClients()
    } catch (e) { console.error(e) }
  }

  function selectClient(client) {
    setSelectedClient(client)
    setActiveTab('rsvp')
    if (!rsvps[client.id]) loadRSVP(client.id)
  }

  function waReminder(client) {
    const date = new Date(client.wedding_date).toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })
    const msg = encodeURIComponent(
      `Assalamualaikum! 🌹\n\nSekadar peringatan mesra — majlis perkahwinan *${client.groom_name} & ${client.bride_name}* akan berlangsung pada:\n\n📅 *${date}*\n📍 ${client.venue || '-'}\n\nKami menantikan kehadiran anda. Jumpa di majlis! 😊\n\n🔗 https://warkahcinta.com/${client.slug}`
    )
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  const inp = { width:'100%', padding:'10px 14px', fontSize:13, border:'1px solid #E8D9BF', borderRadius:8, background:'#FAF6EE', color:'#2C2C2A', fontFamily:'inherit', outline:'none', marginBottom:12 }
  const lbl = { display:'block', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(44,44,42,0.5)', marginBottom:4 }

  // LOGIN PAGE
  if (!auth) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#FDFBF7,#F5EEE0)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:20, padding:'48px 40px', width:'100%', maxWidth:380, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ color:'#C9A84C', fontSize:32, marginBottom:16 }}>✦</div>
        <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, fontWeight:400, color:'#2C2C2A', marginBottom:4 }}>WarkahCinta</h1>
        <p style={{ fontSize:11, color:'rgba(44,44,42,0.4)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:32 }}>Admin Dashboard</p>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ ...inp, textAlign:'center', fontSize:15, marginBottom:16, border: wrongPw ? '1px solid #DC2626' : '1px solid #E8D9BF' }} />
          {wrongPw && <p style={{ fontSize:12, color:'#DC2626', marginBottom:12 }}>Password salah.</p>}
          <button type="submit" style={{ width:'100%', background:'#2C2C2A', color:'#FDFBF7', border:'none', borderRadius:8, padding:13, fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>Log Masuk</button>
        </form>
      </div>
    </div>
  )

  const clientRSVPs = selectedClient ? (rsvps[selectedClient.id] || []) : []
  const hadirCount  = clientRSVPs.filter(r => r.status==='hadir').length
  const tidakCount  = clientRSVPs.filter(r => r.status==='tidak').length
  const tungguCount = clientRSVPs.filter(r => r.status==='tunggu').length
  const totalPax    = clientRSVPs.filter(r => r.status==='hadir').reduce((s,r) => s+(r.bilangan||1), 0)

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#F5EFE3', minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}@media(max-width:600px){.sg{grid-template-columns:1fr 1fr!important}.rr{grid-template-columns:1fr 70px!important}.ag{grid-template-columns:1fr!important}}`}</style>

      <header style={{ background:'#2C2C2A', padding:'0 20px', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:56, gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, color:'#FDFBF7' }}>Warkah<span style={{ color:'#C9A84C' }}>Cinta</span></span>
            <span style={{ fontSize:9, background:'rgba(201,168,76,0.2)', color:'#C9A84C', padding:'2px 8px', borderRadius:99 }}>ADMIN</span>
          </div>
          <div style={{ display:'flex', gap:6, overflow:'hidden' }}>
            <button onClick={() => { setActiveTab('klien'); setSelectedClient(null) }} style={{ background: activeTab==='klien' ? 'rgba(255,255,255,0.1)' : 'transparent', color:'#FDFBF7', border:'none', padding:'6px 14px', borderRadius:6, fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>📋 Klien</button>
            {selectedClient && <button onClick={() => setActiveTab('rsvp')} style={{ background: activeTab==='rsvp' ? 'rgba(255,255,255,0.1)' : 'transparent', color:'#C9A84C', border:'none', padding:'6px 14px', borderRadius:6, fontSize:12, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:200 }}>RSVP: {selectedClient.groom_name} & {selectedClient.bride_name}</button>}
          </div>
          <button onClick={() => setAuth(false)} style={{ background:'transparent', color:'rgba(253,251,247,0.4)', border:'none', fontSize:11, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>Keluar</button>
        </div>
      </header>

      {saved && <div style={{ background:'#EAF3DE', color:'#27500A', textAlign:'center', padding:'10px', fontSize:13 }}>✓ Klien berjaya ditambah!</div>}

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'24px 16px' }}>

        {activeTab === 'klien' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A' }}>Senarai Klien</h2>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.5)', marginTop:2 }}>{clients.length} klien berdaftar</p>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)} style={{ background:'#C9A84C', color:'#1A1714', border:'none', borderRadius:8, padding:'10px 20px', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit', fontWeight:500 }}>+ Tambah Klien</button>
            </div>

            {showAddForm && (
              <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:16, padding:24, marginBottom:20 }}>
                <h3 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400, marginBottom:20, color:'#2C2C2A' }}>Klien Baru</h3>
                <form onSubmit={addClient}>
                  <div className="ag" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                    {[['Nama Pengantin Lelaki','groom_name','Ahmad',true],['Nama Pengantin Perempuan','bride_name','Siti',true],['Nama Dewan','venue','Dewan Seri Angkasa',false],['Alamat Dewan','venue_address','Shah Alam, Selangor',false],['Kod Pakaian','dress_code','Warna pastel & krim',false],['Link Google Maps','maps_link','https://maps.google.com/...',false]].map(([label,key,ph,req]) => (
                      <div key={key}><label style={lbl}>{label}</label><input style={inp} value={newClient[key]} onChange={e => setNewClient(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} required={req} /></div>
                    ))}
                    <div><label style={lbl}>Tarikh Majlis</label><input type="date" style={inp} value={newClient.wedding_date} onChange={e => setNewClient(p => ({ ...p, wedding_date: e.target.value }))} required /></div>
                    <div><label style={lbl}>Masa</label><input style={inp} value={newClient.time} onChange={e => setNewClient(p => ({ ...p, time: e.target.value }))} placeholder="11:00 pagi — 3:00 petang" /></div>
                    <div><label style={lbl}>Tema</label><select style={inp} value={newClient.theme_id} onChange={e => setNewClient(p => ({ ...p, theme_id: e.target.value }))}>{THEME_OPTIONS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></div>
                    <div><label style={lbl}>URL Slug (auto kalau kosong)</label><input style={inp} value={newClient.slug} onChange={e => setNewClient(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g,'-') }))} placeholder="ahmad-siti-2026" /></div>
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" style={{ background:'#2C2C2A', color:'#FDFBF7', border:'none', borderRadius:8, padding:'11px 24px', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>Simpan Klien</button>
                    <button type="button" onClick={() => setShowAddForm(false)} style={{ background:'transparent', color:'rgba(44,44,42,0.5)', border:'1px solid #E8D9BF', borderRadius:8, padding:'11px 24px', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Batal</button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div style={{ textAlign:'center', padding:40, color:'rgba(44,44,42,0.4)' }}>Memuatkan...</div>
            ) : clients.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 20px', background:'#FDFBF7', borderRadius:16, border:'1px solid #E8D9BF' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
                <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, color:'#2C2C2A', marginBottom:6 }}>Belum ada klien</p>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.4)' }}>Klik "Tambah Klien" untuk mulakan</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {clients.map(client => {
                  const daysLeft = Math.ceil((new Date(client.wedding_date) - new Date()) / 86400000)
                  const isPast = daysLeft < 0
                  const rsvpList = rsvps[client.id] || []
                  const hadir = rsvpList.filter(r => r.status==='hadir').length
                  return (
                    <div key={client.id} style={{ background:'#FDFBF7', border:`1px solid ${client.active ? '#E8D9BF' : '#F0C8C8'}`, borderRadius:16, padding:20, opacity: client.active ? 1 : 0.7 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                            <h3 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400, color:'#2C2C2A' }}>{client.groom_name} & {client.bride_name}</h3>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background: isPast ? '#F0F0F0' : '#EAF3DE', color: isPast ? '#888' : '#27500A', whiteSpace:'nowrap' }}>{isPast ? `${Math.abs(daysLeft)}h lepas` : `${daysLeft}h lagi`}</span>
                            {!client.active && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FCEBEB', color:'#A32D2D' }}>Tidak Aktif</span>}
                          </div>
                          <div style={{ fontSize:13, color:'rgba(44,44,42,0.55)', display:'flex', gap:12, flexWrap:'wrap' }}>
                            <span>📅 {new Date(client.wedding_date).toLocaleDateString('ms-MY', { day:'numeric', month:'long', year:'numeric' })}</span>
                            {client.venue && <span>📍 {client.venue}</span>}
                            <span>🎨 {client.theme_id||'moden'}</span>
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                          <a href={`/${client.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, padding:'7px 14px', borderRadius:6, border:'1px solid #C9A84C', color:'#C9A84C', textDecoration:'none', whiteSpace:'nowrap' }}>Lihat Kad →</a>
                          <button onClick={() => selectClient(client)} style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'#2C2C2A', color:'#FDFBF7', border:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>📊 RSVP {hadir > 0 ? `(${hadir})` : ''}</button>
                          <button onClick={() => toggleActive(client)} style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'transparent', color:'rgba(44,44,42,0.4)', border:'1px solid #E8D9BF', cursor:'pointer', fontFamily:'inherit' }}>{client.active ? 'Nyahaktif' : 'Aktifkan'}</button>
                        </div>
                      </div>
                      <div style={{ marginTop:12, padding:'8px 12px', background:'#FAF6EE', borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)', fontFamily:'monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>warkahcinta.com/{client.slug}</span>
                        <button onClick={() => { navigator.clipboard.writeText(`https://warkahcinta.com/${client.slug}`); alert('Link disalin! ✓') }} style={{ fontSize:11, padding:'4px 10px', borderRadius:4, background:'transparent', border:'1px solid #E8D9BF', cursor:'pointer', color:'rgba(44,44,42,0.5)', fontFamily:'inherit', whiteSpace:'nowrap' }}>Copy Link</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'rsvp' && selectedClient && (
          <div>
            <button onClick={() => { setActiveTab('klien'); setSelectedClient(null) }} style={{ background:'transparent', border:'none', color:'rgba(44,44,42,0.5)', fontSize:13, cursor:'pointer', fontFamily:'inherit', marginBottom:16 }}>← Balik ke senarai klien</button>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A' }}>{selectedClient.groom_name} & {selectedClient.bride_name}</h2>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.5)', marginTop:2 }}>{new Date(selectedClient.wedding_date).toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => waReminder(selectedClient)} style={{ background:'#25D366', color:'#fff', border:'none', borderRadius:8, padding:'10px 16px', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>💬 Reminder WA</button>
                <button onClick={() => loadRSVP(selectedClient.id)} style={{ background:'transparent', border:'1px solid #E8D9BF', borderRadius:8, padding:'10px 16px', fontSize:12, cursor:'pointer', fontFamily:'inherit', color:'rgba(44,44,42,0.6)' }}>🔄 Refresh</button>
              </div>
            </div>

            <div className="sg" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
              {[['Hadir',hadirCount,'#EAF3DE','#27500A'],['Tidak Hadir',tidakCount,'#FCEBEB','#A32D2D'],['Belum Pasti',tungguCount,'#FAEEDA','#633806'],['Jumlah Pax',totalPax,'#E6F1FB','#0C447C']].map(([label,val,bg,color]) => (
                <div key={label} style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, padding:16, textAlign:'center' }}>
                  <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:36, fontWeight:400, color:'#2C2C2A', lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:11, color:'rgba(44,44,42,0.5)', marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>

            {clientRSVPs.length === 0 ? (
              <div style={{ textAlign:'center', padding:40, background:'#FDFBF7', borderRadius:16, border:'1px solid #E8D9BF' }}>
                <p style={{ fontSize:14, color:'rgba(44,44,42,0.4)' }}>Belum ada RSVP untuk klien ini</p>
              </div>
            ) : (
              <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:16, overflow:'hidden' }}>
                <div className="rr" style={{ display:'grid', gridTemplateColumns:'1fr 130px 60px 80px', padding:'12px 16px', background:'#FAF6EE', borderBottom:'1px solid #E8D9BF', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(44,44,42,0.4)' }}>
                  <span>Nama & Telefon</span><span>Tarikh</span><span style={{ textAlign:'center' }}>Pax</span><span style={{ textAlign:'center' }}>Status</span>
                </div>
                {clientRSVPs.map((r,i) => (
                  <div key={r.id} className="rr" style={{ display:'grid', gridTemplateColumns:'1fr 130px 60px 80px', padding:'14px 16px', borderBottom: i < clientRSVPs.length-1 ? '1px solid #F5EFE3' : 'none', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:500, color:'#2C2C2A', marginBottom:2 }}>{r.nama}</div>
                      <div style={{ fontSize:12, color:'rgba(44,44,42,0.4)' }}>{r.telefon}</div>
                      {r.ucapan && <div style={{ fontSize:11, color:'rgba(44,44,42,0.5)', marginTop:4, fontStyle:'italic' }}>"{r.ucapan}"</div>}
                    </div>
                    <div style={{ fontSize:12, color:'rgba(44,44,42,0.5)' }}>{new Date(r.created_at).toLocaleDateString('ms-MY', { day:'numeric', month:'short' })}</div>
                    <div style={{ textAlign:'center', fontSize:14, fontWeight:500 }}>{r.bilangan}</div>
                    <div style={{ textAlign:'center' }}>
                      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:99, background: r.status==='hadir'?'#EAF3DE':r.status==='tidak'?'#FCEBEB':'#FAEEDA', color: r.status==='hadir'?'#27500A':r.status==='tidak'?'#A32D2D':'#633806' }}>
                        {r.status==='hadir'?'Hadir':r.status==='tidak'?'Tidak':'Tunggu'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop:16, background:'#EAF3DE', border:'1px solid #C8D8C0', borderRadius:12, padding:'14px 16px', fontSize:13, color:'#27500A' }}>
              💡 Klik <strong>"Reminder WA"</strong> untuk buka WhatsApp dengan mesej reminder yang dah disediakan. Percuma tanpa API!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}