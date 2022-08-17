import Image from 'next/image'
import SidebarMenuItem from './SidebarMenuItem'
import { HomeIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline'
import {
  useSession,
  signIn,
  signOut,
} from 'next-auth/react'

export default function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="fixed flex-col hidden h-full p-2 sm:flex xl:items-start xl:ml-24">
      {/* Logo */}
      <div className="hoverEffect hover:bg-blue-100">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
          width="35"
          height="35"
        ></Image>
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem
          text="Home"
          Icon={HomeIcon}
          active
        />
        <SidebarMenuItem
          text="Explore"
          Icon={HashtagIcon}
        />

        {session && (
          <>
            <SidebarMenuItem
              text="Notifications"
              Icon={BellIcon}
            />
            <SidebarMenuItem
              text="Messages"
              Icon={InboxIcon}
            />
            <SidebarMenuItem
              text="Bookmarks"
              Icon={BookmarkIcon}
            />
            <SidebarMenuItem
              text="Lists"
              Icon={ClipboardIcon}
            />
            <SidebarMenuItem
              text="Profile"
              Icon={UserIcon}
            />
            <SidebarMenuItem
              text="More"
              Icon={DotsCircleHorizontalIcon}
            />
          </>
        )}
      </div>

      {/* Button */}
      {session ? (
        <>
          <button className="hidden w-56 h-12 text-lg font-bold text-white bg-blue-400 rounded-full shadow-md hover:brightness-95 xl:inline">
            Tweet
          </button>

          <div className="flex items-center justify-center mt-auto text-gray-700 hoverEffect xl:justify-start">
            <img
              onClick={signOut}
              className="w-10 h-10 rounded-full xl:mr-2"
              src={session.user.image}
              alt="user-image"
            />
            <div className="leading-5">
              <h4 className="font-bold ">
                {session.user.name}
              </h4>
              <p className="text-gray-500">
                @{session.user.username}
              </p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="w-56 h-12 text-lg font-bold text-white bg-blue-400 rounded-full shadow-md hover:brightness-95 xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  )
}
