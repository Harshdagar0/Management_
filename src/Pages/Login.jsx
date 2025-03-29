import axios from 'axios';
import React, { useState } from 'react'
import { GoKey } from 'react-icons/go';
import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [credentials, setCredentials] = useState({  email: '', password: '' });
   const [passwordVisible, setPasswordVisible] = useState(false);
   const [openEye, setopenEye] = useState(true);
   const [loader, setLoader] = useState(false);
   const navigate = useNavigate();
  
    const handleChange = (e) => {
         setCredentials({ ...credentials, [e.target.name]: e.target.value });
        
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoader(true);
       await axios.post(`https://reqres.in/api/login`,credentials)
        .then(res => {
          const user =  res;
          const token = user.data.token;
          if(token){
              toast.success("Login successful");
              localStorage.setItem('token',JSON.stringify(token));
              setTimeout(() => {
                window.location.reload();
              }, 1000);

              
          }else{
            toast.error('Error')
          }
          
        })
        .catch(err=>{
            console.log(err);
            const error =  err.response.data.error;
            toast.error(error)
        })
        setLoader(false);
    };
    
    const passwordEye = () => {
        if (openEye) {
          setopenEye(false);
          setPasswordVisible(true);
      }
      else {
          setopenEye(true)
          setPasswordVisible(false);
          }
      }
    
    return (
        <div className="mt-20 flex items-center justify-center  bg-white ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg  w-full max-w-sm shadow-2xl mx-3"
            >
                <h2 className="text-2xl font-bold mb-4 text-center"><span className='text-red-500'>Management</span> Login</h2>
            
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <div className='flex border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'>
                        <span>
                            <MdOutlineMailOutline className='mx-2 mt-3' />
                        </span>
    
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            required
                            onChange={handleChange}
                            className="w-full px-1 py-2  focus:outline-none "
                            placeholder="Plexeal@example.com"
                        />
                    </div>
                </div>
              
                <div className="mb-4">
                    <label className="block  text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <div className='flex border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'>
                        <span>
                            <GoKey className='mx-2 mt-3' />
                        </span>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            id='password'
                            required
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-1 py-2  focus:outline-none focus:ring-none"
                            placeholder="Enter your password"
                        />
                        <span className=' hover:cursor-pointer' onClick={passwordEye}>
                            {openEye ?
                                <IoEyeSharp className='m-2 text-xl' /> 
                                :
                                <IoEyeOff className='m-2 text-xl' />
                            }
                        </span>
                    </div>
                </div>
               
                <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-red-500 text-white w-full'>
                    {loader?
                    <span ><Loader/></span>:
                   <span >Login</span> 
                    }
                </button>
                
               
            </form>
        </div>
    )
}

export default Login
