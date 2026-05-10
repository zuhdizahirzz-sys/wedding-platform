'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Themes data ───────────────────────────────────────────
const THEMES = [
  {
    id: 'moden',
    name: 'Moden Minimalis',
    tag: 'Terlaris',
    demo: '/demo?theme=moden',
    bg: '#F5F0E8',
    accent: '#2C2C2A',
    gold: '#C9A84C',
    preview: {
      couple: 'Izzat & Hana',
      date: '12 April 2026',
      desc: 'Bersih, elegan, timeless',
    },
  },
  {
    id: 'floral',
    name: 'Floral Romantik',
    tag: 'Baru',
    demo: '/demo?theme=floral',
    bg: '#FDF6F0',
    accent: '#8B4058',
    gold: '#D4956A',
    preview: {
      couple: 'Haziq & Aisyah',
      date: '5 Julai 2026',
      desc: 'Bunga, hangat, romantik',
    },
  },
  {
    id: 'klasik',
    name: 'Klasik Emas',
    tag: 'Premium',
    demo: '/demo?theme=klasik',
    bg: '#1A1714',
    accent: '#D4A853',
    gold: '#D4A853',
    preview: {
      couple: 'Ridhwan & Sofea',
      date: '20 September 2026',
      desc: 'Mewah, gelap, berkilauan',
    },
  },
]

const PAKEJ = [
  {
    name: 'Starter',
    price: 79,
    color: '#2C2C2A',
    features: [
      'Kad jemputan digital',
      'Countdown tarikh majlis',
      'Butiran majlis lengkap',
      'Butang WhatsApp & Maps',
      'Muzik latar',
      'Kisah cinta pengantin',
      'Link aktif 12 bulan',
    ],
    cta: 'Pilih Starter',
  },
  {
    name: 'Classic',
    price: 149,
    color: '#C9A84C',
    popular: true,
    features: [
      'Semua dalam Starter',
      'RSVP online',
      'Dashboard tetamu',
      'Reminder WhatsApp auto',
      'Gallery gambar (10 foto)',
      'Kod pakaian tetamu',
      'Link aktif selamanya',
    ],
    cta: 'Pilih Classic',
  },
  {
    name: 'Premium',
    price: 249,
    color: '#7B5EA7',
    features: [
      'Semua dalam Classic',
      'Salam kaut digital',
      'Custom domain .my',
      '2 tema pilihan',
      'Ucapan video embed',
      'Gallery tanpa had',
      'Priority support',
    ],
    cta: 'Pilih Premium',
  },
]

const FAQS = [
  { q: 'Berapa lama untuk siap?', a: 'Dalam masa 24 jam selepas anda hantar semua maklumat. Biasanya siap dalam 2–4 jam.' },
  { q: 'Boleh tukar maklumat selepas siap?', a: 'Boleh! Sehingga 3 kali perubahan percuma. Selepas itu RM10 setiap perubahan.' },
  { q: 'Macam mana nak share kepada tetamu?', a: 'Anda akan dapat satu link unik. Boleh share terus via WhatsApp, Telegram, atau media sosial.' },
  { q: 'Adakah RSVP berfungsi automatik?', a: 'Ya! Tetamu isi form, data terus masuk ke dashboard anda. Reminder WhatsApp dihantar automatik 7 hari dan 1 hari sebelum majlis.' },
  { q: 'Boleh guna untuk majlis bertunang?', a: 'Boleh! Kami boleh customkan untuk majlis bertunang, akikah, atau mana-mana majlis istimewa.' },
]

// ── Animated counter ──────────────────────────────────────
function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = Math.ceil(end / 60)
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(start)
        }, 20)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ── Theme preview card ────────────────────────────────────
