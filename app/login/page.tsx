"use client"
import { loginErrorType } from '@/types';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {  useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


 function Loginpage() {

  let[authState,setAuthState]=useState({
    
    email:"",
    password:"",
   
})
let[loading,setLoading]=useState(false);
let[errors,setErrors]=useState<loginErrorType>({});


const params=useSearchParams();

async function submitForm()
{
  setLoading(true);
  try
  {
    
    const response=await axios.post("/api/auth/login",authState);
    const res=response.data;
    setLoading(false);

    if(res?.status==200)
    {
      signIn("credentials",{
        email:authState.email,
        password:authState.password,
        callbackUrl:"/",
        redirect:true
      })
    }
    else if(res?.status==400)
    {
      setErrors(res?.errors);
    }


  }
  catch(error)
  {
    setLoading(false);
  }
}

async function gitHubSignIn()
{
  await signIn("github",{
    redirect:true,
    callbackUrl:"/"
  })
}

async function googleSignIn()
{
  await signIn("google",{
    redirect:true,
    callbackUrl:"/"
  })
}

  return (
    <section className=' mt-12'>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-5 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>

            {params.get("message") ? <p className=' bg-green-900 font-semibold my-2 p-2 rounded-md text-green-400'>{params.get("message")} </p> : null}

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e)=>setAuthState({...authState,email:e.target.value})}
                    ></input>
                    <p className=' font-bold my-1 text-red-700'>{errors?.email}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e)=>setAuthState({...authState,password:e.target.value})}
                    ></input>
                    <p className=' font-bold my-1 text-red-700'>{errors?.password}</p>
                  </div>
                </div>
                <div>
                <button
                  onClick={submitForm}
                  type="button"
                  className={` active:scale-90 transition-all duration-200 inline-flex w-full items-center justify-center rounded-md ${loading? "bg-gray-600" : "bg-black"} px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                >
                  {loading ? "Processing..." : "Get Started"} 
                </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                onClick={gitHubSignIn}
                className="   active:scale-90  relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
              
                Sign in with GitHub
              </button>

            <button
              type="button"
              onClick={googleSignIn}
              className="relative active:scale-90 inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              
              Sign in with Google
            </button>
              
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

export default Loginpage;