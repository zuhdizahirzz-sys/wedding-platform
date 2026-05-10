import { supabaseAdmin } from '@/lib/supabase'

// GET — ambil semua klien
export async function GET() {
  try {
    const supabase = supabaseAdmin()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return Response.json({ clients: data })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

// POST — tambah klien baru
export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = supabaseAdmin()

    const { data, error } = await supabase
      .from('clients')
      .insert({
        slug:          body.slug,
        groom_name:    body.groom_name,
        bride_name:    body.bride_name,
        wedding_date:  body.wedding_date,
        time:          body.time,
        venue:         body.venue,
        venue_address: body.venue_address,
        dress_code:    body.dress_code,
        maps_link:     body.maps_link,
        theme_id:      body.theme_id || 'moden',
        theme_color:   body.theme_color || '#2C2C2A',
        accent_color:  body.accent_color || '#C9A84C',
        active:        true,
      })
      .select()
      .single()

    if (error) throw error
    return Response.json({ client: data })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

// PATCH — update active status
export async function PATCH(request) {
  try {
    const { id, active } = await request.json()
    const supabase = supabaseAdmin()

    const { error } = await supabase
      .from('clients')
      .update({ active })
      .eq('id', id)

    if (error) throw error
    return Response.json({ success: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}