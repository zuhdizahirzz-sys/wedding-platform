'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import WeddingPage from '@/components/WeddingPage'

// Theme configs
const THEME_CONFIGS = {
  moden: {
    id: 'demo-moden',
    slug: 'demo-moden',
    groom_name: 'Izzat',
    bride_name: 'Hana',
    wedding_date: '2026-04-12',
    time: '11:00 pagi — 3:00 petang',
    venue: 'Dewan Seri Angkasa',
    venue_address: 'No. 12, Jalan Bahagia, Shah Alam, Selangor',
    dress_code: 'Putih, Krim & Warna Pastel',
    maps_link: 'https://maps.google.com',
    theme_color: '#2C2C2A',
    accent_color: '#C9A84C',
    love_story: [
      { year: '2020', title: 'Mula Berkenalan', text: 'Takdir mempertemukan kami dalam satu program yang tidak disangka-sangka. Satu pertemuan yang mengubah segalanya.' },
      { year: '2023', title: 'Detik Melamar', text: 'Izzat melamar Hana dengan penuh keikhlasan di tepi pantai ketika matahari terbenam.' },
      { year: '2026', title: 'Menyempurnakan Separuh Agama', text: 'Alhamdulillah, dengan izin Allah, dua hati akhirnya bersatu dalam ikatan yang suci.' },
    ],
  },
  floral: {
    id: 'demo-floral',
    slug: 'demo-floral',
    groom_name: 'Haziq',
    bride_name: 'Aisyah',
    wedding_date: '2026-07-05',
    time: '12:00 tengahari — 4:00 petang',
    venue: 'Taman Warisan Pertanian',
    venue_address: 'Presint 2, Putrajaya, Malaysia',
    dress_code: 'Dusty Pink, Sage & Warna Floral',
    maps_link: 'https://maps.google.com',
    theme_color: '#8B4058',
    accent_color: '#D4956A',
    love_story: [
      { year: '2019', title: 'Pertembungan Pertama', text: 'Haziq dan Aisyah bertemu pertama kali semasa program sukarela di kampung.' },
      { year: '2022', title: 'Lamaran Di Taman', text: 'Di tengah-tengah taman bunga yang mekar, Haziq melamar Aisyah dengan penuh romantik.' },
      { year: '2026', title: 'Bersatu Selamanya', text: 'Dengan restu keluarga dan doa sahabat, mereka menyempurnakan separuh agama.' },
    ],
  },
  klasik: {
    id: 'demo-klasik',
    slug: 'demo-klasik',
    groom_name: 'Ridhwan',
    bride_name: 'Sofea',
    wedding_date: '2026-09-20',
    time: '8:00 malam — 11:00 malam',
    venue: 'Grand Ballroom Mandarin Oriental',
    venue_address: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur',
    dress_code: 'Formal — Hitam, Emas & Navy',
    maps_link: 'https://maps.google.com',
    theme_color: '#D4A853',
    accent_color: '#D4A853',
    love_story: [
      { year: '2018', title: 'Dipertemukan', text: 'Ridhwan dan Sofea diperkenalkan oleh sahabat bersama semasa majlis graduasi.' },
      { year: '2024', title: 'Melamar Di Paris', text: 'Ridhwan melamar Sofea di menara Eiffel — satu detik yang penuh keajaiban.' },
      { year: '2026', title: 'Majlis Impian', text: 'Majlis mewah yang dinantikan akhirnya tiba. Dua jiwa bersatu dalam kemuliaan.' },
    ],
  },
  sage: {
    id: 'demo-sage',
    slug: 'demo-sage',
    groom_name: 'Aiman',
    bride_name: 'Damia',
    wedding_date: '2026-03-21',
    time: '10:00 pagi — 2:00 petang',
    venue: 'The Ranch @ 1 Utama',
    venue_address: 'Bandar Utama, Petaling Jaya, Selangor',
    dress_code: 'Sage Green, Putih & Warna Alam',
    maps_link: 'https://maps.google.com',
    theme_color: '#3D5A3E',
    accent_color: '#8FAF6E',
    love_story: [
      { year: '2020', title: 'Kenal Di Universiti', text: 'Aiman dan Damia bertemu semasa program orientasi di universiti.' },
      { year: '2023', title: 'Lamaran Sederhana', text: 'Di tengah-tengah taman hijau, Aiman melamar Damia dengan ikhlas.' },
      { year: '2026', title: 'Majlis Alam', text: 'Majlis bertema alam yang segar — simbolik kehidupan baru yang bermula.' },
    ],
  },
  royal: {
    id: 'demo-royal',
    slug: 'demo-royal',
    groom_name: 'Farhan',
    bride_name: 'Irdina',
    wedding_date: '2026-11-14',
    time: '7:30 malam — 11:00 malam',
    venue: 'Istana Budaya Grand Hall',
    venue_address: 'Jalan Tun Razak, 50694 Kuala Lumpur',
    dress_code: 'Royal Blue, Silver & Emas',
    maps_link: 'https://maps.google.com',
    theme_color: '#C8A96E',
    accent_color: '#C8A96E',
    love_story: [
      { year: '2019', title: 'Pertemuan Diraja', text: 'Farhan dan Irdina bertemu dalam majlis rasmi yang penuh keanggunan.' },
      { year: '2024', title: 'Ikrar Setia', text: 'Farhan melamar Irdina dengan cincin warisan keluarga yang bernilai.' },
      { year: '2026', title: 'Majlis Agung', text: 'Sebuah majlis yang dikenang — anggun, berwibawa, dan penuh kemuliaan.' },
    ],
  },
  dusty: {
    id: 'demo-dusty',
    slug: 'demo-dusty',
    groom_name: 'Syafiq',
    bride_name: 'Nuraini',
    wedding_date: '2026-06-06',
    time: '11:00 pagi — 3:00 petang',
    venue: 'Dewan Seroja, Putrajaya',
    venue_address: 'Presint 14, 62000 Putrajaya',
    dress_code: 'Dusty Rose, Mauve & Krim',
    maps_link: 'https://maps.google.com',
    theme_color: '#9E5E6F',
    accent_color: '#C4909F',
    love_story: [
      { year: '2021', title: 'Bertemu Dalam Diam', text: 'Syafiq dan Nuraini berkenalan melalui kawan bersama — perlahan tapi pasti.' },
      { year: '2024', title: 'Melamar Dengan Bunga', text: 'Syafiq melamar Nuraini di rumah keluarga, dikelilingi bunga dusty rose kegemarannya.' },
      { year: '2026', title: 'Bersama Selamanya', text: 'Dengan penuh syukur dan bahagia, dua jiwa ini disatukan oleh cinta dan doa.' },
    ],
  },
}

