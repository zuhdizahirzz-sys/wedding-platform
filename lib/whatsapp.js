const twilio = require('twilio')

function getClient() {
  return twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
}

// Format nombor Malaysia → WhatsApp format
// Input: "0123456789" → Output: "whatsapp:+60123456789"
function formatNumber(tel) {
  const cleaned = tel.replace(/\D/g, '') // buang bukan angka
  const withCountry = cleaned.startsWith('60')
    ? cleaned
    : cleaned.startsWith('0')
    ? '60' + cleaned.slice(1)
    : '60' + cleaned
  return `whatsapp:+${withCountry}`
}

// ── Hantar konfirmasi RSVP terus selepas submit ──────────
export async function hantarKonfirmasiRSVP({ nama, telefon, status, groomName, brideName, weddingDate, venue }) {
  const date = new Date(weddingDate).toLocaleDateString('ms-MY', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  let mesej = ''
  if (status === 'hadir') {
    mesej = `Assalamualaikum ${nama} 😊\n\nTerima kasih kerana mengesahkan kehadiran anda ke majlis perkahwinan *${groomName} & ${brideName}*.\n\n📅 ${date}\n📍 ${venue}\n\nKami sangat menantikan kehadiran anda! Jumpa di majlis nanti. 🌸`
  } else if (status === 'tidak') {
    mesej = `Assalamualaikum ${nama},\n\nTerima kasih kerana memaklumkan. Kami faham anda tidak dapat hadir ke majlis perkahwinan *${groomName} & ${brideName}*.\n\nDoa kami bersama anda. Semoga kita bertemu di lain kesempatan. 🤲`
  } else {
    mesej = `Assalamualaikum ${nama},\n\nTerima kasih kerana mendaftar. Kami faham anda masih belum pasti. Sila maklumkan kami sebaik sahaja ada kepastian. 😊\n\nMajlis: *${groomName} & ${brideName}*\n📅 ${date}`
  }

  try {
    const client = getClient()
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: formatNumber(telefon),
      body: mesej,
    })
    return { success: true }
  } catch (error) {
    console.error('WhatsApp error:', error.message)
    return { success: false, error: error.message }
  }
}

// ── Hantar reminder (7 hari atau 1 hari sebelum) ─────────
export async function hantarReminder({ nama, telefon, groomName, brideName, weddingDate, venue, hariLeft }) {
  const date = new Date(weddingDate).toLocaleDateString('ms-MY', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const emoji = hariLeft === 7 ? '🗓️' : '🎉'
  const mesej = `${emoji} Assalamualaikum ${nama}!\n\nSekadar peringatan mesra — majlis perkahwinan *${groomName} & ${brideName}* adalah *${hariLeft === 1 ? 'ESOK' : `dalam ${hariLeft} hari lagi`}*!\n\n📅 ${date}\n📍 ${venue}\n\n${hariLeft === 1 ? 'Jumpa esok ya! Kami menantikan kehadiran anda 😊' : 'Jangan lupa tandakan dalam kalendar anda!'}`

  try {
    const client = getClient()
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: formatNumber(telefon),
      body: mesej,
    })
    return { success: true }
  } catch (error) {
    console.error('Reminder error:', error.message)
    return { success: false, error: error.message }
  }
}