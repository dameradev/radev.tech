import Layout from '@/components/Layout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Layout seo={{ title: 'Page Not Found', description: '404 – Radev.dev by VEB RADEV D.O.O.E.L.', canonical: 'https://radev.dev/404' }}>
      <div className='container mx-auto px-4 py-20 text-center'>
        <h1 className='text-6xl mb-4'>404</h1>
        <p className='mb-8'>The page you are looking for could not be found.</p>
        <div className='flex gap-4 justify-center'>
          <Link className='underline' href='/'>Go to Home</Link>
          <Link className='underline' href='/contact'>Contact / Imprint</Link>
        </div>
      </div>
    </Layout>
  )
}


