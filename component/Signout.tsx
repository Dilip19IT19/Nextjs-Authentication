"use client"
import React from 'react'
import { signOut } from 'next-auth/react';

function Signout() {
  return (
    <button onClick={()=>signOut({callbackUrl:"/login",redirect:true})} className='active:scale-90 p-1 rounded-md my-4 text-red-500 bg-red-900 font-bold'>Sign out</button>
  )
}

export default Signout