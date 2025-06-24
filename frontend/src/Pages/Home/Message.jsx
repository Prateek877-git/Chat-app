import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux'

const Message = ({ messageDetails }) => {

    const date = new Date(messageDetails?.updatedAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours} : ${minutes < 10 ? '0' + minutes : minutes}`;

    const {userProfile} = useSelector(state => state.user);
    const {selectedUser} = useSelector(state => state.user)

    const messageRef = useRef(null);

    useEffect(() => {
        if(messageRef.current){
            messageRef.current.scrollIntoView({behavior: "smooth"})
        }
    })

    return (

        <div ref={messageRef} className={`chat ${userProfile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={`${userProfile?._id === messageDetails?.senderId ? userProfile?.avatar : selectedUser?.avatar}`}
                    />
                </div>
            </div>
            <div className="chat-header my-2">
                <time className="text-xs opacity-50">{formattedTime}</time>
            </div>
            <div className="chat-bubble">{messageDetails.message}</div>

        </div>
    )
}

export default Message