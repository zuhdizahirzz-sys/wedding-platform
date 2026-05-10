// themes.config.js — Semua 16 tema (6 asal + 10 baru)
// Import fail ni dalam demo/page.js dan themes/page.js

export const ALL_THEMES = [
  // ── 6 TEMA ASAL ─────────────────────────────────────────
  {
    id: 'moden',
    name: 'Moden Minimalis',
    category: 'Moden',
    tag: 'Terlaris',
    bg: '#F5F0E8', surface: '#FDFBF7', accent: '#2C2C2A', gold: '#C9A84C',
    textColor: '#2C2C2A', subtext: 'rgba(44,44,42,0.5)', border: '#E8D9BF',
    heroBg: ['#FDFBF7','#F5EEE0','#EDE2CC'],
    desc: 'Bersih, elegan, dan timeless.',
    tags: ['Minimalis','Elegan','Timeless'],
    demo: { couple:'Izzat & Hana', date:'12 April 2026' },
  },
  {
    id: 'floral',
    name: 'Floral Romantik',
    category: 'Romantik',
    tag: 'Baru',
    bg: '#FDF0EC', surface: '#FFF8F5', accent: '#8B4058', gold: '#D4956A',
    textColor: '#5C2D3A', subtext: 'rgba(92,45,58,0.5)', border: '#F0C8B8',
    heroBg: ['#FDF6F2','#FAEBE4','#F0D0C2'],
    desc: 'Hangat, romantik, dan penuh kasih.',
    tags: ['Romantik','Hangat','Floral'],
    demo: { couple:'Haziq & Aisyah', date:'5 Julai 2026' },
  },
  {
    id: 'klasik',
    name: 'Klasik Emas',
    category: 'Mewah',
    tag: 'Premium',
    bg: '#1A1714', surface: '#221F1B', accent: '#D4A853', gold: '#D4A853',
    textColor: '#F5EFE0', subtext: 'rgba(245,239,224,0.5)', border: 'rgba(212,168,83,0.25)',
    heroBg: ['#1A1714','#221F1B','#2A2620'],
    desc: 'Mewah, gelap, dan berkilauan.',
    tags: ['Mewah','Glamour','Premium'],
    demo: { couple:'Ridhwan & Sofea', date:'20 September 2026' },
  },
  {
    id: 'sage',
    name: 'Sage Garden',
    category: 'Nature',
    tag: 'Popular',
    bg: '#EEF2EC', surface: '#F5F8F3', accent: '#3D5A3E', gold: '#8FAF6E',
    textColor: '#2C3E2D', subtext: 'rgba(44,62,45,0.5)', border: '#C8D8C0',
    heroBg: ['#F0F4EE','#E4ECDF','#D4E2CE'],
    desc: 'Segar, natural, dan tenang.',
    tags: ['Natural','Segar','Taman'],
    demo: { couple:'Aiman & Damia', date:'21 Mac 2026' },
  },
  {
    id: 'royal',
    name: 'Royal Blue',
    category: 'Mewah',
    tag: '',
    bg: '#0F1B35', surface: '#162040', accent: '#C8A96E', gold: '#C8A96E',
    textColor: '#E8EEF8', subtext: 'rgba(232,238,248,0.45)', border: 'rgba(200,169,110,0.2)',
    heroBg: ['#0F1B35','#152040','#1A2848'],
    desc: 'Anggun, berwibawa, dan diraja.',
    tags: ['Anggun','Royal','Berwibawa'],
    demo: { couple:'Farhan & Irdina', date:'14 November 2026' },
  },
  {
    id: 'dusty',
    name: 'Dusty Rose',
    category: 'Romantik',
    tag: '',
    bg: '#FDF4F5', surface: '#FFF8F9', accent: '#9E5E6F', gold: '#C4909F',
    textColor: '#6B3A47', subtext: 'rgba(107,58,71,0.5)', border: '#E8C8D0',
    heroBg: ['#FDF4F5','#F7E8EC','#EED4DB'],
    desc: 'Lembut, feminin, dan pastel.',
    tags: ['Lembut','Feminin','Pastel'],
    demo: { couple:'Syafiq & Nuraini', date:'6 Jun 2026' },
  },

  // ── 10 TEMA BARU ─────────────────────────────────────────

  // 7. Islamik & Tradisional
  {
    id: 'islamik',
    name: 'Islamik Kaligrafi',
    category: 'Islamik',
    tag: 'Eksklusif',
    bg: '#F8F3E8', surface: '#FDF9F0', accent: '#2C4A1E', gold: '#B8960C',
    textColor: '#1E3214', subtext: 'rgba(30,50,20,0.5)', border: '#D4C080',
    heroBg: ['#F8F3E8','#F0E8D0','#E4D8B8'],
    desc: 'Terinspirasi kaligrafi Arab yang indah dan bermakna.',
    tags: ['Islamik','Kaligrafi','Bermakna'],
    demo: { couple:'Hafizuddin & Maryam', date:'10 Ogos 2026' },
    loveStory: [
      { year:'2020', title:'Dipertemukan Allah', text:'Dalam doa dan ikhtiar, Allah mempertemukan dua jiwa yang saling melengkapi.' },
      { year:'2023', title:'Merisik & Bertunang', text:'Dengan restu kedua ibu bapa, ikatan pertunangan dimeterai dengan penuh doa.' },
      { year:'2026', title:'Akad & Walimah', text:'Alhamdulillah, sempurna separuh agama dalam majlis yang penuh barakah.' },
    ],
  },

  // 8. Melayu Tradisional
  {
    id: 'songket',
    name: 'Songket Warisan',
    category: 'Tradisional',
    tag: 'Budaya',
    bg: '#1C0A00', surface: '#2A1200', accent: '#D4A030', gold: '#E8BC50',
    textColor: '#F5E8C8', subtext: 'rgba(245,232,200,0.5)', border: 'rgba(212,160,48,0.3)',
    heroBg: ['#1C0A00','#2A1200','#381800'],
    desc: 'Keindahan songket dan warisan budaya Melayu yang agung.',
    tags: ['Songket','Warisan','Budaya'],
    demo: { couple:'Tengku Razif & Puteri Balqis', date:'3 Oktober 2026' },
    loveStory: [
      { year:'2019', title:'Bertemu Di Majlis Adat', text:'Pertemuan yang membawa seribu makna dalam balutan adat resam Melayu.' },
      { year:'2023', title:'Merisik Bersongket', text:'Dalam pakaian songket keemasan, ikrar pertunangan dibuat dengan penuh adat.' },
      { year:'2026', title:'Bersanding Di Pelamin', text:'Hari yang dinanti tiba — bersanding megah dalam keanggunan songket warisan.' },
    ],
  },

  // 9. Moden Kontemporari
  {
    id: 'noir',
    name: 'Noir Elegan',
    category: 'Moden',
    tag: '',
    bg: '#0D0D0D', surface: '#1A1A1A', accent: '#FFFFFF', gold: '#E8E8E8',
    textColor: '#F0F0F0', subtext: 'rgba(240,240,240,0.45)', border: 'rgba(255,255,255,0.12)',
    heroBg: ['#0D0D0D','#141414','#1C1C1C'],
    desc: 'Ultra moden, hitam legam, dan sangat stylish.',
    tags: ['Ultra Moden','Hitam','Stylish'],
    demo: { couple:'Darwisyah & Qistina', date:'28 Februari 2026' },
    loveStory: [
      { year:'2021', title:'Bertemu Di Galeri Seni', text:'Di bawah cahaya seni, dua jiwa kreatif bertemu dan saling memahami.' },
      { year:'2024', title:'Lamar Dengan Bunga Hitam', text:'Sebuah lamaran yang berbeza — elegan, minimalis, dan penuh makna.' },
      { year:'2026', title:'Majlis Yang Takkan Dilupakan', text:'Malam yang penuh keindahan, dalam nuansa hitam dan putih yang abadi.' },
    ],
  },

  // 10. Nature & Outdoor
  {
    id: 'hutan',
    name: 'Hutan Tropis',
    category: 'Nature',
    tag: '',
    bg: '#0F1F0F', surface: '#162416', accent: '#7CB87C', gold: '#A8D080',
    textColor: '#D8F0D0', subtext: 'rgba(216,240,208,0.5)', border: 'rgba(124,184,124,0.25)',
    heroBg: ['#0F1F0F','#142014','#1A2A1A'],
    desc: 'Terinspirasi hutan tropika Malaysia yang subur dan hijau.',
    tags: ['Hutan','Tropika','Hijau'],
    demo: { couple:'Azhar & Raihana', date:'17 Mei 2026' },
    loveStory: [
      { year:'2020', title:'Bertemu Di Alam Terbuka', text:'Program mendaki yang mempertemukan dua hati yang cinta alam semula jadi.' },
      { year:'2023', title:'Melamar Di Hutan Lipur', text:'Di tengah ketenangan hutan, satu lamaran yang sederhana namun bermakna.' },
      { year:'2026', title:'Majlis Di Alam Hijau', text:'Majlis yang mencerminkan kasih kepada alam — segar, hijau, dan bahagia.' },
    ],
  },

  // 11. Nature Beach
  {
    id: 'pantai',
    name: 'Pantai Biru',
    category: 'Nature',
    tag: '',
    bg: '#0A1628', surface: '#0E1E35', accent: '#4A9EBF', gold: '#7CC4E0',
    textColor: '#D8EEF8', subtext: 'rgba(216,238,248,0.5)', border: 'rgba(74,158,191,0.25)',
    heroBg: ['#0A1628','#0D1C30','#102238'],
    desc: 'Keindahan pantai dan ombak laut yang menenangkan jiwa.',
    tags: ['Pantai','Laut','Biru'],
    demo: { couple:'Zainudin & Haslinda', date:'25 April 2026' },
    loveStory: [
      { year:'2019', title:'Bertemu Di Tepi Pantai', text:'Ombak membawa dua jiwa bertemu dalam satu petang yang indah di tepi laut.' },
      { year:'2023', title:'Cincin Di Bawah Sunset', text:'Lamaran ketika matahari terbenam di cakrawala — saat yang tidak terlupakan.' },
      { year:'2026', title:'Bersatu Seperti Ombak', text:'Seperti ombak yang sentiasa kembali ke pantai, hati ini kembali kepadamu.' },
    ],
  },

  // 12. Moden Pastel
  {
    id: 'lavender',
    name: 'Lavender Dreams',
    category: 'Moden',
    tag: '',
    bg: '#F5F0FF', surface: '#FAF7FF', accent: '#6B4FA0', gold: '#9B7FD0',
    textColor: '#3D2A60', subtext: 'rgba(61,42,96,0.5)', border: '#D4C4F0',
    heroBg: ['#F5F0FF','#EDE5FF','#E0D4F8'],
    desc: 'Tenang, mimpi-mimpi indah dalam warna lavender yang mempesona.',
    tags: ['Lavender','Tenang','Ungu'],
    demo: { couple:'Hazwan & Fasihah', date:'13 Jun 2026' },
    loveStory: [
      { year:'2021', title:'Kenal Melalui Kawan', text:'Perkenalan yang ringkas namun meninggalkan kesan yang mendalam di hati.' },
      { year:'2024', title:'Impian Menjadi Kenyataan', text:'Seperti warna lavender yang tenang, lamaran itu datang dengan penuh ketulusan.' },
      { year:'2026', title:'Majlis Impian', text:'Setiap detail mencerminkan impian — dari warna lavender hingga ke bunga-bungaan.' },
    ],
  },

  // 13. Islamik Moden
  {
    id: 'arabesque',
    name: 'Arabesque Moden',
    category: 'Islamik',
    tag: 'Trending',
    bg: '#F9F4ED', surface: '#FDF9F4', accent: '#8B5E3C', gold: '#C89B6E',
    textColor: '#3D2010', subtext: 'rgba(61,32,16,0.5)', border: '#E0C8A8',
    heroBg: ['#F9F4ED','#F2E8D8','#E8D8C0'],
    desc: 'Motif arabesque yang elegan bertemu dengan reka bentuk moden.',
    tags: ['Arabesque','Islamik Moden','Eksklusif'],
    demo: { couple:'Firdaus & Nabilah', date:'7 November 2026' },
    loveStory: [
      { year:'2020', title:'Diijabkabulkan Takdir', text:'Dalam coretan takdir Ilahi, dua insan dipertemukan dalam keindahan.' },
      { year:'2024', title:'Khitbah Yang Membahagiakan', text:'Dengan mahar yang penuh doa, ikatan pertunangan dimeterai dengan barakah.' },
      { year:'2026', title:'Majlis Penuh Barakah', text:'Walimatul urus yang dinantikan — penuh dengan doa, barakah, dan kebahagiaan.' },
    ],
  },

  // 14. Tradisional Modern Fusion
  {
    id: 'batik',
    name: 'Batik Modern',
    category: 'Tradisional',
    tag: '',
    bg: '#FFF8F0', surface: '#FFFCF8', accent: '#C04A20', gold: '#E08040',
    textColor: '#4A1808', subtext: 'rgba(74,24,8,0.5)', border: '#F0C8A0',
    heroBg: ['#FFF8F0','#FFE8D0','#FFD8B8'],
    desc: 'Keindahan batik Malaysia yang kaya dengan motif dan warna.',
    tags: ['Batik','Warisan','Fusion'],
    demo: { couple:'Shafeeq & Izzatul', date:'22 Januari 2026' },
    loveStory: [
      { year:'2019', title:'Bertemu Di Festival Batik', text:'Dalam keindahan kain batik yang berwarna-warni, dua hati bertemu.' },
      { year:'2023', title:'Ikatan Dalam Warna', text:'Seperti motif batik yang kaya, ikatan cinta ini penuh dengan corak yang indah.' },
      { year:'2026', title:'Majlis Yang Berwarna', text:'Meraikan kasih dalam balutan batik warisan — unik, kaya, dan membanggakan.' },
    ],
  },

  // 15. Moden Emerald
  {
    id: 'emerald',
    name: 'Emerald Luxury',
    category: 'Mewah',
    tag: 'Eksklusif',
    bg: '#0A1F14', surface: '#0F2B1A', accent: '#2ECC71', gold: '#58D68D',
    textColor: '#D5F5E3', subtext: 'rgba(213,245,227,0.5)', border: 'rgba(46,204,113,0.2)',
    heroBg: ['#0A1F14','#0D2618','#102E1C'],
    desc: 'Kehijauan permata yang mewah dan penuh dengan keistimewaan.',
    tags: ['Emerald','Mewah','Hijau'],
    demo: { couple:'Akmal & Delisha', date:'16 Julai 2026' },
    loveStory: [
      { year:'2021', title:'Secantik Permata', text:'Pertemuan yang bernilai seperti permata hijau — langka dan berharga.' },
      { year:'2024', title:'Ikrar Di Bawah Bintang', text:'Lamaran di malam hari di bawah ribuan bintang yang berkelip.' },
      { year:'2026', title:'Malam Paling Berharga', text:'Seperti kilau emerald, majlis ini akan bersinar dalam kenangan selamanya.' },
    ],
  },

  // 16. Outdoor Rustic
  {
    id: 'rustic',
    name: 'Rustic Countryside',
    category: 'Nature',
    tag: '',
    bg: '#F5ECD8', surface: '#FAF3E8', accent: '#6B4226', gold: '#B07840',
    textColor: '#3A2010', subtext: 'rgba(58,32,16,0.5)', border: '#DEC8A0',
    heroBg: ['#F5ECD8','#EDE0C4','#E0D0A8'],
    desc: 'Pesona desa dan ladang — hangat, rustic, dan romantik.',
    tags: ['Rustic','Desa','Organik'],
    demo: { couple:'Farouk & Suraya', date:'9 Mei 2026' },
    loveStory: [
      { year:'2019', title:'Bertemu Di Kampung Halaman', text:'Di bawah pokok rambutan di kampung, dua hati kecil mula bersemai.' },
      { year:'2023', title:'Melamar Dengan Bunga Kampung', text:'Lamaran yang sederhana namun penuh keikhlasan di halaman rumah keluarga.' },
      { year:'2026', title:'Majlis Kampung Yang Meriah', text:'Mengembalikan keindahan majlis kampung — meriah, mesra, dan penuh kenangan.' },
    ],
  },
]

// Helper — get theme by id
export function getTheme(id) {
  return ALL_THEMES.find(t => t.id === id) || ALL_THEMES[0]
}

// Theme presets untuk WeddingPage.js
export const THEME_PRESETS = ALL_THEMES.reduce((acc, t) => {
  acc[t.id] = {
    bg:      t.bg,
    surface: t.surface,
    border:  t.border,
    text:    t.textColor,
    subtext: t.subtext,
    heroBg:  t.heroBg,
  }
  return acc
}, {})