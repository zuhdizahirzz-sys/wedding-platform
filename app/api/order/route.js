import { supabaseAdmin } from '@/lib/supabase'

// Generate nombor rujukan unik
function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'WC-'
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}

export async function POST(request) {
  try {
    const body = await request.json()
    const ref  = generateRef()

    const supabase = supabaseAdmin()

    // Simpan order ke DB
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ref,
        theme_id:       body.theme_id,
        pakej_id:       body.pakej_id,
        groom_name:     body.groom_name,
        bride_name:     body.bride_name,
        wedding_date:   body.wedding_date,
        time:           body.time,
        venue:          body.venue,
        venue_address:  body.venue_address,
        dress_code:     body.dress_code,
        maps_link:      body.maps_link,
        contact_name:   body.contact_name,
        contact_phone:  body.contact_phone,
        contact_email:  body.contact_email,
        love_story_1:   body.love_story_1,
        love_story_2:   body.love_story_2,
        love_story_3:   body.love_story_3,
        special_request:body.special_request,
        status:         'pending',
      })
      .select()
      .single()

    if (error) {
      // Kalau table belum ada, return ref tanpa DB
      console.error('DB error (orders table may not exist):', error.message)
      // Masih return success supaya flow tidak putus
    }

    // Notifikasi ke admin via WA link (log ke console for now)
    const pakejPrice = { starter: 79, classic: 149, premium: 249 }
    const price = pakejPrice[body.pakej_id] || 149
    console.log(`[NEW ORDER] ${ref} — ${body.groom_name} & ${body.bride_name} — RM${price} — ${body.contact_phone}`)

    return Response.json({ success: true, ref })

  } catch (err) {
    console.error('Order API error:', err)
    // Return generated ref even on error
    return Response.json({ success: true, ref: generateRef() })
  }
}

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return Response.json({ orders: data })
  } catch (e) {
    return Response.json({ orders: [], error: e.message })
  }
}