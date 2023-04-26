import React from 'react'
import Image from 'next/image'
import SidebarMenuitem from './SidebarMenuitem'
import {HomeIcon,HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon} from "@heroicons/react/solid"
export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
       <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
        <Image
        width="50"  
        height="50" 
         className='rounded-xl'
        src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        />
        </div> 
        {/* {menu} */}
        <div className='mt-4 mb-2.5 xl:items-start'>
             <SidebarMenuitem text="Home" Icon={HomeIcon} active />
             <SidebarMenuitem text="Explore" Icon={HashtagIcon} />
             <SidebarMenuitem text="Notifications" Icon={BellIcon} />
             <SidebarMenuitem text="Messages" Icon={InboxIcon} />
             <SidebarMenuitem text="Bookmarks" Icon={BookmarkIcon} />
             <SidebarMenuitem text="Lists" Icon={ClipboardIcon} />
             <SidebarMenuitem text="More" Icon={DotsCircleHorizontalIcon} />
        </div>
        {/* {button} */}
        <div className='mb-7'>
          <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet
        </button>
        </div>
        {/* miniprofile */}
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start">
            <img
              src="data:image/jpeg;base64,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"
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">Asad Rana</h4>
              <p className="text-gray-500">Coder</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
    </div>
  )
}
