import { getProviders, signIn } from 'next-auth/react'

export default function signin({ providers }) {
  return (
    <div className="flex justify-center mt-20">
      <img
        className="hidden object-cover space-x-4 md:inline-flex md:w-44 md:h-80 rotate-6"
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image"
      />
      <div className="">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.id}
            className="flex flex-col items-center"
          >
            <img
              className="object-cover w-32"
              src="http://localhost:3000/_next/image?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F4%2F4f%2FTwitter-logo.svg%2F1200px-Twitter-logo.svg.png&w=64&q=75"
              alt="twitter image"
            />
            <p className="my-10 text-sm italic text-center">
              This app is created for learning purposes
            </p>
            <button
              onClick={() =>
                signIn(provider.id, { callbackUrl: '/' })
              }
              className="p-3 font-bold text-white bg-red-400 rounded-lg hover:bg-red-500"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