const DEFAULT_THEME = THEME_CONFIGS.moden

function DemoContent() {
  const searchParams = useSearchParams()
  const themeId = searchParams.get('theme') || 'moden'
  const coupleParam = searchParams.get('couple')
  const dateParam = searchParams.get('date')

  const baseConfig = THEME_CONFIGS[themeId] || DEFAULT_THEME

  // Override dengan data dari theme selector kalau ada
  const clientData = {
    ...baseConfig,
    theme_id: themeId,
    ...(coupleParam && {
      groom_name: coupleParam.split('&')[0]?.trim() || baseConfig.groom_name,
      bride_name: coupleParam.split('&')[1]?.trim() || baseConfig.bride_name,
    }),
    ...(dateParam && { wedding_date: dateParam }),
  }

  return (
    <div>
      {/* Demo banner */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: '#2C2C2A', color: '#FDFBF7',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 12, gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ background: '#C9A84C', color: '#1A1714', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 500 }}>DEMO</span>
          <span style={{ opacity: 0.7 }}>Tema: <strong style={{ opacity: 1 }}>{baseConfig.groom_name !== 'Izzat' ? themeId : 'Moden Minimalis'}</strong></span>
        </div>
        <a
          href={`/themes`}
          style={{ color: '#C9A84C', textDecoration: 'none', fontSize: 11, letterSpacing: '0.08em', border: '1px solid rgba(201,168,76,0.4)', padding: '4px 12px', borderRadius: 4, whiteSpace: 'nowrap' }}
        >
          ← Tukar Tema
        </a>
      </div>

      {/* Offset for banner */}
      <div style={{ paddingTop: 40 }}>
        <WeddingPage client={clientData} />
      </div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFBF7' }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: 'rgba(44,44,42,0.4)' }}>Memuatkan demo...</p>
      </div>
    }>
      <DemoContent />
    </Suspense>
  )
}