// In-memory store untuk demo (hilang bila server restart)
// Bila Supabase dah setup, data akan simpan dalam DB
const rsvpStore = []

export async function POST(request) {
  try {
    const body = await request.json()
    const { nama, telefon, bilangan, status, ucapan, client_id } = body

    // Basic validation
    if (!nama || !telefon || !status) {
      return Response.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // Cuba simpan ke Supabase kalau ada env vars
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('XXXXXXXX')) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { error } = await supabase
          .from('rsvp')
          .insert({ nama, telefon, bilangan: parseInt(bilangan) || 1, status, ucapan, client_id })

        if (error) throw error

        // Cuba hantar WhatsApp (optional, jangan block)
        try {
          const { hantarKonfirmasiRSVP } = await import('@/lib/whatsapp')
          const { data: clientData } = await supabase
            .from('clients')
            .select('groom_name, bride_name, wedding_date, venue')
            .eq('id', client_id)
            .single()

          if (clientData) {
            hantarKonfirmasiRSVP({ nama, telefon, status, ...clientData })
              .catch(e => console.log('WA skip:', e.message))
          }
        } catch (e) {
          console.log('WhatsApp skip:', e.message)
        }

        return Response.json({ success: true, mode: 'database' })
      } catch (dbError) {
        console.error('DB error:', dbError.message)
        // Fallback ke memory store
      }
    }

    // Fallback: simpan dalam memory (demo mode)
    const entry = {
      id: Date.now().toString(),
      nama,
      telefon,
      bilangan: parseInt(bilangan) || 1,
      status,
      ucapan,
      client_id,
      created_at: new Date().toISOString(),
    }
    rsvpStore.push(entry)

    console.log(`[DEMO MODE] RSVP diterima: ${nama} (${status}) - Total: ${rsvpStore.length}`)

    return Response.json({ success: true, mode: 'demo' })

  } catch (err) {
    console.error('RSVP route error:', err)
    return Response.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}

// GET endpoint untuk tengok semua RSVP dalam demo mode
export async function GET() {
  return Response.json({ rsvps: rsvpStore, total: rsvpStore.length })
}