function ThemeCard({ theme, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.bg,
        border: active ? `2px solid ${theme.gold}` : '2px solid transparent',
        borderRadius: '16px',
        padding: '28px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        transform: active ? 'translateY(-6px)' : 'none',
        boxShadow: active ? `0 20px 40px ${theme.gold}30` : '0 2px 12px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '200px',
      }}
    >
      {/* Decorative corners */}
      <div style={{ position: 'absolute', top: 12, left: 12, color: theme.gold, fontSize: 16, opacity: 0.5 }}>✦</div>
      <div style={{ position: 'absolute', top: 12, right: 12, color: theme.gold, fontSize: 16, opacity: 0.5 }}>✦</div>

      {theme.tag && (
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          background: theme.gold, color: theme.bg, fontSize: 10, padding: '2px 10px',
          borderRadius: 99, fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap',
        }}>{theme.tag}</div>
      )}

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', color: theme.gold, textTransform: 'uppercase', marginBottom: 8 }}>
          Walimatul Urus
        </p>
        <div style={{ width: 60, height: 1, background: `${theme.gold}60`, margin: '0 auto 10px' }} />
        <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 400, color: theme.accent, lineHeight: 1.3, marginBottom: 6 }}>
          {theme.preview.couple}
        </p>
        <div style={{ width: 40, height: 1, background: `${theme.gold}60`, margin: '0 auto 8px' }} />
        <p style={{ fontSize: 10, letterSpacing: '0.12em', color: `${theme.accent}80`, textTransform: 'uppercase', marginBottom: 16 }}>
          {theme.preview.date}
        </p>
        <p style={{ fontSize: 12, color: `${theme.accent}60` }}>{theme.preview.desc}</p>
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: 12, color: theme.gold, fontSize: 16, opacity: 0.5 }}>✦</div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, color: theme.gold, fontSize: 16, opacity: 0.5 }}>✦</div>
    </div>
  )
}

