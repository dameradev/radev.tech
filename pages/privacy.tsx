import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout seo={{ title: 'Privacy Policy', description: 'Privacy Policy for Radev.dev operated by VEB RADEV D.O.O.E.L.', canonical: 'https://radev.dev/privacy' }}>
      <div className='container mx-auto px-4 py-10'>
        <h1 className='text-5xl mb-6'>Privacy Policy</h1>

        <p className='text-sm mb-8'>Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Controller</h2>
          <p>
            <strong>VEB RADEV D.O.O.E.L.</strong>, operating the brand <strong>Radev.dev</strong> (also known as <strong>DevSite Studio</strong>), Kukush 6/A, 2000, Shtip, North Macedonia. Email: <a className='underline' href='mailto:info@radev.dev'>info@radev.dev</a>
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>What we collect</h2>
          <p>We collect basic web analytics and contact form entries (if you choose to submit the form).</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Purpose & lawful basis</h2>
          <p>We use analytics to understand site usage and improve content, and we process contact form entries to respond to your inquiries. Our lawful bases are legitimate interests and, where applicable, your consent.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Retention</h2>
          <p>Contact form messages are kept only as long as needed to respond. Analytics data is retained according to the default settings of the respective tools we use.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Data subject rights</h2>
          <p>You have rights to access, rectification, erasure, and objection. To exercise these rights, contact us at <a className='underline' href='mailto:info@radev.dev'>info@radev.dev</a>.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>International transfers</h2>
          <p>Our analytics or email providers may be located outside North Macedonia/EU. Where applicable, they rely on Standard Contractual Clauses and Data Processing Agreements. Please refer to their respective SCCs/DPAs.</p>
        </section>

      </div>
    </Layout>
  )
}


