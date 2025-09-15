import Layout from '@/components/Layout'

export default function Terms() {
  return (
    <Layout seo={{ title: 'Terms of Service', description: 'Terms of Service for Radev.dev operated by VEB RADEV D.O.O.E.L.', canonical: 'https://radev.dev/terms' }}>
      <div className='container mx-auto px-4 py-10'>
        <h1 className='text-5xl mb-6'>Terms of Service</h1>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Who we are</h2>
          <p>
            These Terms are between you and <strong>VEB RADEV D.O.O.E.L.</strong> (operating as <strong>Radev.dev</strong>; also known as <strong>DevSite Studio</strong>).
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Acceptable use</h2>
          <p>Do not misuse the site or attempt to disrupt its operation. You may not attempt unauthorized access or use content in violation of applicable law.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Intellectual property</h2>
          <p>All site content is owned by <strong>VEB RADEV D.O.O.E.L.</strong> unless otherwise stated. You may not reproduce or redistribute content without permission.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Disclaimers</h2>
          <p>The site is provided “as is.” We make no warranties regarding accuracy or availability.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Limitation of liability</h2>
          <p>To the maximum extent permitted by law, <strong>VEB RADEV D.O.O.E.L.</strong> is not liable for indirect or consequential damages arising from your use of the site.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Governing law</h2>
          <p>These Terms are governed by the laws of North Macedonia.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl mb-2'>Contact</h2>
          <p>Contact us at <a className='underline' href='mailto:info@radev.dev'>info@radev.dev</a>.</p>
        </section>

      </div>
    </Layout>
  )
}


