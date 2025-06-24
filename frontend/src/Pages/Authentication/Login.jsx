import React, { useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux'
import {loginUserThunk} from '../../store/slice/user/user.thunk.js'



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state => state.user)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",

  })

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleLogin = async () => {
        toast.success("welcome ");
    const response =  await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/")
    }   
  }

  useEffect(() => {
    if(isAuthenticated){
      navigate("/")
    }
  },[isAuthenticated])

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 border-1 rounded-xl p-6 m-3  max-w-[40rem] w-full'>

        <h2 className='text-2xl font-semibold'>Login</h2>

        <label className="input w-full">
          <MdEmail />
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="email" />
        </label>
        <label className="input w-full">
          <FaKey />
          <input
            type="password"
            name='password'
            onChange={handleInputChange}
            placeholder="Password" />
        </label>

        <button onClick={handleLogin} className="btn btn-primary">Login</button>
        <p>Don't have an account? <Link to={'/register'}><span className='text-blue-400'>Signup</span></Link></p>
      </div>
    </div>
  )
}

export default Login