import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteLoaderData } from 'react-router-dom';
import { setSelectedUser } from '../../store/slice/user/user.slice';


const User = ({ userDetails }) => {
    const dispatch = useDispatch();

    const { selectedUser } = useSelector(state => state.user);
    const { onlineUsers } = useSelector(state => state.socket);

    const isUserOnline = onlineUsers?.includes(userDetails?._id);

    const handleUserClick = () => {
        dispatch(setSelectedUser(userDetails))

    }
    return (
        <div
            onClick={handleUserClick}
            className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg p-2 cursor-pointer ${userDetails?._id === selectedUser?._id && 'bg-gray-500'}`}>

            <div className={`avatar ${isUserOnline ? "avatar-online" : "avatar-offline"} `}>
                <div className="w-12 rounded-full">
                    <img src={userDetails?.avatar} />
                </div>

            </div>
            <div>
                <h2 className='line-clamp-1'>{userDetails?.username}</h2>

            </div>

        </div>
    )
}

export default User