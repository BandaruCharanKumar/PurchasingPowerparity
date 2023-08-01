import React from "react";

export default function Footer(){
  return(
    <>
    {/* <div class=" mt-[150px]  w-[70vw]  m-auto mb-4"></div> */}
    <footer class="w-full bottom-0 bg-white p-8">
      <div class="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-blue-500 text-center md:justify-evenly">
        <p class="block antialiased font-sans text-base leading-relaxed text-inherit text-center font-normal bg-blue-500 text-white">© 2023 Freebird</p>
          {/* <p class="block antialiased font-sans text-base leading-relaxed text-inherit text-center font-normal"> */}
           {/* <a href="https://api.whatsapp.com/send?phone=+919640833338&amp;text=Hello%20there!%20I%20Need%20some%20help%20regarding%20the%20pricing%20of%20FreeBird!" target="_blank" rel="noopener noreferrer">Contact Us</a>  */}
        {/* </p> */}
      </div>        
    </footer>
    </>
  )
}

