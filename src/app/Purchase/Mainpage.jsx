"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import Form from '../components/form'



export default function Mainpage() {

  return (
    <>
      <div className='mt-10 ml-10 '>
        <h1 className='text-4xl text-black mb-5 text' >Purchasing Power Parity Salary Converter!</h1>
        <h1 className='text-lg '>A salary of INR 45k is roughly equal to $2000 but if you move from India to USA, can $2000 give you the same standard of living? Can you purchase the same goods and services for $2000 that you used to get for INR 45k in India? The answer is NO.</h1>

      </div>

      <div className='mt-8 ml-10 mb-3'>
        <h2 className='text-lg '>Using the concept of PPP,we can get a more accurate estimate for the conversion. Let's get started!</h2>
      </div>

      <div className='flex flex-col items-center '>
        <Form></Form>
      </div>

      {/* <div className="flex flex-col h-[calc(100%-392px)]">
        <div className="p-4"> 
          <Form />
        </div> 
      </div> */}

      {/* <div className="flex flex-col h-[calc(100%-392px)]">
      <div className="w-3/4 mx-auto"> 
        <Form />
      </div>
    </div> */}

      {/* <div className="flex flex-col h-[calc(100%-392px)]">
        <div className="m-4"> 
          <Form />
        </div>
      </div> */}


      {/* <div className="text-center mt-5">
          <div className="bg-blue-100 inline-block p-4 rounded-md">
            According to PPP, a salary of <strong>INR 45000</strong> in <strong>India</strong>
            is equivalent to <strong>INR 168374.01</strong> or <strong>USD 2046.43</strong> in <strong>United States.</strong>
          </div>
        </div> */}

      {/* <div className="text-center mt-5">
        <div className="bg-blue-100 inline-block p-4 rounded-md">
          <p>You require a salary of <strong>  <span id="targetAmount">{outputAmount}</span></strong> in <strong> <span id="targetCountryName">{targetCountry}</span>'s </strong> local currency to live a similar
            quality of life as you would with a salary of <strong> <span id="sourceAmountLabel">{salary}</span></strong> in <strong><span id="sourceCountryLabel">{sourceCountry}</span>'s </strong>local currency. </p>
        </div>
      </div> */}

    </>
  )
}
