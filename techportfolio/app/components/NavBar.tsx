import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='flex justify-between bg-slate-400 text-zinc-200 p-5'>
            <h1 className='text-2xl font-fraunces font-bold mr-5'>Nagarjun Mallesh</h1>
            <div className='font-sans'>
                <Link href="/" className='mr-5 hover:text-white transition-colors'>Home</Link>
                <Link href="/about" className='mr-5 hover:text-white transition-colors'>About Me</Link>
                <Link href="/contact" className='mr-5 hover:text-white transition-colors'>Contact</Link>
                <Link href="/blogs" className='mr-5 hover:text-white transition-colors'>Blog</Link>
            </div>
        </div>
    )
}

export default NavBar