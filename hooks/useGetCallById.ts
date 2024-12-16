import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGateCallById=(id:string | string[])=>{
    const [call , setCall]=useState<Call>()
    const [isCallingLoading,setIsCallingLoading]=useState(true)
    

    const client = useStreamVideoClient();

    useEffect(()=>{
        if(!client) return

        const loadCall=async()=>{
            const {calls}=await client.queryCalls({
                filter_conditions:{
                    id
                }
            })
            if(calls.length>0) setCall(calls[0])
             setIsCallingLoading(false)   
        }
        loadCall()

    },[id,client])
return {call, isCallingLoading}
}