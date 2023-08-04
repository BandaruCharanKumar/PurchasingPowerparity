"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import Form from '../components/form'



export default function Mainpage() {

  return (
    <>
      <div className='mt-10 ml-10 '>
        <h1 className='text-4xl text-black mb-5 text' >PPP Salary Converter!</h1>
        <h1 className='text-lg '>While an INR 1 lakh salary may be equivalent to $1200, it's important to note that relocating from India to the USA means that $1200 cannot provide the same standard of living. The purchasing power of $1200 is not comparable to what you could acquire with INR 1 lakh in India.</h1>

      </div>

      <div className='mt-8 ml-10 mb-3'>
        <h2 className='text-lg '>Using the concept of PPP,we can get a more accurate estimate for the conversion. Let's get started!</h2>
      </div>
      <Form></Form>
    </>
  )
}
