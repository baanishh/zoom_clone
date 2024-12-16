"use client"

import Alert from '@/components/Alert'
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

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

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