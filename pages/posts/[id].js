import Comment from '@/components/Comment'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import Post from '@/components/Post'
import Widgets from '@/components/Widgets'
import { db } from '@/firebase'
import ComponentModal from '@/components/ComponentModal'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy,query } from 'firebase/firestore'
export default function PostPage({newsResults,randomUsersResults}) {
   const [post,setPost]=useState();
   const [comments,setComments]=useState([]);
   const router=useRouter();
   const {id}=router.query;
   useEffect(
    ()=>onSnapshot(doc(db,"posts",id),(snapshot)=>setPost(snapshot)),
    [db,id]
  );
   useEffect(()=>{
            onSnapshot(
              query(
                collection(db,"posts",id,"comments"),
                orderBy("timestamp","desc")
              ),
              (snapshot)=>setComments(snapshot.docs)
            );
   },[db,id])
  return (

          <div>
            <Head>
              <title>
                Post
              </title>
            </Head> 
            <main  className='flex min-h-screen mx-auto' >
            <Sidebar/>
            <div className='xl:ml-[370px] border-l border-r border-gray-100 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
       <div className='flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-gray-200'>
                   <ArrowLeftIcon onClick={()=>router.push("/")} className='h-5 mr-3 hoverEffect'/>
                    
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>
            Tweet
        </h2>
       </div>
       <Post key={id} id={id} post={post}/> 
         {comments.length>0 && (
          <div className=''>
            {comments.map((comment)=>(
                          <Comment
                            key={comment.id}
                            commentId={comment.id}
                            originalPostId={id}
                            comment={comment.data()}
                          />
                        ))}
          </div>
                                 )}

    </div>
          {newsResults&&randomUsersResults&&  
          <Widgets newsResults={newsResults.articles}
         randomUsersResults={randomUsersResults.results} />}
             <ComponentModal/>
            </main>
          </div>
  )
}
//https://saurav.tech/NewsAPI/top-headlines/category/bussiness/us.json  
// export async function getServerSideProps(){
//         const newsResults=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
//         .then((res)=>res.json());
//         const randomUsersResults=await fetch("https://randomuser.me/api/?results=50&inc=name,login,picture")
//         .then((res)=>res.json());
//         return {
//           props:{
//             newsResults,
//             randomUsersResults,
//           },
//         }
// } 