import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline'

export default function Post({ post }) {
  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer">
      {/* user image */}

      <img
        className="mr-4 rounded-full h-11 w-11 "
        src={post.userImg}
        alt="user-image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>

          {/* icon */}

          <DotsHorizontalIcon className="w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500 " />
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post.text}
        </p>

        {/* image */}
        <img
          className="mr-2 rounded-2xl"
          src={post.img}
          alt="post-image"
        />
        {/* icons */}
        <div className="flex justify-between p-2 text-gray-500">
          <ChatIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
