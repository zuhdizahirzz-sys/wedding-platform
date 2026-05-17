import { supabaseAdmin } from '@/lib/supabase'
import ClientDashboard from '@/components/ClientDashboard'
import { notFound } from 'next/navigation'

async function getClientWithRSVP(slug) {
  try {
    const supabase = supabaseAdmin()

    // Get client
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (clientError || !client) return null

    // Get RSVPs
    const { data: rsvps } = await supabase
      .from('rsvp')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })

    return { client, rsvps: rsvps || [] }
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const data = await getClientWithRSVP(slug)
  if (!data) return { title: 'Dashboard' }
  return {
    title: `Dashboard — ${data.client.groom_name} & ${data.client.bride_name}`,
  }
}

export default async function DashboardPage({ params }) {
  const { slug } = await params
  const data = await getClientWithRSVP(slug)
  if (!data) notFound()
  return <ClientDashboard client={data.client} rsvps={data.rsvps} />
}