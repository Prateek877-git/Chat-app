import { IoSend } from "react-icons/io5";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(state => state.user)

    const handleSendMessage = () => {
        dispatch(sendMessageThunk({
            recieverId : selectedUser?._id,
            message
        }))
        setMessage("")
    }
  return (
    <div className='w-full p-3 flex gap-2'>
                        <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here..." 
                        className="input input-primary w-full" />
                        <button
                        onClick={handleSendMessage}
                         className="btn btn-square btn-primary">
                            <IoSend />
                        </button>
                    </div>
  )
}

export default SendMessage