// ── Main landing page ─────────────────────────────────────
export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#FDFBF7', color: '#2C2C2A', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .fade-up { opacity: 0; transform: translateY(30px); animation: fadeUp 0.9s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.6s; }
        .fade-up-5 { animation-delay: 0.8s; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .btn-primary { background: #2C2C2A; color: #FDFBF7; border: none; padding: 14px 32px; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: background 0.2s; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: #1A1A18; }
        .btn-outline { background: transparent; color: #2C2C2A; border: 1px solid #2C2C2A; padding: 13px 32px; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .btn-outline:hover { background: #2C2C2A; color: #FDFBF7; }
        .btn-gold { background: #C9A84C; color: #1A1714; border: none; padding: 14px 32px; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: background 0.2s; text-decoration: none; display: inline-block; font-weight: 500; }
        .btn-gold:hover { background: #B8963E; }
        .ornament { display: flex; align-items: center; gap: 12px; color: #C9A84C; margin: 0 auto; width: fit-content; }
        .ornament::before, .ornament::after { content: ''; display: block; height: 1px; width: 60px; background: linear-gradient(to right, transparent, #C9A84C80); }
        .ornament::after { background: linear-gradient(to left, transparent, #C9A84C80); }
        .section-tag { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; margin-bottom: 12px; }
        .section-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(32px, 5vw, 52px); font-weight: 400; line-height: 1.15; color: #2C2C2A; }
        .divider { border: none; border-top: 1px solid #E8D9BF; margin: 0; }
        a { color: inherit; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(253,251,247,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E8D9BF' : 'none',
        transition: 'all 0.3s',
        padding: '0 5%',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 22, fontWeight: 400, letterSpacing: '0.05em' }}>
            Warkah<span style={{ color: '#C9A84C' }}>Cinta</span>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <a href="#tema" style={{ fontSize: 13, color: '#2C2C2A', textDecoration: 'none', opacity: 0.7, letterSpacing: '0.05em' }}>Tema</a>
            <a href="#pakej" style={{ fontSize: 13, color: '#2C2C2A', textDecoration: 'none', opacity: 0.7, letterSpacing: '0.05em' }}>Pakej</a>
            <a href="#faq" style={{ fontSize: 13, color: '#2C2C2A', textDecoration: 'none', opacity: 0.7, letterSpacing: '0.05em' }}>FAQ</a>
            <a href="#order" className="btn-primary" style={{ padding: '10px 24px', fontSize: 12 }}>Order Sekarang</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '100px 5% 60px',
        background: 'linear-gradient(160deg, #FDFBF7 0%, #F5EFE3 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative dots */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle at 1px 1px, #2C2C2A 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: '15%', right: '5%', color: '#C9A84C', fontSize: 80, opacity: 0.07, fontFamily: 'Georgia', lineHeight: 1 }}>✦</div>
        <div style={{ position: 'absolute', bottom: '20%', left: '3%', color: '#C9A84C', fontSize: 50, opacity: 0.07, fontFamily: 'Georgia' }}>❧</div>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>

          {/* Left: Text */}
          <div>
            <p className="section-tag fade-up fade-up-1">Kad Kahwin Digital Premium Malaysia</p>
            <h1 className="section-title fade-up fade-up-2" style={{ marginBottom: 20 }}>
              Jemput Tetamu<br />
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Dengan Gaya</span><br />
              Yang Abadi
            </h1>
            <p className="fade-up fade-up-3" style={{ fontSize: 15, color: 'rgba(44,44,42,0.65)', lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
              Kad kahwin digital dengan RSVP, countdown, dan reminder WhatsApp automatik. Sempurna untuk pasangan moden yang ingin majlis berjalan lancar.
            </p>
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <a href="#pakej" className="btn-gold">Mulai dari RM79</a>
              <a href={`/demo?theme=${THEMES[activeTheme].id}`} className="btn-outline">Lihat Demo →</a>
            </div>
            {/* Stats */}
            <div className="fade-up fade-up-5" style={{ display: 'flex', gap: 32 }}>
              {[
                { val: 500, suffix: '+', label: 'Kad disiapkan' },
                { val: 98, suffix: '%', label: 'Kepuasan klien' },
                { val: 24, suffix: 'j', label: 'Siap dalam' },
              ].map(({ val, suffix, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 32, fontWeight: 400, color: '#2C2C2A', lineHeight: 1 }}>
                    <Counter end={val} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(44,44,42,0.45)', letterSpacing: '0.08em', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Theme preview */}
          <div className="fade-up fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {THEMES.map((theme, i) => (
                <ThemeCard key={theme.id} theme={theme} active={activeTheme === i} onClick={() => setActiveTheme(i)} />
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(44,44,42,0.4)', letterSpacing: '0.1em' }}>
              KLIK UNTUK PREVIEW TEMA
            </div>
          </div>
        </div>
      </section>

      {/* ── CARA KERJA ─────────────────────────────────── */}
      <section style={{ padding: '80px 5%', background: '#2C2C2A' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-tag" style={{ color: '#C9A84C' }}>Mudah & Pantas</p>
          <h2 className="section-title" style={{ color: '#FDFBF7', marginBottom: 50 }}>
            Siap Dalam 4 Langkah
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { num: '01', icon: '🎨', title: 'Pilih Tema', desc: 'Pilih dari koleksi tema eksklusif kami yang direka khas' },
              { num: '02', icon: '💳', title: 'Pilih Pakej', desc: 'Pilih pakej yang sesuai dan bayar secara online dengan selamat' },
              { num: '03', icon: '📝', title: 'Hantar Maklumat', desc: 'Isi borang dengan butiran majlis, gambar, dan muzik pilihan' },
              { num: '04', icon: '🔗', title: 'Terima Link', desc: 'Kad digital anda siap dalam 24 jam. Share terus ke tetamu!' },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="hover-lift" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#C9A84C', letterSpacing: '0.2em', marginBottom: 12 }}>{num}</div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 18, color: '#FDFBF7', marginBottom: 8, fontWeight: 400 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(253,251,247,0.5)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FITUR ──────────────────────────────────────── */}
      <section style={{ padding: '80px 5%', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p className="section-tag">Kenapa Pilih Kami</p>
            <h2 className="section-title">Lebih Dari Sekadar<br /><span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Kad Digital Biasa</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: '📱', title: 'RSVP Online', desc: 'Tetamu sahkan kehadiran terus dari telefon. Data masuk ke dashboard anda secara real-time.' },
              { icon: '🔔', title: 'Reminder Auto', desc: 'WhatsApp reminder dihantar automatik 7 hari dan 1 hari sebelum majlis kepada semua tetamu.' },
              { icon: '📊', title: 'Dashboard Tetamu', desc: 'Pantau bilangan tetamu, status RSVP, dan ucapan mereka dari satu papan pemuka yang kemas.' },
              { icon: '⏱️', title: 'Countdown Live', desc: 'Kiraan detik yang menggembirakan — tetamu nampak berapa hari lagi menjelang majlis anda.' },
              { icon: '🎵', title: 'Muzik Latar', desc: 'Tetapkan suasana dengan muzik pilihan anda yang memainkan secara automatik.' },
              { icon: '💝', title: 'Salam Kaut Digital', desc: 'Tetamu boleh hantar hadiah wang digital dengan mudah dan selamat terus dari telefon.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="hover-lift" style={{ background: '#FAF6EE', border: '1px solid #E8D9BF', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 20, marginBottom: 8, fontWeight: 400 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(44,44,42,0.6)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMA ───────────────────────────────────────── */}
      <section id="tema" style={{ padding: '80px 5%', background: '#F5EFE3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p className="section-tag">Koleksi Eksklusif</p>
            <h2 className="section-title">Pilih Tema<br /><span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Yang Mencerminkan Anda</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {THEMES.map((theme, i) => (
              <div key={theme.id} className="hover-lift" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E8D9BF' }}>
                <div style={{ background: theme.bg, padding: '36px 24px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, color: theme.gold, fontSize: 14, opacity: 0.5 }}>✦</div>
                  <div style={{ position: 'absolute', top: 12, right: 12, color: theme.gold, fontSize: 14, opacity: 0.5 }}>✦</div>
                  <p style={{ fontSize: 9, letterSpacing: '0.25em', color: theme.gold, textTransform: 'uppercase', marginBottom: 8 }}>Walimatul Urus</p>
                  <div style={{ width: 50, height: 1, background: `${theme.gold}60`, margin: '0 auto 10px' }} />
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: theme.accent, fontWeight: 400, marginBottom: 6 }}>
                    {theme.preview.couple}
                  </p>
                  <p style={{ fontSize: 10, letterSpacing: '0.15em', color: `${theme.accent}70`, textTransform: 'uppercase' }}>
                    {theme.preview.date}
                  </p>
                  {theme.tag && (
                    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: theme.gold, color: theme.bg, fontSize: 9, padding: '2px 10px', borderRadius: 99, whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {theme.tag}
                    </div>
                  )}
                </div>
                <div style={{ background: '#FDFBF7', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A' }}>{theme.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(44,44,42,0.5)' }}>{theme.preview.desc}</div>
                  </div>
                  <a href={theme.demo} target="_blank" style={{ fontSize: 11, color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.08em', border: '1px solid #C9A84C', padding: '6px 14px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                    Cuba →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(44,44,42,0.4)', marginTop: 24 }}>
            Lebih banyak tema akan datang · Anda boleh request tema custom
          </p>
        </div>
      </section>

      {/* ── PAKEJ ──────────────────────────────────────── */}
      <section id="pakej" style={{ padding: '80px 5%', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p className="section-tag">Harga Telus</p>
            <h2 className="section-title">Pilih Pakej<br /><span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Yang Sesuai</span></h2>
            <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.55)', marginTop: 12 }}>Semua pakej termasuk design cantik & link unik anda</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PAKEJ.map(({ name, price, color, popular, features, cta }) => (
              <div key={name} style={{
                background: popular ? '#2C2C2A' : '#FAF6EE',
                border: popular ? '2px solid #C9A84C' : '1px solid #E8D9BF',
                borderRadius: 20, padding: '32px 24px',
                position: 'relative', transform: popular ? 'scale(1.04)' : 'none',
                boxShadow: popular ? '0 20px 50px rgba(44,44,42,0.2)' : 'none',
              }}>
                {popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C9A84C', color: '#1A1714', fontSize: 10, padding: '4px 14px', borderRadius: 99, fontWeight: 500, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                    PALING POPULAR
                  </div>
                )}
                <div style={{ fontSize: 13, letterSpacing: '0.1em', color: popular ? 'rgba(253,251,247,0.5)' : 'rgba(44,44,42,0.5)', marginBottom: 8, textTransform: 'uppercase' }}>{name}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 42, fontWeight: 400, color: popular ? '#C9A84C' : '#2C2C2A', lineHeight: 1, marginBottom: 4 }}>
                  RM{price}
                </div>
                <div style={{ fontSize: 12, color: popular ? 'rgba(253,251,247,0.4)' : 'rgba(44,44,42,0.4)', marginBottom: 24 }}>sekali bayar</div>
                <div style={{ borderTop: `1px solid ${popular ? 'rgba(255,255,255,0.1)' : '#E8D9BF'}`, paddingTop: 20, marginBottom: 24 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: popular ? 'rgba(253,251,247,0.75)' : 'rgba(44,44,42,0.7)', alignItems: 'flex-start' }}>
                      <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <a href="#order" style={{
                  display: 'block', textAlign: 'center',
                  background: popular ? '#C9A84C' : 'transparent',
                  color: popular ? '#1A1714' : '#2C2C2A',
                  border: popular ? 'none' : '1px solid #2C2C2A',
                  padding: '13px 20px', fontSize: 12, letterSpacing: '0.15em',
                  textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
                  transition: 'all 0.2s', borderRadius: 4,
                }}>
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ──────────────────────────────────── */}
      <section style={{ padding: '80px 5%', background: '#FAF6EE' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p className="section-tag">Kata Mereka</p>
            <h2 className="section-title">Pasangan Yang<br /><span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Sudah Gembira</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { name: 'Hafiz & Nadia', date: 'Mac 2025', text: 'Sangat mudah! Tetamu boleh RSVP sendiri dan saya boleh pantau dari phone je. Tak payah tanya satu-satu dah!', stars: 5 },
              { name: 'Aiman & Syira', date: 'Januari 2025', text: 'Design cantik dan professional. Ramai tetamu tanya mana dapat kad digital sebagus ni. Memang berbaloi!', stars: 5 },
              { name: 'Zul & Farah', date: 'April 2025', text: 'Reminder WhatsApp auto tu yang paling suka. Tetamu dapat reminder sendiri, kami tak perlu ingat nak hantar.', stars: 5 },
            ].map(({ name, date, text, stars }) => (
              <div key={name} className="hover-lift" style={{ background: '#FDFBF7', border: '1px solid #E8D9BF', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ color: '#C9A84C', fontSize: 16, marginBottom: 12, letterSpacing: 2 }}>{'★'.repeat(stars)}</div>
                <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.7)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{text}"</p>
                <div style={{ borderTop: '1px solid #E8D9BF', paddingTop: 12 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 16, color: '#2C2C2A' }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(44,44,42,0.4)' }}>{date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section id="faq" style={{ padding: '80px 5%', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p className="section-tag">Soalan Lazim</p>
            <h2 className="section-title">Ada Soalan?</h2>
          </div>
          {FAQS.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E8D9BF' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'inherit' }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{q}</span>
                <span style={{ color: '#C9A84C', fontSize: 20, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openFaq === i && (
                <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.65)', lineHeight: 1.8, paddingBottom: 16, marginTop: -4 }}>{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ORDER CTA ──────────────────────────────────── */}
      <section id="order" style={{ padding: '80px 5%', background: '#2C2C2A', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ color: '#C9A84C', fontSize: 40, marginBottom: 16 }}>✦</div>
          <p className="section-tag" style={{ color: '#C9A84C' }}>Mulakan Perjalanan Anda</p>
          <h2 className="section-title" style={{ color: '#FDFBF7', marginBottom: 16 }}>
            Siap Untuk Mula?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(253,251,247,0.55)', lineHeight: 1.8, marginBottom: 36 }}>
            Hubungi kami sekarang dan kad digital anda akan siap dalam masa 24 jam. Lebih 500 pasangan telah mempercayai kami.
          </p>
          <a
            href="https://wa.me/60175364098?text=Salam,%20saya%20ingin%20order%20kad%20kahwin%20digital"
            target="_blank"
            className="btn-gold"
            style={{ fontSize: 14, padding: '16px 40px' }}
          >
            💬 Order via WhatsApp
          </a>
          <p style={{ fontSize: 12, color: 'rgba(253,251,247,0.25)', marginTop: 20 }}>
            Balas dalam masa 1 jam · Isnin–Sabtu 9am–9pm
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{ background: '#1A1714', padding: '40px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 20, color: '#FDFBF7', marginBottom: 4 }}>
              Warkah<span style={{ color: '#C9A84C' }}>Cinta</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(253,251,247,0.3)' }}>Kad Kahwin Digital Premium Malaysia</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#tema" style={{ fontSize: 12, color: 'rgba(253,251,247,0.4)', textDecoration: 'none' }}>Tema</a>
            <a href="#pakej" style={{ fontSize: 12, color: 'rgba(253,251,247,0.4)', textDecoration: 'none' }}>Pakej</a>
            <a href="#faq" style={{ fontSize: 12, color: 'rgba(253,251,247,0.4)', textDecoration: 'none' }}>FAQ</a>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(253,251,247,0.2)' }}>© 2026 WarkahCinta. Hak cipta terpelihara.</div>
        </div>
      </footer>

    </div>
  )
}