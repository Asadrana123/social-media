import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { serverTimestamp } from 'firebase/firestore';
import  {modalState, postIdState} from "../atom/modalAtom"
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import moment from 'moment';
import { db } from '@/firebase';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import {PhotographIcon,EmojiHappyIcon} from '@heroicons/react/solid';
export default function ComponentModal() {
    const [open,setOpen]=useRecoilState(modalState);
    const [postId]=useRecoilState(postIdState);
    const [post,setPost]=useState({});
    const {data:session}=useSession();
    const router=useRouter();
    const [input,setinput]=useState("");
    const [comments,sendcomment]=useState("");

    useEffect(()=>{
             onSnapshot(doc(db,"posts",postId),(snapshot)=>{
                setPost(snapshot);
             })
    },[postId,db])
    async function sendComment(){
        await addDoc(collection(db,"posts",postId,"comment"),{
           comment:input,
           name:session.user.name,
           username:session.user.username,
           userImg:session.user.image,
           timestamp:serverTimestamp()
        })
        setOpen(false);
        setinput("")
        router.push(`/posts/${postId}`);
    }
    return (
    <div>
       {open&&( 
       <Modal 
       isOpen={open} 
       className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
       onRequestClose={()=>setOpen(false)}
       >
               <div className='p-1'>
                    <div className='border-b border-gray-200 py-2 px-1.5'>
                      <div onClick={()=>setOpen(false)} className='hoverEffect w-9 h-9 flex items-center justify-center'>
                       <XIcon  className='h-[22px] text-gray-700' />
                       </div>
                    </div>
                    <div className='p-2 flex space-x-1 relative'>
                     <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-400'>
                     </span>
                    <img className='h-11 w-11 rounded-full mr-3' 
                     src={post?.data()?.userImg} alt="user image"/>
                     <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                               <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>
                               <span className='text-sm sm:text-[15px] hover:underline'>
                                </span>
                                <span className='text-sm sm:text-[15px] hover:underline'>
                                             {moment(post?.data()?.timestamp?.toDate()).fromNow()}
                                </span>
                    </div>
                    <p className='text-gay-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{post?.data()?.text}</p>
          <div className='flex border-gray-200 p-3 space-x-3'>
          <img
              src={session.user.image}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
          />
            <div className='w-full divide-y divide-gray-200'>
                <div className=''>
                         <textarea  className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 
                         tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder='Reply'
                         value={input}
                         onChange={(e)=>setinput(e.target.value)}
                         />
                </div>
            <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex' >
                    <div onClick={()=>filePickerRef.current.click()}>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-400'/>
                   {/* <input type='file' hidden ref={filePickerRef} 
                   onChange={addImageToPost} 
                   /> */}
                    </div>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-400'/>
                </div>
                <button
                onClick={sendComment} 
                disabled={!input.trim()}
                className='bg-blue-400 text-white px-4 py-1.5 
                rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>
                Comment
                </button>
              </div>
            </div>
    </div>

                   </div>
       </Modal>)}
    </div>
  )
}
