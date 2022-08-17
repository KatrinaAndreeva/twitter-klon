import {
  EmojiHappyIcon,
  PhotographIcon,
} from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'

export default function Input() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      {session && (
        <div className="flex space-x-3 border-b border-gray-200">
          <img
            className="rounded-full cursor-pointer w-11 h-11 hover:brightness-95"
            src={session.user.image}
            alt="user-image"
            onClick={signOut}
          />
          <div className="w-full divide-y divide-gray-200 ">
            <div className="">
              <textarea
                rows="2"
                placeholder="Whats happening?"
                className="w-full text-lg tracking-wide placeholder-gray-700 border-none focus:ring-0 min-h-[50px] text-gray-700 "
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex ">
                <PhotographIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
                <EmojiHappyIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
              </div>
              <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}