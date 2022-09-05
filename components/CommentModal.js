import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atom/modalAtom'
import Modal from 'react-modal'
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState)
  const [postId] = useRecoilState(postIdState)
  const [post, setPost] = useState({})
  const [input, setInput] = useState('')

  const { data: session } = useSession()

  useEffect(() => {
    onSnapshot(doc(db, 'posts', postId), (snapshot) => {
      setPost(snapshot)
    })
  }, [postId, db])

  function sendComment() {}

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md  border-gray-200"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="flex items-start justify-center w-12 h-12 hoverEffect "
              >
                <XIcon className="text-gray-700" />
              </div>
            </div>
            <div className="relative flex items-center p-2 space-x-1">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="mr-4 rounded-full h-11 w-11"
                src={post?.data()?.userImg}
                alt="user-image"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{' '}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>
                  {post?.data()?.timestamp?.toDate()}
                </Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex space-x-3 border-b border-gray-200 left-8">
              <img
                className="mx-3 mr-4 rounded-full h-11 w-11"
                src={session.user.image}
                alt="user-image"
              />
              <div className="w-full divide-y divide-gray-200 ">
                <div className="">
                  <textarea
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value)
                    }
                    className="w-full text-lg tracking-wide placeholder-gray-700 border-none focus:ring-0 min-h-[50px] text-gray-700 "
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex ">
                    <div
                      className=""
                      // onClick={() =>
                      //   filePickerRef.current.click()
                      // }
                    >
                      <PhotographIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>

                    <EmojiHappyIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
