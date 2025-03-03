import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid'
import {HeartIcon as EmptyHeart} from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db,storage } from '@/firebase';
import { signIn, useSession } from 'next-auth/react';
import { deleteObject, ref } from 'firebase/storage';
import { modalState, postIdState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import Image from 'next/image';
function Post({post,id}) {
  const router=useRouter();
  const {data:session}=useSession();
  const [likes,setLikes]=useState([]); 
  const [hasLiked,sethasLiked]=useState(false);
  const [open,setOpen]=useRecoilState(modalState);
  const [postId,setPostId]=useRecoilState(postIdState);
  const [comments,setComments]=useState([]);
  useEffect(()=>{
        const unsubscribe=onSnapshot(
          collection(db,"posts",id,"likes"),
          (snapshot)=>setLikes(snapshot.docs)
        ); 
        return ()=>unsubscribe()     
  },[db])
  useEffect(()=>{
       sethasLiked(likes.findIndex((like)=>like.id===session?.user.uid)!==-1)
  },[likes])
  async function likePost(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db,"posts",id,"likes",session?.user.uid))
}
else{ 
await setDoc(doc(db,"posts",id,"likes",session?.user.uid),{
      username:session.user.username,
})
    }
    
  }
   else{
      signIn();
   }
}
async function deletePost(){
            if(window.confirm("Are you sure you want to delete this post")){
                 deleteDoc(doc(db,"posts",id));
                 if(post.data().image) deleteObject(ref(storage,`posts/${id}/image`));
            }
            router.push('/')
}
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
              {/* image */}
              <Image className='h-11 w-11 rounded-full mr-3' 
              src={post?.data()?.userImg} alt="user image"
              width="20"
              height="20"
              />
              {/* right side */}
              <div className='flex-1'>
                {/* header */}
                <div className='flex items-center justify-between'>
                     {/*post user info  */}
                     <div className='flex space-x-1 whitespace-nowrap'>
                               <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                               <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>
                               <span className='text-sm sm:text-[15px] hover:underline'>
                                </span>
                                <span className='text-sm sm:text-[15px] hover:underline'>
                                             {moment(post?.data()?.timestamp?.toDate()).fromNow()}
                                </span>
                     </div>
                     {/* dot icon */}
                     <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2'/>
                </div>
                {/* post text */}
                <p onClick={()=>router.push(`posts/${id}`)} className='text-gray-800 text-[15px sm:text-[16px]] mb-2'>
                  {post?.data()?.text}</p>
                {/* post image */} 
                {post?.data()?.image&& <img 
                onClick={()=>router.push(`posts/${id}`)}
                className='rounded-2xl mr-2' 
                src={post?.data()?.image}  alt="post image"
                />} 
                {/* icons */}
                <div className='flex justify-between text-gray-500 p-2'>
                         <div className='flex items-center'>
                         <ChatIcon onClick={
                            ()=>{
                              if(!session){
                                signIn()
                              }
                            else{  
                            setOpen(!open)
                            setPostId(id)
                            }
                            }
                          } 
                          className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200 '/>
                          {comments.length>0&&(
                            <span>{comments.length}</span>
                          )}
                         </div>
                          {session?.user.uid===post?.data()?.id&&(
                                <TrashIcon onClick={deletePost} className='h-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-200'/>
                          )}
                          <div className='flex items-center'>
                          {hasLiked?<><HeartIcon onClick={likePost} className='h-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-200'/>
                          </>:<><EmptyHeart onClick={likePost} className='h-9 hoverEffect p-2 hover:text-red-500 hover:bg-sky-200'/>
                          </>}
                          {
                            likes.length>0&&(
                              <span className={`${hasLiked&& "text-red-600"}`}>{likes.length}</span>
                            )
                          }
                          </div> 
                           <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200'/>
                          <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-200'/>
                </div>
              </div>
    </div>
  )
}

export default Post
