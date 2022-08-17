import { SparklesIcon } from '@heroicons/react/outline'
import Post from '../pages/Post'
import Input from './Input'

export default function Feed() {
  const posts = [
    {
      id: '1',
      name: 'Kate',
      username: 'kate_websites',
      userImg:
        'https://scontent.fiev13-1.fna.fbcdn.net/v/t39.30808-6/274809305_3159579500956122_4305280059292410995_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Iz17cS6JCE8AX9JNqgy&_nc_ht=scontent.fiev13-1.fna&oh=00_AT-SOihiyZSWhOUWBcmYWZQbahqy3vFsHkft-Ezk-gJLLw&oe=62FA9E40',
      img: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHVya2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      text: 'nice view',
      timestamp: '2 years ago',
    },
    {
      id: '2',
      name: 'Kate',
      username: 'kate_websites',
      userImg:
        'https://scontent.fiev13-1.fna.fbcdn.net/v/t39.30808-6/274809305_3159579500956122_4305280059292410995_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Iz17cS6JCE8AX9JNqgy&_nc_ht=scontent.fiev13-1.fna&oh=00_AT-SOihiyZSWhOUWBcmYWZQbahqy3vFsHkft-Ezk-gJLLw&oe=62FA9E40',
      img: 'https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWtyYWluZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      text: 'nice',
      timestamp: '2 months ago',
    },
  ]
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky top-0 z-50 flex px-3 py-2 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">
          Home
        </h2>
        <div className="flex items-center justify-center px-0 ml-auto hoverEffect w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
