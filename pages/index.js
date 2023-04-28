import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'

const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {
  return (
          <div>
            <Head>
              <title>
                Twitter
              </title>
            </Head> 
            <main  className='flex min-h-screen mx-auto' >
            <Sidebar/>
            <Feed/>
            <Widgets newsResults={newsResults.articles}/>
            </main>
          </div>
  )
}
//https://saurav.tech/NewsAPI/top-headlines/category/bussiness/us.json  
export async function getServerSideProps(){
        const newsResults=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
        .then((res)=>res.json());
        return {
          props:{
            newsResults
          }
        }
} 