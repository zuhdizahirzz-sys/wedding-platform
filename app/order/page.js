'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const THEMES = [
  { id:'moden',     name:'Moden Minimalis',    gold:'#C9A84C', bg:'#F5F0E8', text:'#2C2C2A' },
  { id:'floral',    name:'Floral Romantik',    gold:'#D4956A', bg:'#FDF0EC', text:'#5C2D3A' },
  { id:'klasik',    name:'Klasik Emas',         gold:'#D4A853', bg:'#1A1714', text:'#F5EFE0' },
  { id:'sage',      name:'Sage Garden',         gold:'#8FAF6E', bg:'#EEF2EC', text:'#2C3E2D' },
  { id:'royal',     name:'Royal Blue',          gold:'#C8A96E', bg:'#0F1B35', text:'#E8EEF8' },
  { id:'dusty',     name:'Dusty Rose',          gold:'#C4909F', bg:'#FDF4F5', text:'#6B3A47' },
  { id:'islamik',   name:'Islamik Kaligrafi',   gold:'#B8960C', bg:'#F8F3E8', text:'#1E3214' },
  { id:'songket',   name:'Songket Warisan',     gold:'#E8BC50', bg:'#1C0A00', text:'#F5E8C8' },
  { id:'noir',      name:'Noir Elegan',         gold:'#E8E8E8', bg:'#0D0D0D', text:'#F0F0F0' },
  { id:'hutan',     name:'Hutan Tropis',        gold:'#A8D080', bg:'#0F1F0F', text:'#D8F0D0' },
  { id:'pantai',    name:'Pantai Biru',         gold:'#7CC4E0', bg:'#0A1628', text:'#D8EEF8' },
  { id:'lavender',  name:'Lavender Dreams',     gold:'#9B7FD0', bg:'#F5F0FF', text:'#3D2A60' },
  { id:'arabesque', name:'Arabesque Moden',     gold:'#C89B6E', bg:'#F9F4ED', text:'#3D2010' },
  { id:'batik',     name:'Batik Modern',        gold:'#E08040', bg:'#FFF8F0', text:'#4A1808' },
  { id:'emerald',   name:'Emerald Luxury',      gold:'#58D68D', bg:'#0A1F14', text:'#D5F5E3' },
  { id:'rustic',    name:'Rustic Countryside',  gold:'#B07840', bg:'#F5ECD8', text:'#3A2010' },
]

const PAKEJ = [
  {
    id: 'starter', name: 'Starter', price: 79,
    features: ['Kad jemputan digital','Countdown tarikh majlis','Butiran majlis lengkap','Butang WhatsApp & Maps','Muzik latar','Kisah cinta pengantin','Link aktif 12 bulan'],
  },
  {
    id: 'classic', name: 'Classic', price: 149, popular: true,
    features: ['Semua dalam Starter','RSVP online','Dashboard tetamu','Reminder WhatsApp (manual)','Gallery gambar (10 foto)','Kod pakaian tetamu','Link aktif selamanya'],
  },
  {
    id: 'premium', name: 'Premium', price: 249,
    features: ['Semua dalam Classic','Salam kaut digital','Custom domain .my','2 tema pilihan','Ucapan video embed','Gallery tanpa had','Priority support'],
  },
]

const STEPS = ['Tema & Pakej', 'Butiran Majlis', 'Pengantin & Kisah', 'Semak & Hantar']

