import React from 'react'
import Image from 'next/image';
import {getProviders,signIn} from "next-auth/react";
export default function signin({providers}) {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
             <Image src="https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/archive/new_mobile_updatesforandroidiphoneandmobileweb95.thumb.1280.1280.png" 
             alt=""
            className='hidden object-cover md:inline-flex md:w-44 md:h-80 rotate-6'
            width="400"
            height="400"
             />
             <div className='flex flex-col items-center'>
             {Object.values(providers).map((provider)=>(
                      <div  key={provider.name} className='flex flex-col items-center'
                      >
                      <img src="https://engineering.fb.com/wp-content/uploads/2009/02/chat.jpg" 
                      className='w-36 object-cover rounded-xl'
                      alt=""/>
                      <p className='text-center text-sm italic my-10'>This app is created for learning purposes<br></br>Made by AsadR</p>
                      <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className='bg-sky-500 rounded-lg p-3 text-white hover:bg-sky-600' >Sign in with {provider.name}</button>
              </div>
             ))}
             </div>
          
    </div>

  )
}
export async function getServerSideProps(){
      const providers=await getProviders();
      return {
        props:{
          providers
        }
      }
}
