'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const ref   = searchParams.get('ref') || 'WC-XXXX'
  const pakej = searchParams.get('pakej') || 'classic'
  const price = searchParams.get('price') || '149'

  const pakejName = { starter:'Starter', classic:'Classic', premium:'Premium' }[pakej] || 'Classic'

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'linear-gradient(160deg,#FDFBF7,#F5EEE0)', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>

      <div style={{ maxWidth:520, width:'100%', textAlign:'center' }}>

        {/* Success icon */}
        <div style={{ width:72, height:72, borderRadius:'50%', background:'#EAF3DE', border:'2px solid #C8D8C0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:28 }}>
          ✓
        </div>

        <h1 style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:36, fontWeight:400, color:'#2C2C2A', marginBottom:8 }}>
          Order Berjaya Dihantar!
        </h1>
        <p style={{ fontSize:14, color:'rgba(44,44,42,0.6)', lineHeight:1.7, marginBottom:32 }}>
          Terima kasih kerana mempercayai WarkahCinta. Kami akan menghubungi anda dalam masa <strong style={{ color:'#2C2C2A' }}>1 jam</strong> via WhatsApp.
        </p>

        {/* Order details */}
        <div style={{ background:'#FDFBF7', border:'1px solid #E8D9BF', borderRadius:16, padding:'24px', marginBottom:24, textAlign:'left' }}>
          <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontWeight:400, color:'#2C2C2A', marginBottom:16, paddingBottom:12, borderBottom:'1px solid #E8D9BF' }}>Maklumat Order</p>
          {[
            ['Nombor Rujukan', ref],
            ['Pakej', pakejName],
            ['Jumlah Bayaran', `RM${price}`],
            ['Status', 'Menunggu Bayaran'],
          ].map(([label, value]) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ fontSize:13, color:'rgba(44,44,42,0.5)' }}>{label}</span>
              <span style={{ fontSize:13, fontWeight:500, color: label==='Status' ? '#C9A84C' : '#2C2C2A' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div style={{ background:'#2C2C2A', borderRadius:16, padding:'24px', marginBottom:24, textAlign:'left' }}>
          <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:18, fontWeight:400, color:'#FDFBF7', marginBottom:16 }}>Apa yang berlaku seterusnya?</p>
          {[
            { num:'1', title:'Kami hubungi anda', desc:'Team WarkahCinta akan WhatsApp anda dalam masa 1 jam untuk sahkan order.' },
            { num:'2', title:'Buat bayaran', desc:'Bayar via QR DuitNow yang akan kami hantar. Selamat dan mudah.' },
            { num:'3', title:'Kad disiapkan', desc:'Selepas bayaran disahkan, kad digital anda akan siap dalam 24 jam.' },
            { num:'4', title:'Terima link', desc:'Anda akan dapat link unik untuk dikongsi kepada semua tetamu.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ display:'flex', gap:14, marginBottom:14 }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(201,168,76,0.2)', border:'1px solid rgba(201,168,76,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, color:'#C9A84C', fontWeight:500 }}>{num}</div>
              <div>
                <p style={{ fontSize:13, fontWeight:500, color:'#FDFBF7', marginBottom:2 }}>{title}</p>
                <p style={{ fontSize:12, color:'rgba(253,251,247,0.55)', lineHeight:1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reference reminder */}
        <div style={{ background:'#FAF6EE', border:'1px dashed #C9A84C', borderRadius:12, padding:'16px', marginBottom:28 }}>
          <p style={{ fontSize:12, color:'rgba(44,44,42,0.5)', marginBottom:6 }}>Simpan nombor rujukan anda:</p>
          <p style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontSize:24, fontWeight:400, color:'#C9A84C', letterSpacing:'0.1em' }}>{ref}</p>
        </div>

        <div style={{ display:'flex', gap:10 }}>
          <Link href="/" style={{ flex:1, display:'block', textAlign:'center', background:'transparent', color:'#2C2C2A', border:'1px solid #E8D9BF', borderRadius:10, padding:'13px', fontSize:13, textDecoration:'none' }}>
            Balik ke Laman Utama
          </Link>
          <a href={`https://wa.me/60175364098?text=Salam%20WarkahCinta!%20Saya%20baru%20hantar%20borang%20order.%20Nombor%20rujukan%20saya%3A%20*${ref}*`} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, display:'block', textAlign:'center', background:'#25D366', color:'#fff', border:'none', borderRadius:10, padding:'13px', fontSize:13, textDecoration:'none' }}>
            💬 WhatsApp Kami
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><p style={{ fontFamily:'Georgia,serif', fontSize:18, color:'rgba(44,44,42,0.4)' }}>Memuatkan...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}