'use client'

import { useState } from 'react'

export default function RSVPForm({ client, accentColor = '#C9A84C', primaryColor = '#2C2C2A' }) {
  const [form, setForm] = useState({ nama: '', telefon: '', bilangan: '1', status: 'hadir', ucapan: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.nama.trim()) return setError('Sila masukkan nama anda.')
    if (!form.telefon.trim()) return setError('Sila masukkan nombor WhatsApp.')
    if (form.telefon.replace(/\D/g, '').length < 9) return setError('Nombor telefon tidak sah.')

    setLoading(true)
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: form.nama.trim(),
          telefon: form.telefon.trim(),
          bilangan: form.bilangan,
          status: form.status,
          ucapan: form.ucapan.trim(),
          client_id: client?.id || 'demo-001',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      setDone(true)
    } catch (err) {
      setError('Maaf, terdapat ralat. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const inp = {
    width: '100%', padding: '12px 16px', fontSize: 14,
    border: '1px solid #EDE2CC', borderRadius: 8,
    background: 'rgba(255,255,255,0.8)', color: '#2C2C2A',
    fontFamily: 'inherit', outline: 'none',
  }

  const lbl = {
    display: 'block', fontSize: 10, letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'rgba(44,44,42,0.45)', marginBottom: 8,
  }

  if (done) {
    return (
      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,238,224,0.6))', border: '1px solid #EDE2CC', borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
        <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 28, fontWeight: 300, color: primaryColor, marginBottom: 10 }}>
          Terima Kasih, {form.nama.split(' ')[0]}!
        </p>
        <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.6)', lineHeight: 1.8, marginBottom: 8 }}>
          {form.status === 'hadir'
            ? 'RSVP anda telah diterima. Kami sangat menantikan kehadiran anda!'
            : form.status === 'tidak'
            ? 'Kami memahami anda tidak dapat hadir. Terima kasih kerana memaklumkan.'
            : 'Terima kasih. Sila maklumkan bila ada kepastian.'}
        </p>
        {form.status === 'hadir' && (
          <p style={{ fontSize: 12, color: accentColor, letterSpacing: '0.05em' }}>Jumpa di majlis nanti! ✨</p>
        )}
      </div>
    )
  }

  const statuses = [
    { val: 'hadir',  label: 'Hadir',       icon: '✓' },
    { val: 'tidak',  label: 'Tidak hadir',  icon: '✕' },
    { val: 'tunggu', label: 'Belum pasti',  icon: '?' },
  ]

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      <div>
        <label style={lbl}>Nama Penuh</label>
        <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama anda" style={inp} />
      </div>

      <div>
        <label style={lbl}>Nombor WhatsApp</label>
        <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} placeholder="01X-XXXXXXX" style={inp} />
        <p style={{ fontSize: 10, color: 'rgba(44,44,42,0.3)', marginTop: 5 }}>Pengesahan akan dihantar ke nombor ini</p>
      </div>

      <div>
        <label style={lbl}>Bilangan Tetamu</label>
        <select name="bilangan" value={form.bilangan} onChange={handleChange} style={{ ...inp, cursor: 'pointer' }}>
          {[1,2,3,4,5].map(n => <option key={n} value={String(n)}>{n} orang</option>)}
          <option value="6">6 orang atau lebih</option>
        </select>
      </div>

      <div>
        <label style={lbl}>Status Kehadiran</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {statuses.map(({ val, label, icon }) => {
            const sel = form.status === val
            return (
              <button
                key={val}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, status: val }))}
                style={{
                  padding: '14px 8px', fontSize: 12, borderRadius: 8,
                  border: sel ? `2px solid ${primaryColor}` : '1px solid #EDE2CC',
                  background: sel ? primaryColor : 'rgba(255,255,255,0.8)',
                  color: sel ? '#FDFBF7' : 'rgba(44,44,42,0.55)',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                }}
              >
                <span style={{ display: 'block', fontSize: 18, marginBottom: 4 }}>{icon}</span>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label style={lbl}>Ucapan <span style={{ textTransform: 'none', letterSpacing: 0, color: 'rgba(44,44,42,0.25)' }}>(pilihan)</span></label>
        <textarea name="ucapan" value={form.ucapan} onChange={handleChange}
          placeholder="Titipkan doa dan ucapan anda untuk pasangan pengantin..."
          rows={3} style={{ ...inp, resize: 'none' }}
        />
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px' }}>
          <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? 'rgba(44,44,42,0.4)' : primaryColor,
          color: '#FDFBF7', border: 'none', borderRadius: 8,
          padding: '15px', fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'Menghantar...' : 'Hantar RSVP'}
      </button>

    </form>
  )
}