    
import Image from "next/image";
import Link from "next/link";
 
 
const getData = async(pageName)=>{
  try{
      let res= await fetch(`http://localhost:3000/api/getData/product`, { method: "GET" } ,{cache: 'no-store' })
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
    
    <div className=" border-2 border-gray-200 rounded-lg shadow-lg">    
      
    <div className=" min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]"> 
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">


        {
          
          data.map((value)=>{
            return(
                      <div key={value.id} className="card bg-base-100 w-96 shadow-sm pb -10">  
                            <figure className="px-5 pt-10">
                              <Image
                              width={500}
                              height={500}
                              layout="responsive"
                                src={value.images[0]}
                                alt="Shoes"
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body text-left">
                              <Link key={value.id} href={`/dashboard/pages/details/${value.id}`}><h2 className="card-title underline">{value.name}</h2></Link>
                              <p>{value.price}</p>
                               
                            </div>
                        </div>
            )
          })
        }
        
        
               
        
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className="rounded-xl" />
                    </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
              </div>
        
        </div> 
       
    </div>
    </div>
     
  );
}
