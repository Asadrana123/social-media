import { SparklesIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import Post from './Post'
import { db } from '@/firebase'
import { onSnapshot, orderBy, query ,collection} from 'firebase/firestore'
import { AnimatePresence,motion } from 'framer-motion'
export default function Feed() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>
    onSnapshot(
      query(collection(db,"posts"),orderBy("timestamp","desc")),
      (snapshot)=>{
        setPosts(snapshot.docs)
      }
    ),
    []
)
  console.log(posts)
  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-100 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
       <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>
            Home
        </h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto  w-9 h-9'> 
            <SparklesIcon className='h-5'/>
        </div>
       </div>
       <Input/>
        <AnimatePresence>
       {posts.map((post)=>(
        <motion.div
          key={post.id}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0} }
          transition={{duration:1.5}}
        >
                 <Post key={post.id} id={post.id} post={post}/>
          </motion.div>
       ))}
       </AnimatePresence>
    </div>
  )
}
