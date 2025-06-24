import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessage } from '../../store/slice/message/message.slice'

const Home = () => {
  const dispatch = useDispatch();

  const { socket } = useSelector(state => state.socket);
  const { userProfile, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(initializeSocket(userProfile?._id))
  }, [isAuthenticated])

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlieUsers) => {
      dispatch(setOnlineUsers(onlieUsers));
    })

    socket.on("newMessage", (newMessage) => {
      console.log(newMessage)
      dispatch(setNewMessage(newMessage))
    })
    return () => {
      socket.close();
    }
  }, [socket])




  return (
    <div className='flex'>
      <UserSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home