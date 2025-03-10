    
import Link from "next/link";
import MainNavbar from "./lib/component/utilityCom/MainNavbar";
 
const getData = async()=>{
  try{
      let res= await fetch(`http://localhost:3000/api/getData/navbar`, { method: "GET" } ,{cache: 'no-store' })
      const data = await res.json()
      return data.data

  }
  catch(e){
      return []
  }
}

export default async function Page({children}) {
  const data = await getData()

  return (
    
    <div className="">
      <div className="mb-20">

           <MainNavbar data={data}/>
        </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> 
      hello babul how are you   
      <Link href={"/dashboard/pages/about"}>click her</Link>  
    </div>
    </div>
     
  );
}
