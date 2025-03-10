"use client"
import React from 'react';
import { useParams } from 'next/navigation'


 
 

const Page = () => {

    
    //  const id = (await params).id
    const params = useParams()
    let id = params.id
    console.log(id)
    return (
        <div className="mt-40">
            this is the home page
            <br/>id:${id}
        </div>
    );
};

export default Page;