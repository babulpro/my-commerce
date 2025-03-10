import React from 'react';
import Link from 'next/link';
const Page = () => {
   return (
     
     <div className="">
       
     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> 
       hello babul how are you   
       <Link href={"/dashboard/pages/about"}>click her</Link>  
     </div>
     </div>
      
   );
};

export default Page;