function OrderForm() {
  const searchParams = useSearchParams()
  const preselectedTheme = searchParams.get('theme') || ''

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    // Step 1
    theme_id: preselectedTheme,
    pakej_id: 'classic',
    // Step 2
    groom_name: '', bride_name: '',
    wedding_date: '', time: '11:00 pagi — 3:00 petang',
    venue: '', venue_address: '', dress_code: 'Warna pastel & krim',
    maps_link: '',
    // Step 3
    contact_name: '', contact_phone: '', contact_email: '',
    love_story_1: '', love_story_2: '', love_story_3: '',
    special_request: '',
  })

  function set(key, val) {
    setForm(p => ({ ...p, [key]: val }))
    setErrors(p => ({ ...p, [key]: '' }))
  }

  function validate(stepNum) {
    const e = {}
    if (stepNum === 0) {
      if (!form.theme_id) e.theme_id = 'Sila pilih tema'
      if (!form.pakej_id) e.pakej_id = 'Sila pilih pakej'
    }
    if (stepNum === 1) {
      if (!form.wedding_date) e.wedding_date = 'Sila masukkan tarikh majlis'
      if (!form.venue) e.venue = 'Sila masukkan nama dewan'
      if (!form.venue_address) e.venue_address = 'Sila masukkan alamat'
    }
    if (stepNum === 2) {
      if (!form.groom_name) e.groom_name = 'Sila masukkan nama pengantin lelaki'
      if (!form.bride_name) e.bride_name = 'Sila masukkan nama pengantin perempuan'
      if (!form.contact_phone) e.contact_phone = 'Sila masukkan nombor telefon'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (validate(step)) setStep(s => s + 1)
    window.scrollTo(0, 0)
  }

  function back() {
    setStep(s => s - 1)
    window.scrollTo(0, 0)
  }

  async function submit() {
    if (!validate(2)) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = `/order/success?ref=${data.ref}&pakej=${form.pakej_id}&price=${selectedPakej.price}`
      }
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
  }

  const selectedTheme = THEMES.find(t => t.id === form.theme_id)
  const selectedPakej = PAKEJ.find(p => p.id === form.pakej_id)

  const inp = (key) => ({
    width: '100%', padding: '11px 14px', fontSize: 14,
    border: `1px solid ${errors[key] ? '#DC2626' : '#E8D9BF'}`,
    borderRadius: 8, background: 'rgba(255,255,255,0.7)',
    color: '#2C2C2A', fontFamily: 'inherit', outline: 'none', marginBottom: 4,
  })
  const lbl = { display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(44,44,42,0.5)', marginBottom: 6 }
  const err = (key) => errors[key] ? <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 10 }}>{errors[key]}</p> : <div style={{ marginBottom: 14 }} />

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: '#FDFBF7', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input,select,textarea{font-family:inherit;outline:none;}input:focus,select:focus,textarea:focus{border-color:#C9A84C!important;}`}</style>

      {/* Navbar */}
      <nav style={{ background: 'rgba(253,251,247,0.97)', borderBottom: '1px solid #E8D9BF', backdropFilter: 'blur(12px)', padding: '0 5%', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link href="/" style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 20, fontWeight: 400, textDecoration: 'none', color: '#2C2C2A' }}>
            Warkah<span style={{ color: '#C9A84C' }}>Cinta</span>
          </Link>
          <span style={{ fontSize: 12, color: 'rgba(44,44,42,0.5)' }}>Borang Order</span>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 16px 80px' }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, background: '#FAF6EE', borderRadius: 12, overflow: 'hidden', border: '1px solid #E8D9BF' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', background: step === i ? '#2C2C2A' : step > i ? '#EAF3DE' : 'transparent', transition: 'background 0.2s' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.05em', color: step === i ? '#FDFBF7' : step > i ? '#27500A' : 'rgba(44,44,42,0.4)', fontWeight: step === i ? 500 : 400 }}>
                {step > i ? '✓ ' : `${i+1}. `}{s}
              </div>
            </div>
          ))}
        </div>

        {/* ── STEP 1: Tema & Pakej ── */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 28, fontWeight: 400, color: '#2C2C2A', marginBottom: 6 }}>Pilih Tema & Pakej</h2>
            <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.55)', marginBottom: 28, lineHeight: 1.6 }}>Pilih tema yang mencerminkan gaya majlis anda.</p>

            {errors.theme_id && <p style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>{errors.theme_id}</p>}

            {/* Theme grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 10, marginBottom: 28 }}>
              {THEMES.map(theme => (
                <div key={theme.id} onClick={() => set('theme_id', theme.id)}
                  style={{ background: theme.bg, border: form.theme_id === theme.id ? `2px solid ${theme.gold}` : '2px solid transparent', borderRadius: 12, padding: '16px 10px', cursor: 'pointer', textAlign: 'center', position: 'relative', transition: 'all 0.2s', boxShadow: form.theme_id === theme.id ? `0 8px 24px ${theme.gold}30` : '0 1px 6px rgba(0,0,0,0.06)' }}>
                  {form.theme_id === theme.id && (
                    <div style={{ position: 'absolute', top: 6, right: 6, background: theme.gold, color: theme.bg, fontSize: 9, padding: '1px 6px', borderRadius: 99, fontWeight: 500 }}>✓</div>
                  )}
                  <p style={{ fontSize: 9, letterSpacing: '0.15em', color: theme.gold, textTransform: 'uppercase', marginBottom: 6 }}>Tema</p>
                  <p style={{ fontFamily: 'Georgia,serif', fontSize: 13, color: theme.text, fontWeight: 400, lineHeight: 1.3 }}>{theme.name}</p>
                </div>
              ))}
            </div>

            {selectedTheme && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#EAF3DE', border: '1px solid #C8D8C0', borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
                <span style={{ fontSize: 18 }}>✓</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#27500A' }}>Tema dipilih: {selectedTheme.name}</p>
                  <a href={`/demo?theme=${selectedTheme.id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#27500A', opacity: 0.7 }}>Preview demo →</a>
                </div>
              </div>
            )}

            {/* Pakej selection */}
            <h3 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 20, fontWeight: 400, color: '#2C2C2A', marginBottom: 16 }}>Pilih Pakej</h3>
            {errors.pakej_id && <p style={{ fontSize: 13, color: '#DC2626', marginBottom: 12 }}>{errors.pakej_id}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {PAKEJ.map(p => (
                <div key={p.id} onClick={() => set('pakej_id', p.id)}
                  style={{ background: form.pakej_id === p.id ? '#2C2C2A' : '#FAF6EE', border: form.pakej_id === p.id ? '2px solid #C9A84C' : '1px solid #E8D9BF', borderRadius: 12, padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${form.pakej_id === p.id ? '#C9A84C' : '#E8D9BF'}`, background: form.pakej_id === p.id ? '#C9A84C' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {form.pakej_id === p.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1A1714' }} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: form.pakej_id === p.id ? '#FDFBF7' : '#2C2C2A' }}>{p.name}</span>
                        {p.popular && <span style={{ fontSize: 9, background: '#C9A84C', color: '#1A1714', padding: '2px 8px', borderRadius: 99, fontWeight: 500 }}>POPULAR</span>}
                      </div>
                      <p style={{ fontSize: 12, color: form.pakej_id === p.id ? 'rgba(253,251,247,0.55)' : 'rgba(44,44,42,0.5)', marginTop: 2 }}>{p.features.slice(0, 3).join(' · ')}</p>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 24, fontWeight: 400, color: form.pakej_id === p.id ? '#C9A84C' : '#2C2C2A', flexShrink: 0 }}>RM{p.price}</div>
                </div>
              ))}
            </div>

            <button onClick={next} style={{ width: '100%', background: '#2C2C2A', color: '#FDFBF7', border: 'none', borderRadius: 10, padding: 15, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
              Seterusnya →
            </button>
          </div>
        )}

        {/* ── STEP 2: Butiran Majlis ── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 28, fontWeight: 400, color: '#2C2C2A', marginBottom: 6 }}>Butiran Majlis</h2>
            <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.55)', marginBottom: 28 }}>Maklumat yang akan terpapar dalam kad kahwin digital anda.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Tarikh Majlis *</label>
                <input type="date" value={form.wedding_date} onChange={e => set('wedding_date', e.target.value)} style={inp('wedding_date')} />
                {err('wedding_date')}
              </div>
              <div>
                <label style={lbl}>Masa Majlis</label>
                <input value={form.time} onChange={e => set('time', e.target.value)} placeholder="11:00 pagi — 3:00 petang" style={inp('time')} />
                <div style={{ marginBottom: 14 }} />
              </div>
              <div>
                <label style={lbl}>Kod Pakaian</label>
                <input value={form.dress_code} onChange={e => set('dress_code', e.target.value)} placeholder="Warna pastel & krim" style={inp('dress_code')} />
                <div style={{ marginBottom: 14 }} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Nama Dewan / Tempat *</label>
                <input value={form.venue} onChange={e => set('venue', e.target.value)} placeholder="Dewan Seri Angkasa" style={inp('venue')} />
                {err('venue')}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Alamat Penuh *</label>
                <input value={form.venue_address} onChange={e => set('venue_address', e.target.value)} placeholder="No. 12, Jalan Bahagia, Shah Alam, Selangor" style={inp('venue_address')} />
                {err('venue_address')}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Link Google Maps (optional)</label>
                <input value={form.maps_link} onChange={e => set('maps_link', e.target.value)} placeholder="https://maps.google.com/..." style={inp('maps_link')} />
                <div style={{ marginBottom: 14 }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={back} style={{ flex: 1, background: 'transparent', color: '#2C2C2A', border: '1px solid #E8D9BF', borderRadius: 10, padding: 15, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>← Balik</button>
              <button onClick={next} style={{ flex: 2, background: '#2C2C2A', color: '#FDFBF7', border: 'none', borderRadius: 10, padding: 15, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Seterusnya →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Pengantin & Kisah ── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 28, fontWeight: 400, color: '#2C2C2A', marginBottom: 6 }}>Pengantin & Kisah Cinta</h2>
            <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.55)', marginBottom: 28 }}>Maklumat pengantin dan cara kami menghubungi anda.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div>
                <label style={lbl}>Nama Pengantin Lelaki *</label>
                <input value={form.groom_name} onChange={e => set('groom_name', e.target.value)} placeholder="Ahmad" style={inp('groom_name')} />
                {err('groom_name')}
              </div>
              <div>
                <label style={lbl}>Nama Pengantin Perempuan *</label>
                <input value={form.bride_name} onChange={e => set('bride_name', e.target.value)} placeholder="Siti" style={inp('bride_name')} />
                {err('bride_name')}
              </div>
              <div>
                <label style={lbl}>Nama Penghubung *</label>
                <input value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="Nama anda" style={inp('contact_name')} />
                <div style={{ marginBottom: 14 }} />
              </div>
              <div>
                <label style={lbl}>Nombor WhatsApp *</label>
                <input type="tel" value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} placeholder="01X-XXXXXXX" style={inp('contact_phone')} />
                {err('contact_phone')}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Emel (optional)</label>
                <input type="email" value={form.contact_email} onChange={e => set('contact_email', e.target.value)} placeholder="email@example.com" style={inp('contact_email')} />
                <div style={{ marginBottom: 14 }} />
              </div>
            </div>

            <div style={{ background: '#FAF6EE', border: '1px solid #E8D9BF', borderRadius: 12, padding: '20px', marginBottom: 20 }}>
              <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 18, fontWeight: 400, color: '#2C2C2A', marginBottom: 4 }}>Kisah Cinta (optional)</p>
              <p style={{ fontSize: 12, color: 'rgba(44,44,42,0.5)', marginBottom: 16 }}>Ceritakan 3 detik istimewa perjalanan cinta anda. Kalau kosong, kami akan gunakan kisah default.</p>
              {[
                ['love_story_1', 'Pertemuan pertama (contoh: "Kami bertemu semasa...")', '2020'],
                ['love_story_2', 'Detik melamar (contoh: "Ahmad melamar di...")', '2023'],
                ['love_story_3', 'Menuju hari bahagia', '2026'],
              ].map(([key, ph, year]) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{ ...lbl, marginBottom: 6 }}>Tahun {year}</label>
                  <textarea value={form[key]} onChange={e => set(key, e.target.value)} placeholder={ph} rows={2}
                    style={{ ...inp(key), resize: 'none', marginBottom: 0 }} />
                </div>
              ))}
            </div>

            <div>
              <label style={lbl}>Permintaan khas / Nota tambahan (optional)</label>
              <textarea value={form.special_request} onChange={e => set('special_request', e.target.value)} placeholder="Contoh: Nak tambah lagu tertentu, atau ada gambar couple yang nak dimasukkan..." rows={3}
                style={{ ...inp('special_request'), resize: 'none', marginBottom: 14 }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={back} style={{ flex: 1, background: 'transparent', color: '#2C2C2A', border: '1px solid #E8D9BF', borderRadius: 10, padding: 15, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>← Balik</button>
              <button onClick={next} style={{ flex: 2, background: '#2C2C2A', color: '#FDFBF7', border: 'none', borderRadius: 10, padding: 15, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Semak Order →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Semak & Hantar ── */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 28, fontWeight: 400, color: '#2C2C2A', marginBottom: 6 }}>Semak & Hantar Order</h2>
            <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.55)', marginBottom: 28 }}>Pastikan semua maklumat betul sebelum hantar.</p>

            {/* Summary cards */}
            {[
              {
                title: 'Tema & Pakej',
                items: [
                  ['Tema', selectedTheme?.name || '-'],
                  ['Pakej', `${selectedPakej?.name} — RM${selectedPakej?.price}`],
                ]
              },
              {
                title: 'Butiran Majlis',
                items: [
                  ['Tarikh', form.wedding_date ? new Date(form.wedding_date).toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) : '-'],
                  ['Masa', form.time],
                  ['Dewan', form.venue],
                  ['Alamat', form.venue_address],
                  ['Kod Pakaian', form.dress_code],
                ]
              },
              {
                title: 'Maklumat Pengantin',
                items: [
                  ['Pengantin Lelaki', form.groom_name],
                  ['Pengantin Perempuan', form.bride_name],
                  ['Penghubung', form.contact_name],
                  ['WhatsApp', form.contact_phone],
                  ['Emel', form.contact_email || '-'],
                ]
              },
            ].map(({ title, items }) => (
              <div key={title} style={{ background: '#FAF6EE', border: '1px solid #E8D9BF', borderRadius: 12, padding: '18px 20px', marginBottom: 12 }}>
                <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 16, fontWeight: 400, color: '#2C2C2A', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E8D9BF' }}>{title}</p>
                {items.map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: 'rgba(44,44,42,0.45)', width: 120, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: 13, color: '#2C2C2A' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Payment info */}
            <div style={{ background: '#2C2C2A', borderRadius: 12, padding: '20px', marginBottom: 24, color: '#FDFBF7' }}>
              <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 20, fontWeight: 400, marginBottom: 12 }}>Cara Bayar</p>
              <p style={{ fontSize: 13, color: 'rgba(253,251,247,0.65)', lineHeight: 1.8, marginBottom: 12 }}>
                Selepas hantar borang ini, kami akan menghubungi anda dalam masa <strong style={{ color: '#C9A84C' }}>1 jam</strong> via WhatsApp untuk:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Sahkan butiran order anda','Hantar QR DuitNow untuk pembayaran','Mula setup kad selepas bayaran diterima','Hantar link kad dalam masa 24 jam'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontSize: 14, marginTop: 1 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'rgba(253,251,247,0.75)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '12px', background: 'rgba(201,168,76,0.15)', borderRadius: 8, textAlign: 'center' }}>
                <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 28, color: '#C9A84C', lineHeight: 1 }}>RM{selectedPakej?.price}</p>
                <p style={{ fontSize: 11, color: 'rgba(253,251,247,0.4)', marginTop: 4 }}>Pakej {selectedPakej?.name} · Sekali bayar</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={back} style={{ flex: 1, background: 'transparent', color: '#2C2C2A', border: '1px solid #E8D9BF', borderRadius: 10, padding: 15, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>← Balik</button>
              <button onClick={submit} disabled={submitting}
                style={{ flex: 2, background: submitting ? 'rgba(44,44,42,0.4)' : '#C9A84C', color: '#1A1714', border: 'none', borderRadius: 10, padding: 15, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
                {submitting ? 'Menghantar...' : '💬 Hantar Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: 'rgba(44,44,42,0.4)' }}>Memuatkan...</p></div>}>
      <OrderForm />
    </Suspense>
  )
}