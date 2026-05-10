import { supabaseAdmin } from '@/lib/supabase'

// GET — ambil semua RSVP untuk satu klien
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('client_id')

    if (!clientId) {
      return Response.json({ error: 'client_id required' }, { status: 400 })
    }

    const supabase = supabaseAdmin()
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return Response.json({ rsvps: data })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}