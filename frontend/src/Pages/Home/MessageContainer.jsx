import React, { useEffect } from 'react'

import User from './User'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './sendMessage';

const MessageContainer = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(state => state.user);
    const { messages } = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getMessageThunk({ recieverId: selectedUser?._id }))
    }, [selectedUser])
    return (
        <>
            {!selectedUser ? (
                <div>select a user</div>
            ) : (
                <div className='w-full h-screen flex flex-col justify-between'>

                    <div className=' p-3 border-b border-b-white/10'>
                        <User userDetails={selectedUser} />
                    </div>

                    <div className='h-full overflow-y-auto p-3'>
                        {
                            (!messages) ? (
                                <div className='h-full w-full flex items-center justify-center'>
                                    <div className=' bg-gradient-to-r from-blue-500 to-35%  to-green-600 inline-block text-transparent bg-clip-text text-2xl '>No conversation yet, start one </div>
                                </div>

                            ) : (
                                messages.map((messageDetails => {
                                    return (

                                        <Message key={messageDetails._id} messageDetails={messageDetails} />
                                    )
                                }
                                ))
                            )


                        }
                    </div>
                    <SendMessage />


                </div>)}
        </>
    )
}

export default MessageContainer