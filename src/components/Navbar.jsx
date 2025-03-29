import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { IoIosLogOut } from "react-icons/io";

function Navbar() {

    const handeLogout=()=>{
        localStorage.removeItem('token')
        toast.success('Logout successfully');
        setTimeout(() => {
            window.location.reload();
          }, 1000);
    }

  return (
    <div className='fixed top-0 w-full z-20 py-3 text-white mb-2 bg-slate-700 flex'>
        <ul className='text-center w-full'>
            <li className=''>
                <Link className='' to="/">Home</Link>
            </li>
        </ul>
        <div className='fixed top-2 right-3'>

        <button className=' bg-red-600 py-1 px-2 rounded-lg flex justify-end font-3xl' onClick={handeLogout}>Logout <IoIosLogOut className='m-1' /></button>        
        </div>
      
    </div>
  )
}

export default Navbar
