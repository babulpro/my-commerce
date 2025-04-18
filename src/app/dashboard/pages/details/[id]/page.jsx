"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
 

const ProductPage = ({ params }) => {
  const searchParams = useSearchParams() 
  const search = searchParams.get('type')
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allData,setAllData]=useState(null)
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let {id} =await params;
        const res = await fetch(
          `http://localhost:3000/api/getData/productDetails?id=${id}`,
          { method: "GET", cache: "force-cache" }
        );
        const product =await fetch(`http://localhost:3000/api/getData/product`, { method: "GET" } ,{cache: 'no-store' })
        const result = await res.json();
        const productRes = await product.json()
        setData(result.data);
        setAllData(productRes.data)
        setSelectedImage(result.data?.images?.[0]); // Set first image as default
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

  
      fetchData();
    
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading product details...</p>;
  }

  if (!data) {
    return <p className="text-center text-lg text-red-500">Product not found!</p>;
  }


  const addToCart = async () => {
    try {
      const res = await fetch("/api/getData/addCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: data.id,
        }),
      });
  
      const result = await res.json();
      if (res.ok) {
        alert("Product added to cart!");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const filterData = allData.filter((value,index)=>value.keywords==search)
  
  return (
    <div>
    <div className="min-h-screen md:px-5 pb-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg md:flex gap-8 w-full max-w-3xl">
        {/* Image Section */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="mb-4 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={data.name}
                width={400}
                height={400}
                className="rounded-xl"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {data.images.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)}>
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className={`rounded-lg border-2 cursor-pointer ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2 underline text-black">{data.name}</h1>
          <p className="text-xl text-green-600 font-semibold mb-2">
            Price: ${data.price}
          </p>
          <p className="text-gray-700 mb-4">{data.description}</p>
          <button onClick={addToCart} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            ADD TO CART
          </button>
        </div>
      </div>
      
    </div>
    <div className="mt-10 text-2xl">
          <div className=" border-2 border-gray-200 rounded-lg shadow-lg">    
              
            <div className=" min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]"> 
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        
        
                {
                  
                  filterData.map((value)=>{
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
                
                
                       
                  
                
                </div> 
               
            </div>
            </div>
      </div>
    </div>
  );
};

export default ProductPage;
