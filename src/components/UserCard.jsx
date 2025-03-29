import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function UserCard({ firstName, lastName, imgUrl,id }) {
      const [loader, setLoader] = useState(false);
      const navigate = useNavigate();
      

    const handelDeletUser=async()=>{
        console.log(id);
        setLoader(true);
       await axios.delete(`https://reqres.in/api/users/${id}}`)
        .then(res => {
          const response = res.data;
          console.log(response);
          if(response === ''){
            toast.success(`${firstName} ID is deleted`)
          }
        })
        .catch(err=>{
          console.log(err)
          toast.error(err)
        })
        setLoader(false);
    }
    
    return (
        <div className="relative flex flex-col  bg-white shadow-sm border border-slate-400 rounded-lg w-60">
            <div className="flex justify-center   m-2 overflow-hidden text-white rounded-md ">
                <img className='rounded-sm' src={imgUrl} alt="card-image" />
            </div>
            <h6 className="mb-1 text-center text-slate-800 text-xl font-semibold">
                {firstName} {lastName}
            </h6>
            <div className="px-4 pb-4 pt-0 mt-2 text-center flex flex-col gap-5">
                <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-slate-700 " type="button" onClick={()=>navigate(`/edit/${id}`)}>
                    Edit User
                </button>
                <button className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-red-600  " type="button" onClick={()=>handelDeletUser(id)}>
                {loader?
                    <span><Loader/></span>:
                   <span className='flex justify-center'>
                       Delete User <MdDelete className='m-1  ' />
                   </span> 
                    }
                </button>
            </div>
        </div>

    )
}

export default UserCard
