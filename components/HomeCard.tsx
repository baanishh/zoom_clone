import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    className:string,
    img:string,
    description:string,
    handleClick:()=>void,
    title:string,
}

const HomeCard = ({className, img, title, description, handleClick} : HomeCardProps) => {
  return (
   
    <div className={cn('px-4 py-6 flex justify-between flex-col w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',className)} onClick={handleClick}>
    <div className='flex-center glassmorphism size-12 rounded-[12px]'>
         <Image
         src={img}
         alt="plus logo"
         width={27}
         height={27}
         />
    </div>

    <div className='flex flex-col gap-2'>
     <h1 className='text-2xl font-bold'>{title}</h1>
     <p className='text-lg font-bold'>{description}</p>
    </div>
 </div>
  )
}

export default HomeCard