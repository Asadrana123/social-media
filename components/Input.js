import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/solid'
import React, { useRef } from 'react'
import { db } from '@/firebase';
import { ref } from 'firebase/storage';
import { storage } from '@/firebase';
import { useSession,signOut } from 'next-auth/react'
import { useState } from 'react';
import {addDoc, collection, updateDoc,doc} from "firebase/firestore"
import { serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, uploadString } from 'firebase/storage';
import Image from 'next/image';
export default function Input() {
      const {data:session}=useSession();
      const [input,setinput]=useState(""); 
      const [selectedFile,setSelectedFile]=useState(null);
      const [loading,setLoading]=useState(false);
      const filePickerRef=useRef(null)
      const sendPost=async ()=>{
         if(loading) return;
         setLoading(true);
         console.log(session);
        const docRef=await addDoc(collection(db,"posts"),{
                id:session.user.uid,
                text:input,
                userImg:session.user.image,
                timestamp:serverTimestamp(),
                name:session.user.name,
                username:session.user.username
        })
        const imageRef=ref(storage,`posts/${docRef.id}/image`);
        if(selectedFile){
          await uploadString(imageRef,selectedFile,"data_url")
          .then(async()=>{ 
               const downloadURl=await getDownloadURL(imageRef,selectedFile)
               await updateDoc(doc(db,"posts",docRef.id),{
                image:downloadURl
              }) 
          })
        }
        setinput("dl");
        setSelectedFile(null);
        setLoading(false);
      };
      const addImageToPost=(e)=>{
         const reader=new FileReader();
         if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
         }
         reader.onload=(readerEvent)=>{
            setSelectedFile(readerEvent.target.result)
         }
      }
  return (
    <>
    {session&&(
          <div className='flex border-b border-gray-200 p-3 space-x-3'>
          <img
              onClick={signOut}
              src={session.user.image}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
          />
            <div className='w-full divide-y divide-gray-200'>
                <div className=''>
                         <textarea  className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 
                         tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder='What`s happening'
                         value={input}
                         onChange={(e)=>setinput(e.target.value)}
                         />
                </div>
                {selectedFile&&(
                  <div className='relative'>
                    <XIcon 
                    onClick={()=>setSelectedFile(null)}
                    className='h-5 absolute 
                     text-red-600
                    cursor-pointer 
                    shadow-white
                    shadow-md'   
                    />
                    <Image src={selectedFile} 
                     className={`${loading&&"animate-pulse"}`}
                    alt=""
                    />
                    </div>
                )}
            <div className='flex items-center justify-between pt-2.5'>
                {!loading &&(
                  <>
                    <div className='flex' >
                    <div onClick={()=>filePickerRef.current.click()}>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-400'/>
                   <input type='file' hidden ref={filePickerRef} 
                   onChange={addImageToPost} 
                   />
                    </div>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-400'/>
                </div>
                <button
                onClick={sendPost} 
                disabled={!input.trim()}
                className='bg-blue-400 text-white px-4 py-1.5 
                rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>
                Post
                </button>

                  </>
                )}
              </div>
            </div>
    </div>
    )}

    </>
  )
}
