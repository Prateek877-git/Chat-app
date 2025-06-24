import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import User from './User'
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, logoutUserThunk } from '../../store/slice/user/user.thunk';
import { setOnlineUsers } from '../../store/slice/socket/socket.slice.js';

const UserSidebar = () => {

    const dispatch = useDispatch();
    const[searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState([]);

    const { userProfile, otherUsers } = useSelector(state => state.user);
    

    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
       
    }

    useEffect(() => {
        (async () => {
            dispatch(getOtherUserThunk());
        })()
    }, [])

    useEffect(() => {
        if(!searchValue){
            setUsers(otherUsers);
        } else { 
            setUsers(otherUsers.filter((user) => {
                return (
                    user.username.toLowerCase().includes(searchValue.toLowerCase())
                )
            }))
        }
    })


    return (
        <div className='max-w-[20rem] w-full h-screen flex flex-col justify-between  border border-white/10 '>

            <h1 className='bg-gradient-to-r from-blue-500 to-75%  to-green-600 inline-block text-transparent bg-clip-text text-3xl m-1 text-center'> LET'S CHAT</h1>

            <div className='p-3'>
                <label className="input">
                    <IoMdSearch />
                    <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="search" className="grow" placeholder="Search" />
                </label>
            </div>

            <div className='h-full overflow-y-auto px-3 flex flex-col gap-4 m-3 '>
                {
                    users ? ( users.map((userDetails) => {
                        return (
                            <User key={userDetails?._id} userDetails={userDetails} />
                        )
                    }) ) : (
                        <div>unable to fetch users</div>
                    )
                }

            </div>

            <div className=' flex items-center justify-between p-3 '>
                <div className='flex items-center gap-3'>
                 <div className="avatar ">
                    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                        <img src={userProfile?.avatar} />
                    </div>
                </div>
                <h2 className='text-xl'>{userProfile?.username}</h2>
                </div>
               
                <button
                    onClick={handleLogout}
                    
                    className="btn btn-primary btn-sm px-4">
                    logout
                </button>
            </div>
        </div>
    )
}

export default UserSidebar