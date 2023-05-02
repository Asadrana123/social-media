import React from 'react'
import {getProviders,signIn} from "next-auth/react";
export default function signin({providers}) {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
             <img src="https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/archive/new_mobile_updatesforandroidiphoneandmobileweb95.thumb.1280.1280.png" 
             alt=""
            className='hidden object-cover md:inline-flex md:w-44 md:h-80 rotate-6'
             />
             <div className='flex flex-col items-center'>
             {Object.values(providers).map((provider)=>(
                      <div className='flex flex-col items-center'
                      >
                      <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" 
                      className='w-36 object-cover'
                      alt=""/>
                      <p className='text-center text-sm italic my-10'>This app is created for learning purposes</p>
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
