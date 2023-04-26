import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
          <div>
            <Head>
              <title>
                Twitter
              </title>
            </Head> 
            <main  className='flex min-h-screen mx-auto' >
            <Sidebar/>
              {/* {} */}
              {/* {} */}
            </main>
          </div>
  )
}
