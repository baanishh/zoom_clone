"use client"

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGateCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'


const Meeting = ( {params : {id}} : { params : { id : string}}) => {
  const {user, isLoaded}=useUser()
  const [isSetUpComplete,setIsSetUpComplete]=useState(false)
  const {call, isCallingLoading}=useGateCallById(id)

  if(!isLoaded || isCallingLoading) return <Loader/>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          { !isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete}/>
          ) : (
             <MeetingRoom/>
          )

          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting