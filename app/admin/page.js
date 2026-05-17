'use client'

import { useState } from 'react'

const THEME_OPTIONS = ['moden', 'floral', 'klasik', 'sage', 'royal', 'dusty', 'islamik', 'songket', 'noir', 'hutan', 'pantai', 'lavender', 'arabesque', 'batik', 'emerald', 'rustic']
const PAKEJ_PRICE = { starter: 79, classic: 149, premium: 249 }
const PAKEJ_NAME  = { starter: 'Starter', classic: 'Classic', premium: 'Premium' }
const ORDER_STATUS = ['pending', 'contacted', 'paid', 'in_progress', 'done', 'cancelled']
const ORDER_STATUS_LABEL = { pending:'Baru', contacted:'Dihubungi', paid:'Bayar ✓', in_progress:'Sedang Buat', done:'Siap ✓', cancelled:'Batal' }
const ORDER_STATUS_COLOR = { pending:['#FAEEDA','#633806'], contacted:['#E6F1FB','#0C447C'], paid:['#EAF3DE','#27500A'], in_progress:['#F0E6FB','#4A1080'], done:['#EAF3DE','#27500A'], cancelled:['#FCEBEB','#A32D2D'] }

export default function AdminDashboard() {
  const [auth, setAuth]               = useState(false)
  const [password, setPassword]       = useState('')
  const [wrongPw, setWrongPw]         = useState(false)
  const [clients, setClients]         = useState([])
  const [orders, setOrders]           = useState([])
  const [rsvps, setRsvps]             = useState({})
  const [loading, setLoading]         = useState(false)
  const [activeTab, setActiveTab]     = useState('orders')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedOrder, setSelectedOrder]   = useState(null)
  const [saved, setSaved]             = useState(false)
  const [orderFilter, setOrderFilter] = useState('all')
  const [newClient, setNewClient] = useState({
    groom_name:'', bride_name:'', wedding_date:'',
    time:'11:00 pagi — 3:00 petang', venue:'', venue_address:'',
    dress_code:'Warna pastel & krim', maps_link:'',
    theme_id:'moden', theme_color:'#2C2C2A', accent_color:'#C9A84C', slug:'',
  })

  function handleLogin(e) {
    e.preventDefault()
    const pw = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'warkahcinta123'
    if (password === pw) {
      setAuth(true)
      loadOrders()
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

  async function loadOrders() {
    try {
      const res = await fetch('/api/order')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (e) { console.error(e) }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status }),
      })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      if (selectedOrder?.id === orderId) setSelectedOrder(prev => ({ ...prev, status }))
    } catch (e) { console.error(e) }
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
      await fetch('/api/admin/clients', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id:client.id, active:!client.active }) })
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
    const msg  = encodeURIComponent(`Assalamualaikum! 🌹\n\nSekadar peringatan mesra — majlis perkahwinan *${client.groom_name} & ${client.bride_name}* akan berlangsung pada:\n\n📅 *${date}*\n📍 ${client.venue||'-'}\n\nKami menantikan kehadiran anda. 😊\n\n🔗 https://warkahcinta.com/${client.slug}`)
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  function waOrder(order) {
    const price = PAKEJ_PRICE[order.pakej_id] || 149
    const pakej = PAKEJ_NAME[order.pakej_id] || 'Classic'
    const msg = encodeURIComponent(`Assalamualaikum ${order.contact_name}! 👋\n\nTerima kasih kerana order dengan WarkahCinta.\n\n*Nombor Rujukan: ${order.ref}*\nPakej: ${pakej} — RM${price}\n\nSila buat bayaran via DuitNow ke nombor:\n📱 *60175364098*\n\nNama: WarkahCinta\n\nSelepas bayaran, sila screenshot dan hantar ke sini. Terima kasih! 🌸`)
    window.open(`https://wa.me/60${order.contact_phone?.replace(/^0/,'')}?text=${msg}`, '_blank')
  }

  const inp  = { width:'100%', padding:'10px 14px', fontSize:13, border:'1px solid #E8D9BF', borderRadius:8, background:'#FAF6EE', color:'#2C2C2A', fontFamily:'inherit', outline:'none', marginBottom:12 }
  const lbl  = { display:'block', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(44,44,42,0.5)', marginBottom:4 }

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)
  const orderStats = ORDER_STATUS.reduce((acc, s) => { acc[s] = orders.filter(o => o.status === s).length; return acc }, {})

  // ── LOGIN ──────────────────────────────────────────────
  if (!auth) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#FDFBF7,#F5EEE0)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:20, padding:'48px 40px', width:'100%', maxWidth:380, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ color:'#C9A84C', fontSize:32, marginBottom:16 }}>✦</div>
        <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:28, fontWeight:400, color:'#2C2C2A', marginBottom:4 }}>WarkahCinta</h1>
        <p style={{ fontSize:11, color:'rgba(44,44,42,0.4)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:32 }}>Admin Dashboard</p>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ ...inp, textAlign:'center', fontSize:15, marginBottom:16, border:wrongPw?'1px solid #DC2626':'1px solid #E8D9BF' }} />
          {wrongPw && <p style={{ fontSize:12, color:'#DC2626', marginBottom:12 }}>Password salah.</p>}
          <button type="submit" style={{ width:'100%', background:'#2C2C2A', color:'#FDFBF7', border:'none', borderRadius:8, padding:13, fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>Log Masuk</button>
        </form>
      </div>
    </div>
  )

  const clientRSVPs = selectedClient ? (rsvps[selectedClient.id]||[]) : []
  const hadirCount  = clientRSVPs.filter(r => r.status==='hadir').length
  const tidakCount  = clientRSVPs.filter(r => r.status==='tidak').length
  const tungguCount = clientRSVPs.filter(r => r.status==='tunggu').length
  const totalPax    = clientRSVPs.filter(r => r.status==='hadir').reduce((s,r) => s+(r.bilangan||1), 0)

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#F5EFE3', minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}@media(max-width:600px){.sg{grid-template-columns:1fr 1fr!important}.rr{grid-template-columns:1fr 70px!important}.ag{grid-template-columns:1fr!important}}`}</style>

      {/* Header */}
      <header style={{ background:'#2C2C2A', padding:'0 20px', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:56, gap:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, color:'#FDFBF7' }}>Warkah<span style={{ color:'#C9A84C' }}>Cinta</span></span>
            <span style={{ fontSize:9, background:'rgba(201,168,76,0.2)', color:'#C9A84C', padding:'2px 8px', borderRadius:99 }}>ADMIN</span>
          </div>
          <div style={{ display:'flex', gap:4, overflow:'hidden' }}>
            {[
              { id:'orders', label:`📦 Orders ${orders.length > 0 ? `(${orderStats.pending||0} baru)` : ''}` },
              { id:'klien',  label:'📋 Klien' },
              { id:'rsvp',   label: selectedClient ? `RSVP: ${selectedClient.groom_name}` : null },
            ].filter(t => t.label).map(t => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); if (t.id !== 'rsvp') setSelectedClient(null) }}
                style={{ background:activeTab===t.id?'rgba(255,255,255,0.1)':'transparent', color:t.id==='rsvp'?'#C9A84C':'#FDFBF7', border:'none', padding:'6px 12px', borderRadius:6, fontSize:12, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => setAuth(false)} style={{ background:'transparent', color:'rgba(253,251,247,0.4)', border:'none', fontSize:11, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>Keluar</button>
        </div>
      </header>

      {saved && <div style={{ background:'#EAF3DE', color:'#27500A', textAlign:'center', padding:'10px', fontSize:13 }}>✓ Klien berjaya ditambah!</div>}

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 16px' }}>

        {/* ── TAB ORDERS ────────────────────────────────── */}
        {activeTab === 'orders' && !selectedOrder && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A' }}>Pengurusan Order</h2>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.5)', marginTop:2 }}>{orders.length} order diterima</p>
              </div>
              <button onClick={loadOrders} style={{ background:'transparent', border:'1px solid #E8D9BF', borderRadius:8, padding:'8px 16px', fontSize:12, cursor:'pointer', fontFamily:'inherit', color:'rgba(44,44,42,0.6)' }}>🔄 Refresh</button>
            </div>

            {/* Stats */}
            <div className="sg" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:8, marginBottom:20 }}>
              {ORDER_STATUS.map(s => (
                <div key={s} onClick={() => setOrderFilter(orderFilter===s?'all':s)}
                  style={{ background:orderFilter===s?ORDER_STATUS_COLOR[s][0]:'#FDFBF7', border:`1px solid ${orderFilter===s?ORDER_STATUS_COLOR[s][0]:'#E8D9BF'}`, borderRadius:10, padding:'12px 8px', textAlign:'center', cursor:'pointer', transition:'all 0.15s' }}>
                  <div style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A', lineHeight:1 }}>{orderStats[s]||0}</div>
                  <div style={{ fontSize:10, color:'rgba(44,44,42,0.5)', marginTop:3 }}>{ORDER_STATUS_LABEL[s]}</div>
                </div>
              ))}
            </div>

            {/* Order list */}
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 20px', background:'#FDFBF7', borderRadius:16, border:'1px solid #E8D9BF' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📦</div>
                <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, color:'#2C2C2A', marginBottom:6 }}>
                  {orderFilter === 'all' ? 'Belum ada order' : `Tiada order "${ORDER_STATUS_LABEL[orderFilter]}"`}
                </p>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.4)' }}>Order dari borang akan muncul di sini</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {filteredOrders.map(order => {
                  const [bg, color] = ORDER_STATUS_COLOR[order.status] || ['#FAF6EE','#2C2C2A']
                  const price = PAKEJ_PRICE[order.pakej_id] || 149
                  const timeAgo = order.created_at ? Math.floor((Date.now() - new Date(order.created_at)) / 3600000) : 0

                  return (
                    <div key={order.id} style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:14, padding:18 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:6 }}>
                            <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontWeight:400, color:'#2C2C2A' }}>{order.groom_name} & {order.bride_name}</span>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:bg, color, fontWeight:500 }}>{ORDER_STATUS_LABEL[order.status]}</span>
                            {order.status === 'pending' && timeAgo < 2 && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FCEBEB', color:'#A32D2D' }}>🔴 Baru!</span>}
                          </div>
                          <div style={{ fontSize:12, color:'rgba(44,44,42,0.55)', display:'flex', gap:12, flexWrap:'wrap' }}>
                            <span>📋 {order.ref}</span>
                            <span>🎨 {order.theme_id}</span>
                            <span>📦 {PAKEJ_NAME[order.pakej_id]} — RM{price}</span>
                            <span>📅 {order.wedding_date ? new Date(order.wedding_date).toLocaleDateString('ms-MY',{day:'numeric',month:'short',year:'numeric'}) : '-'}</span>
                          </div>
                          <div style={{ fontSize:12, color:'rgba(44,44,42,0.55)', marginTop:4, display:'flex', gap:12 }}>
                            <span>👤 {order.contact_name}</span>
                            <span>📱 {order.contact_phone}</span>
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap', flexShrink:0 }}>
                          <button onClick={() => setSelectedOrder(order)}
                            style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'#2C2C2A', color:'#FDFBF7', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                            Lihat Details
                          </button>
                          <button onClick={() => waOrder(order)}
                            style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'#25D366', color:'#fff', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                            💬 WA
                          </button>
                        </div>
                      </div>

                      {/* Status update */}
                      <div style={{ marginTop:12, display:'flex', gap:6, flexWrap:'wrap' }}>
                        {ORDER_STATUS.map(s => (
                          <button key={s} onClick={() => updateOrderStatus(order.id, s)}
                            style={{ fontSize:10, padding:'4px 10px', borderRadius:99, border:`1px solid ${order.status===s?ORDER_STATUS_COLOR[s][0]:'#E8D9BF'}`, background:order.status===s?ORDER_STATUS_COLOR[s][0]:'transparent', color:order.status===s?ORDER_STATUS_COLOR[s][1]:'rgba(44,44,42,0.5)', cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                            {ORDER_STATUS_LABEL[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── ORDER DETAIL ──────────────────────────────── */}
        {activeTab === 'orders' && selectedOrder && (
          <div>
            <button onClick={() => setSelectedOrder(null)} style={{ background:'transparent', border:'none', color:'rgba(44,44,42,0.5)', fontSize:13, cursor:'pointer', fontFamily:'inherit', marginBottom:16 }}>← Balik ke senarai order</button>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:20 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A' }}>{selectedOrder.groom_name} & {selectedOrder.bride_name}</h2>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.5)', marginTop:2 }}>Ref: {selectedOrder.ref} · {PAKEJ_NAME[selectedOrder.pakej_id]} — RM{PAKEJ_PRICE[selectedOrder.pakej_id]}</p>
              </div>
              <button onClick={() => waOrder(selectedOrder)}
                style={{ background:'#25D366', color:'#fff', border:'none', borderRadius:8, padding:'10px 18px', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                💬 Hubungi via WhatsApp
              </button>
            </div>

            {/* Status update bar */}
            <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, padding:'16px', marginBottom:16, display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
              <span style={{ fontSize:12, color:'rgba(44,44,42,0.5)', marginRight:4 }}>Status:</span>
              {ORDER_STATUS.map(s => {
                const [bg, color] = ORDER_STATUS_COLOR[s]
                return (
                  <button key={s} onClick={() => updateOrderStatus(selectedOrder.id, s)}
                    style={{ fontSize:12, padding:'6px 14px', borderRadius:99, border:`1px solid ${selectedOrder.status===s?bg:'#E8D9BF'}`, background:selectedOrder.status===s?bg:'transparent', color:selectedOrder.status===s?color:'rgba(44,44,42,0.5)', cursor:'pointer', fontFamily:'inherit', fontWeight:selectedOrder.status===s?500:400 }}>
                    {ORDER_STATUS_LABEL[s]}
                  </button>
                )
              })}
            </div>

            {/* Details grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {[
                { title:'Butiran Majlis', items:[['Tarikh',selectedOrder.wedding_date?new Date(selectedOrder.wedding_date).toLocaleDateString('ms-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'-'],['Masa',selectedOrder.time],['Dewan',selectedOrder.venue],['Alamat',selectedOrder.venue_address],['Kod Pakaian',selectedOrder.dress_code],['Maps',selectedOrder.maps_link||'-']] },
                { title:'Maklumat Penghubung', items:[['Nama',selectedOrder.contact_name],['WhatsApp',selectedOrder.contact_phone],['Emel',selectedOrder.contact_email||'-'],['Tema',selectedOrder.theme_id],['Pakej',`${PAKEJ_NAME[selectedOrder.pakej_id]} — RM${PAKEJ_PRICE[selectedOrder.pakej_id]}`]] },
              ].map(({ title, items }) => (
                <div key={title} style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, padding:'16px 18px' }}>
                  <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:16, fontWeight:400, color:'#2C2C2A', marginBottom:12, paddingBottom:8, borderBottom:'1px solid #E8D9BF' }}>{title}</p>
                  {items.map(([label, value]) => (
                    <div key={label} style={{ display:'flex', gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:11, color:'rgba(44,44,42,0.45)', width:90, flexShrink:0 }}>{label}</span>
                      <span style={{ fontSize:13, color:'#2C2C2A', wordBreak:'break-word' }}>{value||'-'}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Kisah cinta */}
              {(selectedOrder.love_story_1 || selectedOrder.love_story_2 || selectedOrder.love_story_3) && (
                <div style={{ gridColumn:'1/-1', background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, padding:'16px 18px' }}>
                  <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:16, fontWeight:400, color:'#2C2C2A', marginBottom:12, paddingBottom:8, borderBottom:'1px solid #E8D9BF' }}>Kisah Cinta</p>
                  {[selectedOrder.love_story_1, selectedOrder.love_story_2, selectedOrder.love_story_3].filter(Boolean).map((story, i) => (
                    <div key={i} style={{ display:'flex', gap:10, marginBottom:10 }}>
                      <span style={{ fontSize:11, color:'#C9A84C', width:60, flexShrink:0 }}>Kisah {i+1}</span>
                      <span style={{ fontSize:13, color:'#2C2C2A', lineHeight:1.6 }}>{story}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Special request */}
              {selectedOrder.special_request && (
                <div style={{ gridColumn:'1/-1', background:'#FAEEDA', border:'1px solid #F0C870', borderRadius:12, padding:'16px 18px' }}>
                  <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:16, fontWeight:400, color:'#633806', marginBottom:8 }}>⭐ Permintaan Khas</p>
                  <p style={{ fontSize:13, color:'#633806', lineHeight:1.6 }}>{selectedOrder.special_request}</p>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div style={{ marginTop:16, background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:12, padding:'16px 18px' }}>
              <p style={{ fontSize:12, fontWeight:500, color:'#2C2C2A', marginBottom:12 }}>Tindakan Pantas</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <button onClick={() => waOrder(selectedOrder)}
                  style={{ fontSize:12, padding:'8px 16px', borderRadius:8, background:'#25D366', color:'#fff', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                  💬 Hantar WA + QR Bayaran
                </button>
                <button onClick={() => { setActiveTab('klien'); setShowAddForm(true); setSelectedOrder(null) }}
                  style={{ fontSize:12, padding:'8px 16px', borderRadius:8, background:'#C9A84C', color:'#1A1714', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                  ➕ Buat Kad dari Order Ini
                </button>
                <button onClick={() => navigator.clipboard.writeText(selectedOrder.contact_phone).then(() => alert('Nombor disalin!'))}
                  style={{ fontSize:12, padding:'8px 16px', borderRadius:8, background:'transparent', color:'rgba(44,44,42,0.6)', border:'1px solid #E8D9BF', cursor:'pointer', fontFamily:'inherit' }}>
                  📋 Copy Nombor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB KLIEN ─────────────────────────────────── */}
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
                      <div key={key}><label style={lbl}>{label}</label><input style={inp} value={newClient[key]} onChange={e => setNewClient(p=>({...p,[key]:e.target.value}))} placeholder={ph} required={req} /></div>
                    ))}
                    <div><label style={lbl}>Tarikh Majlis</label><input type="date" style={inp} value={newClient.wedding_date} onChange={e => setNewClient(p=>({...p,wedding_date:e.target.value}))} required /></div>
                    <div><label style={lbl}>Masa</label><input style={inp} value={newClient.time} onChange={e => setNewClient(p=>({...p,time:e.target.value}))} placeholder="11:00 pagi — 3:00 petang" /></div>
                    <div><label style={lbl}>Tema</label><select style={inp} value={newClient.theme_id} onChange={e => setNewClient(p=>({...p,theme_id:e.target.value}))}>{THEME_OPTIONS.map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></div>
                    <div><label style={lbl}>URL Slug</label><input style={inp} value={newClient.slug} onChange={e => setNewClient(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')}))} placeholder="ahmad-siti-2026 (auto kalau kosong)" /></div>
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
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.4)' }}>Tambah klien atau terima order dulu</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {clients.map(client => {
                  const daysLeft = Math.ceil((new Date(client.wedding_date)-new Date())/86400000)
                  const isPast   = daysLeft < 0
                  const rsvpList = rsvps[client.id]||[]
                  const hadir    = rsvpList.filter(r=>r.status==='hadir').length
                  return (
                    <div key={client.id} style={{ background:'#FDFBF7', border:`1px solid ${client.active?'#E8D9BF':'#F0C8C8'}`, borderRadius:16, padding:20, opacity:client.active?1:0.7 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                            <h3 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:20, fontWeight:400, color:'#2C2C2A' }}>{client.groom_name} & {client.bride_name}</h3>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:isPast?'#F0F0F0':'#EAF3DE', color:isPast?'#888':'#27500A' }}>{isPast?`${Math.abs(daysLeft)}h lepas`:`${daysLeft}h lagi`}</span>
                            {!client.active && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:'#FCEBEB', color:'#A32D2D' }}>Tidak Aktif</span>}
                          </div>
                          <div style={{ fontSize:13, color:'rgba(44,44,42,0.55)', display:'flex', gap:12, flexWrap:'wrap' }}>
                            <span>📅 {new Date(client.wedding_date).toLocaleDateString('ms-MY',{day:'numeric',month:'long',year:'numeric'})}</span>
                            {client.venue && <span>📍 {client.venue}</span>}
                            <span>🎨 {client.theme_id||'moden'}</span>
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                          <a href={`/${client.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, padding:'7px 14px', borderRadius:6, border:'1px solid #C9A84C', color:'#C9A84C', textDecoration:'none' }}>Lihat Kad →</a>
                          <button onClick={() => {
                            const msg = encodeURIComponent(`Assalamualaikum ${client.groom_name} & ${client.bride_name}! 🌸\n\nBerikut adalah link dashboard RSVP anda:\n\nhttps://warkahcinta.com/dashboard/${client.slug}\n\nBoleh pantau senarai tetamu dan ucapan di sini. 😊`)
                            window.open(`https://wa.me/?text=${msg}`, '_blank')
                            }} style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'#C9A84C', color:'#1A1714', border:'none', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                            📊 Hantar Dashboard
                            </button>
                            
                          <button onClick={() => selectClient(client)} style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'#2C2C2A', color:'#FDFBF7', border:'none', cursor:'pointer', fontFamily:'inherit' }}>📊 RSVP {hadir>0?`(${hadir})`:''}</button>
                          <button onClick={() => toggleActive(client)} style={{ fontSize:11, padding:'7px 14px', borderRadius:6, background:'transparent', color:'rgba(44,44,42,0.4)', border:'1px solid #E8D9BF', cursor:'pointer', fontFamily:'inherit' }}>{client.active?'Nyahaktif':'Aktifkan'}</button>
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

        {/* ── TAB RSVP ──────────────────────────────────── */}
        {activeTab === 'rsvp' && selectedClient && (
          <div>
            <button onClick={() => { setActiveTab('klien'); setSelectedClient(null) }} style={{ background:'transparent', border:'none', color:'rgba(44,44,42,0.5)', fontSize:13, cursor:'pointer', fontFamily:'inherit', marginBottom:16 }}>← Balik ke senarai klien</button>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:26, fontWeight:400, color:'#2C2C2A' }}>{selectedClient.groom_name} & {selectedClient.bride_name}</h2>
                <p style={{ fontSize:13, color:'rgba(44,44,42,0.5)', marginTop:2 }}>{new Date(selectedClient.wedding_date).toLocaleDateString('ms-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
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
                  <div key={r.id} className="rr" style={{ display:'grid', gridTemplateColumns:'1fr 130px 60px 80px', padding:'14px 16px', borderBottom:i<clientRSVPs.length-1?'1px solid #F5EFE3':'none', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:500, color:'#2C2C2A', marginBottom:2 }}>{r.nama}</div>
                      <div style={{ fontSize:12, color:'rgba(44,44,42,0.4)' }}>{r.telefon}</div>
                      {r.ucapan && <div style={{ fontSize:11, color:'rgba(44,44,42,0.5)', marginTop:4, fontStyle:'italic' }}>"{r.ucapan}"</div>}
                    </div>
                    <div style={{ fontSize:12, color:'rgba(44,44,42,0.5)' }}>{new Date(r.created_at).toLocaleDateString('ms-MY',{day:'numeric',month:'short'})}</div>
                    <div style={{ textAlign:'center', fontSize:14, fontWeight:500 }}>{r.bilangan}</div>
                    <div style={{ textAlign:'center' }}>
                      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:99, background:r.status==='hadir'?'#EAF3DE':r.status==='tidak'?'#FCEBEB':'#FAEEDA', color:r.status==='hadir'?'#27500A':r.status==='tidak'?'#A32D2D':'#633806' }}>
                        {r.status==='hadir'?'Hadir':r.status==='tidak'?'Tidak':'Tunggu'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop:16, background:'#EAF3DE', border:'1px solid #C8D8C0', borderRadius:12, padding:'14px 16px', fontSize:13, color:'#27500A' }}>
              💡 Klik <strong>"Reminder WA"</strong> untuk buka WhatsApp dengan mesej reminder. Percuma tanpa API!
            </div>
          </div>
        )}

      </div>
    </div>
  )
}