import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db, storage } from '../firebase'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom'

export default function Post({ post }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, sethasLiked] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => setLikes(snapshot.docs),
    )
  }, [db])

  useEffect(() => {
    sethasLiked(
      likes.findIndex(
        (like) => like.id === session?.user.uid,
      ) !== -1,
    )
  }, [likes])

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            'posts',
            post.id,
            'likes',
            session.user.uid,
          ),
        )
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            post.id,
            'likes',
            session?.user.uid,
          ),
          {
            username: session.user.username,
          },
        )
      }
    } else {
      signIn()
    }
  }

  async function deletePost() {
    if (
      window.confirm(
        'Are you sure you want to delete this post?',
      )
    ) {
      deleteDoc(doc(db, 'posts', post.id))
      deleteObject(ref(storage, `posts/${post.id}/image`))
    }
  }

  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer">
      {/* user image */}

      <img
        className="mr-1 rounded-full mrghg-4 h-11 w-11 "
        src={post.data().userImg}
        alt="user-image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.data().username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>
                {post?.data().timestamp?.toDate()}
              </Moment>
            </span>
          </div>

          {/* icon */}

          <DotsHorizontalIcon className="w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500 " />
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post.data().text}
        </p>

        {/* image */}
        <img
          className="mr-2 rounded-2xl"
          src={post.data().image}
          alt={post.data().image}
        />
        {/* icons */}
        <div className="flex justify-between p-2 text-gray-500">
          <ChatIcon
            onClick={() => setOpen(!open)}
            className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"
          />

          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center justify-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="p-2 text-red-600 h-9 w-9 hoverEffect hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${
                  hasLiked && 'text-red-600'
                } text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
