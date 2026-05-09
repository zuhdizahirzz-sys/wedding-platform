import { supabaseAdmin } from '@/lib/supabase'
import WeddingPage from '@/components/WeddingPage'
import { notFound } from 'next/navigation'

// Data demo — guna kalau Supabase belum setup
const DEMO_CLIENTS = {
  'ahmad-siti-2025': {
    id: 'demo-001',
    slug: 'ahmad-siti-2025',
    groom_name: 'Ahmad',
    bride_name: 'Siti',
    wedding_date: '2025-06-15',
    time: '11:00 pagi — 3:00 petang',
    venue: 'Dewan Seri Angkasa',
    venue_address: 'No. 12, Jalan Bahagia, Shah Alam, Selangor',
    dress_code: 'Putih, Krim & Warna Pastel',
    maps_link: 'https://maps.google.com',
    theme_color: '#2C2C2A',
    accent_color: '#D4A853',
    active: true,
  }
}

async function getClient(slug) {
  // Cuba fetch dari Supabase dulu
  try {
    const supabase = supabaseAdmin()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()
    if (!error && data) return data
  } catch (e) {
    console.log('Supabase not configured, using demo data')
  }
  // Fallback ke demo data
  return DEMO_CLIENTS[slug] || null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const client = await getClient(slug)
  if (!client) return { title: 'Not Found' }
  return {
    title: `${client.groom_name} & ${client.bride_name} — Walimatul Urus`,
    description: `Jemputan ke majlis perkahwinan ${client.groom_name} & ${client.bride_name}`,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const client = await getClient(slug)
  if (!client) notFound()
  return <WeddingPage client={client} />
}
