'use client '
import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'


const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-10 py-6 border-b border-0' >
        <h1>Logo</h1>
        <div className='flex gap-7 font-semibold' >
            
        <Link href= {"/"}>Home</Link>
        <Link href= {"/about "}>About</Link>
        <Link href= {"/console"}>Console</Link>
        </div>
        <div>
            <ThemeToggle />            
        </div>
    </div>
  )
}

export default Navbar