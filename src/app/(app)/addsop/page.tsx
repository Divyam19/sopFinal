'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Addsop = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session) {
                setEmail(session.user.email);
                setName(session.user.name);
            }
        };
        fetchSession();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-semibold">Add SOPS</h1>
            <div className='flex justify-center items-center h-screen pb-9'>
                <form className='border-solid border-red-600 border-2 rounded-xl w-3/5' action='/api/addsop' method='POST'>
                    <div className='p-4 '>
                        <div className='p-4 flex flex-col gap-2'>
                            <Label>Title</Label>
                            <Input type='text' placeholder='Enter title' name='title' className='border-solid border-red-600 border-2 rounded-xl' required />
                        </div>
                        <div className='p-4 flex flex-col gap-2'>
                            <Label>Order of procedure</Label>
                            <div className='flex flex-col gap-2'>
                                <Input type='text' placeholder='Step 1 *' name='step1' className='border-solid border-red-600 border-2 rounded-xl' required />
                                <Input type='text' placeholder='Step 2 *' name='step2' className='border-solid border-red-600 border-2 rounded-xl' required />
                                <Input type='text' placeholder='Step 3 *' name='step3' className='border-solid border-red-600 border-2 rounded-xl' required />
                                <Input type='text' placeholder='Step 4' name='step4' className='border-solid border-red-600 border-2 rounded-xl' />
                                <Input type='text' placeholder='Step 5' name='step5' className='border-solid border-red-600 border-2 rounded-xl' />
                                <Label>Procedure</Label>
                                <Input type='text' placeholder='Procedure' name='procedure' className='border-solid border-red-600 border-2 rounded-xl' required />
                                <Input type='hidden' value={email} name='email' />
                                <Input type='hidden' value={name} name='name' />
                                <div className='flex flex-row gap-4'>
                                    <Button type='submit' className='rounded-xl bg-red-500 hover:bg-red-600 text-black place-self-end'>Submit</Button>
                                    <Button type='reset' className='rounded-xl bg-red-500 hover:bg-red-600 text-black place-self-end'>Reset</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addsop;
