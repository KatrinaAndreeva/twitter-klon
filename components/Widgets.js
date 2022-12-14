import { SearchIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import News from './News'

export default function Widgets({
  newsResults,
  randomUsersResults,
}) {
  const [articleNum, setArticleNum] = useState(3)
  const [randomUserNum, setRandomUserNum] = useState(3)
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="relative flex items-center p-2 rounded-full ">
          <SearchIcon className="z-50 h-5 text-gray-500" />
          <input
            className="absolute inset-0 text-gray-700 bg-gray-100 border-gray-500 rounded-full pl-11 focus:shadow-lg focus:bg-white "
            type="text"
            placeholder="Search Twitt"
          />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="px-4 text-xl font-bold ">
          Whats happening
        </h4>
        <AnimatePresence>
          {newsResults
            .slice(0, articleNum)
            .map((article) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <News
                  key={article.title}
                  article={article}
                />
              </motion.div>
            ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="pb-3 pl-4 text-blue-300 hover:text-blue-400"
        >
          Show more
        </button>
      </div>

      <div className="space-y-3 text-gray-700 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] sticky top-16">
        <h4 className="px-4 text-xl font-bold ">
          Who to follow
        </h4>
        <AnimatePresence>
          {randomUsersResults
            .slice(0, randomUserNum)
            .map((randomUser) => (
              <motion.div
                key={randomUser.login.username}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                  key={randomUser.login.username}
                >
                  <img
                    className="rounded-full"
                    width="40"
                    src={randomUser.picture.thumbnail}
                    alt=""
                  />
                  <div className="ml-4 leading-5 truncate">
                    <h4 className="font-bold hover:underline text-[14px] truncate">
                      {randomUser.login.username}
                    </h4>
                    <h5 className="text-[13px] text-gray-500 truncate">
                      {randomUser.name.first +
                        ' ' +
                        randomUser.name.last}
                    </h5>
                  </div>
                  <button className="ml-auto text-sm text-white bg-black rounded-full px-3.5 py-1.5 font-bold">
                    Follow
                  </button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        <button
          onClick={() =>
            setRandomUserNum(randomUserNum + 3)
          }
          className="pb-3 pl-4 text-blue-300 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  )
}
