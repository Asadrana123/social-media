import React from 'react'
import Image from 'next/image'
import SidebarMenuitem from './SidebarMenuitem'
import {HomeIcon,HashtagIcon, BellIcon, InboxIcon, 
BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon} from "@heroicons/react/solid"
import { useSession,signIn,signOut } from 'next-auth/react'
export default function Sidebar() {
  const {data:session}=useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
       <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
        <img
        alt="twitter"
        width="50"  
        height="50" 
         className='rounded-xl'
        src="https://engineering.fb.com/wp-content/uploads/2009/02/chat.jpg"
        />
        </div> 
        {/* {menu} */}
        <div className='mt-4 mb-2.5 xl:items-start'>
             <SidebarMenuitem text="Home" Icon={HomeIcon} active />
             <SidebarMenuitem text="Explore" Icon={HashtagIcon} />
             {session&&<>
              <SidebarMenuitem text="Notifications" Icon={BellIcon} />
             <SidebarMenuitem text="Messages" Icon={InboxIcon} />
             <SidebarMenuitem text="Bookmarks" Icon={BookmarkIcon} />
             <SidebarMenuitem text="Lists" Icon={ClipboardIcon} />
             <SidebarMenuitem text="More" Icon={DotsCircleHorizontalIcon} />
             </>}

        </div>
        {/* {button} */}
        {session?<> <div className='mb-7'>
          <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
            Post
        </button></div>
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start">
            <img
              src={session?.user.image}          
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
              onClick={signOut}
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>:<> <button onClick={()=>signIn()} 
        className='bg-sky-500 rounded-lg py-2 text-white hover:bg-sky-600 px-8' >
          Sign in </button></>
        }
       
        {/* miniprofile */}
       
    </div>
  )
}
