import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import { useRef, useState } from 'react'
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import {
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage'

export default function Input() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const filePickerRef = useRef(null)

  const sendPost = async () => {
    if (loading) return

    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    })

    const imageRef = ref(
      storage,
      `posts/${docRef.id}/image`,
    )

    if (selectedFile) {
      await uploadString(
        imageRef,
        selectedFile,
        'data_url',
      ).then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      })
    }

    setInput('')
    setSelectedFile(null)
    setLoading(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full text-lg tracking-wide placeholder-gray-700 border-none focus:ring-0 min-h-[50px] text-gray-700 "
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="absolute text-black rounded-full shadow-md cursor-pointer h-7 shadow-white"
                />
                <img
                  src={selectedFile}
                  className={`${
                    loading && 'animate-pulse'
                  }`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex ">
                    <div
                      className=""
                      onClick={() =>
                        filePickerRef.current.click()
                      }
                    >
                      <PhotographIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    <EmojiHappyIcon className="w-10 h-10 p-2 cursor-pointer hoverEffect text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
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
