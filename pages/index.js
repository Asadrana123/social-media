import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'
import signin from './auth/Signin'
const inter = Inter({ subsets: ['latin'] })
import { useSession,signIn } from 'next-auth/react'
import ComponentModal from '@/components/ComponentModal'
export default function Home({newsResults,randomUsersResults}) {
//   const {data:session}=useSession();
//   if(!session){
//      {signIn()}
//  }
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
          {newsResults&&randomUsersResults&&  <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results} />}
             <ComponentModal/>
            </main>
          </div>
  )
}
//https://saurav.tech/NewsAPI/top-headlines/category/bussiness/us.json  
export async function getServerSideProps(){
        const newsResults=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
        .then((res)=>res.json());
        const randomUsersResults=await fetch("https://randomuser.me/api/?results=50&inc=name,login,picture")
        .then((res)=>res.json());
        return {
          props:{
            newsResults,
            randomUsersResults,
          },
        }
} 