
import CrudProduct from '@/components/CrudProduct'
import React from 'react'

const page = async() => {
    
  
  return (

    <div>
        <div className='grid justify-center mt-6'>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl 
            font-semibold tracking-tight first:mt-0">
                Product Management (CRUD)
            </h2>
            <CrudProduct/>
        </div>
    </div>

  )
}

export default page