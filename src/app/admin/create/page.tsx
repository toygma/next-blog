"use client"
import Loading from '@/components/loading'
import CreatePage from '@/components/pages/admin/create/CreatePage'
import { useUser } from '@clerk/nextjs'

const Page = () => {
  const {isSignedIn,isLoaded,user} = useUser()

  if(!isLoaded){
    return null
  }

  if(!isSignedIn || !user || user.publicMetadata.isAdmin === false){
    return <Loading fullScreen/>
  }
  return (
    <div className='mt-32 max-w-screen-xl mx-auto'>
      <CreatePage/>
    </div>
  )
}

export default Page