import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'
import ComponentModal from '@/components/ComponentModal'
import { useEffect } from 'react'
import requestNotificationPermission from '../components/PushNotificationLayout'
export default function Home({newsResults,randomUsersResults}) {
     useEffect(() => {
      requestNotificationPermission()
     }, [])
  return (
          <div>
            <Head>
              <title>
                Social Media
              </title>
              <link rel="icon" href="https://engineering.fb.com/wp-content/uploads/2009/02/chat.jpg" width="auto" height="auto" />
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
export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // Who to follow section

  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

  // const randomUsersResults = await fetch(
  //   "https://randomuser.me/api/?results=30&inc=name,login,picture"
  // ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  }; 
}