import React, { useEffect, useState } from 'react';
import axios from 'axios'
import UserCard from '../components/UserCard';
import { toast } from 'react-toastify';
function AllUser() {
    const [allUser, setAllUser] = useState([]);
    const [User, setUser] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const random = [1, 2, 3, 4, 5, 6, 7, 8];
    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${currPage}`)
            .then(res => {
                const persons = res.data;
                setAllUser(persons.data);
                setUser(true);
            })
            .catch(err => {
                console.log(err)
                toast.error(err)
            })
    }, [currPage])

    const handelNextPageNO = () => {
        if (currPage === 2) {
            toast.error("No more pages ");
        }
        else { setCurrPage(currPage + 1) }

    }
    const handelPrePageNO = () => {
        if (currPage === 1) {
            toast.error("No more pages ");
        }
        else { setCurrPage(currPage - 1) }

    }
    const [search, setsearch] = useState("");
    const handelsearch = (e) => {
        setsearch(e.target.value)
    };
    let data = [];
    if (search) {
        data = allUser.filter((item) => item.first_name.toLowerCase().includes(search.toLowerCase()));
    }
  

    return (
        <div className='mt-20'>
            <div className="col-lg-3 flex mt-4 ps-5 justify-center gap-3">
                <form className='my-2 flex justify-center gap-3'>
                    <input className='border border-black p-1' type="text" name="search" placeholder="Search First Name" onChange={handelsearch}></input>
                <button
                    type="reset"
                    className="bg-red-700 text-white rounded-md h-7  px-3"
                    onClick={() => setsearch("")}
                    >
                    Clear
                </button>
                    </form>
            </div>


            {User ?
                <div>
                    {User && (search ? data : allUser)?.length > 0 ? (


                        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 justify-items-center pb-40 '>
                            {(search ? data : allUser).map((item, index) => (
                                <div key={index}>
                                    <UserCard firstName={item.first_name} lastName={item.last_name} imgUrl={item.avatar} id={item.id} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center mt-10 text-3xl font-semibold'>No users found.</p>
                    )}

                </div>


                :



                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 justify-items-center pb-40 '>
                    {random.map((index) => (
                        <div key={index} className="relative flex flex-col animate-pulse  bg-white shadow-sm border border-slate-400 rounded-lg w-60">
                            <div className="flex justify-center flex-col m-2 overflow-hidden text-white rounded-md ">
                                <span className='rounded-sm w-32 h-32 ms-10 bg-gray-200' ></span>
                                <div className='gap-3 mt-5 flex flex-col'>
                                    <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
                                    <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
                                    <button type='submit' className=' m-auto py-1 px-2 rounded-lg bg-gray-200 h-7 text-white w-full'></button>
                                </div>
                            </div>


                        </div>
                    ))
                    }
                </div>

            }
            <div className='fixed bottom-0 flex z-10  justify-center  my-2 w-full rounded-full bg-slate-700 py-3 gap-4 border'>
                <div>
                    <button className=' py-1 px-2 text-white bg-black rounded-lg' onClick={handelPrePageNO}>Previous Page</button>
                </div>
                <div>
                    <div className='flex gap-2'>
                        <button className={`py-1 rounded-lg px-2 ${currPage === 1 ? 'text-black bg-white' : '  text-white bg-black '}`} onClick={() => setCurrPage(1)}>1</button>
                        <button className={`py-1 rounded-lg px-2 ${currPage === 2 ? 'text-black bg-white' : '  text-white bg-black '}`} onClick={() => setCurrPage(2)}>2</button>
                    </div>
                </div>
                <div className=''>
                    <button className=' py-1 px-2 text-white bg-black rounded-lg' onClick={handelNextPageNO}>Next Page</button>
                </div>
            </div>

        </div>

    )
}
export default AllUser
