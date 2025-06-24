import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import toast from 'react-hot-toast';


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.user)
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",

  })

  const handleInputChange = (e) => {
    e.preventDefault();

    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
  };

  const handleSignup = async () => {
    if (signupData?.password != signupData?.confirmPassword) {
      return toast.error('password does not match')
    }
    const response = await dispatch(registerUserThunk(signupData))
    console.log(signupData)
    if (response?.payload?.success) {
      navigate("/")
    }
    // setSignupData("")
  }

  useEffect(() => {
    if(isAuthenticated) navigate("/")
  },[isAuthenticated])


  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 border-1 rounded-xl p-6 m-3  max-w-[40rem] w-full'>

        <h2 className='text-2xl font-semibold'>Signup</h2>

        <label className="input w-full">
          <FaUser />
          <input
            onChange={handleInputChange}
            type="text"
            name='username'
            placeholder="Username" />
        </label>
        <label className="input w-full">
          <MdEmail />
          <input
            onChange={handleInputChange}
            type="email"
            name='email'
            placeholder="email" />
        </label>
        <label className="input w-full">
          <FaKey />
          <input
            onChange={handleInputChange}
            type="password"
            name='password'
            placeholder="Password" />
        </label>
        <label className="input w-full">
          <FaKey />
          <input
            onChange={handleInputChange}
            type="password"
            name='confirmPassword'
            placeholder="confirm Password" />
        </label>


        <div className='flex gap-3 border border-[#464e57] rounded-lg py-2 px-2'>
          <label htmlFor='male' className='flex justify-center gap-2 border-none outline-none
        '>
            <input
              id='male'
              type="radio"
              name="gender"
              value='male'
              className="radio radio-primary"
              onChange={handleInputChange}
              defaultChecked />
            male
          </label>

          <label htmlFor='female' className='flex justify-center
        gap-2 border-none outline-none'>
            <input
              id='female'
              type="radio"
              name="gender"
              value='female'
              className="radio radio-primary"
              onChange={handleInputChange} />
            female
          </label>

        </div>


        <button
          onClick={handleSignup}
          className="btn btn-primary">Signup</button>
        <p>Already have an account? <Link to={'/login'}><span className='text-blue-400'>Login</span></Link></p>
      </div>
    </div>
  )
}

export default Signup