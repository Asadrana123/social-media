import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid'
import React from 'react'
import { useSession } from 'next-auth/react'
import  Moment  from 'moment/moment';
import moment from 'moment/moment';
function Post({post}) {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
              {/* image */}
              <img className='h-11 w-11 rounded-full mr-3' 
              src={post.data().userImg} alt="user image"/>
              {/* right side */}
              <div>
                {/* header */}
                <div className='flex items-center justify-between'>
                     {/*post user info  */}
                     <div className='flex space-x-1 whitespace-nowrap'>
                               <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.data().name}</h4>
                               <span className='text-sm sm:text-[15px]'>@{post.data().username}</span>
                               <span className='text-sm sm:text-[15px] hover:underline'>
                                </span>
                                <span className='text-sm sm:text-[15px] hover:underline'>
                                             {moment(post.data().timestamp?.toDate()).fromNow()}
                                </span>
                     </div>
                     {/* dot icon */}
                     <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2'/>
                </div>
                {/* post text */}
                <p className='text-gray-800 text-[15px sm:text-[16px]] mb-2'>{post.data().text}</p>
                {/* post image */} 
                <img className='rounded-2xl mr-2' src={post.data().image} alt="post image"/>
                {/* icons */}
                <div className='flex justify-between text-gray-500 p-2'>
                          <ChatIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200 '/>
                          <TrashIcon className='h-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-200'/>
                          <HeartIcon className='h-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-200'/>
                           <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200'/>
                          <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200'/>
                </div>
              </div>
    </div>
  )
}

export default Post
