import { Button } from '@/components/ui/button'
import { Butcherman } from 'next/font/google'
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'



const Sops = () => {
  return (
    <div >
        <h1 className="text-2xl font-semibold">SOPS</h1>
        <div className='p-9'>
        <div className='flex flex-row gap-4 '>
            <div >
                <Input type="text"  placeholder='Enter Sop Name' className='border-solid border-2 border-red-500'/>
            </div>
            <div className='flex justify-end gap-4 '>
                <Button variant='ghost' className='rounded-xl bg-red-500 hover:bg-red-600 text-black place-self-end'>
                    <Search width={19}/>SEARCH
                </Button>
                <a href="/addsop">
                    <Button variant='ghost' className='rounded-xl bg-red-500 hover:bg-red-600 text-black place-self-end' >
                        Add SOP
                    </Button>
                </a>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Sops