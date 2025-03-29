import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from "react-router"
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


function EditUser() {
  let id = useParams().id;
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(res => {
        const persons = res.data;
        setUser(persons.data);


      })
      .catch(err => {
        console.log(err)
        if(err.response.request.status===404){
          console.log('nhi mila');
          toast.error('Id not found')
          navigate('/');
        }
        toast.error(err)
      })
  }, [id]);

  const handeSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    await axios.put(`https://reqres.in/api/users/${id}`, user)
      .then(res => {
        const update = res.data.updatedAt;
        if (update) {
          toast.success('update Successfully');
          navigate('/');

        }
        console.log(update);

      })
      .catch(err => {
        console.log(err)
        toast.error(err)
      });
    setLoader(false);

  }


  return (
    <div className='mt-20 flex justify-center'>
      {user ?
        <div className='xl:w-1/3 sm:w-1/2 w-full mx-10 border px-6 py-10 shadow-lg'>
          <div className='flex  justify-center'>
            <img className=' rounded-full w-40' src={user.avatar} alt='img' />
          </div>
          <form onSubmit={handeSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className='flex border border-black rounded-sm focus:outline-none '>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-2  focus:outline-none "
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <div className='flex border border-black rounded-sm focus:outline-none '>
                <input
                  type="firstName"
                  name="first_name"
                  value={user.first_name}
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-2  focus:outline-none "
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <div className='flex border border-black rounded-sm  focus:outline-none '>
                <input
                  type="lastName"
                  name="last_name"
                  value={user.last_name}
                  required
                  onChange={handleChange}
                  className="w-full px-1 py-2  focus:outline-none "
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-slate-600 text-white w-full'>
                {loader ?
                  <span  ><Loader /></span> :
                  <span >Edit User</span>
                }
              </button>
            </div>


          </form>

        </div> :
        <div className='xl:w-1/3 sm:w-1/2 w-full mx-10 border px-6 py-10 shadow-lg animate-pulse'>
          <div className='flex justify-center'>
            {/* <img className=' rounded-full w-40 ' src={profile} alt='img'/> */}
            <div className='bg-gray-200 w-30 h-30 relative rounded-full'></div>
            <span className='w-32 h-32 border rounded-full bg-gray-300'></span>
          </div>



          <div className='gap-3 mt-5 flex flex-col'>
            <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
            <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
            <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
            <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
          </div>




        </div>}

    </div >
  )
}

export default EditUser
