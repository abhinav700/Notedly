"use client"
import { useAppDispatch } from '@/redux/hooks';
import User from '@/models/userModel';
import { setUserData } from '@/redux/userSlice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter()

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0)
        setButtonDisabled(false);
      else
        setButtonDisabled(true);
  }, [user])
  

  const handleChange = (e :any)=>{
    setUser({...user, [e.target.name] : e.target.value})
  }
  
  const handleLogin:any =async (e:any) =>{
    e.preventDefault();
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const fetchedUser = await response.data.user;
      dispatch(setUserData(fetchedUser));
      router.push(`/notes`);
    }
    catch(error:any){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-black text-2xl font-semibold mb-4">Login</h2>
        <form method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 py-2 mt-1 text-black"
              placeholder="Enter your email"
              onChange = {handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 py-2 mt-1 text-black"
              placeholder="Enter your password"
              onChange = {handleChange}
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className={`w-full px-4 py-2 focus:outline-none ${
              buttonDisabled
                ? 'bg-blue-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:shadow-outline-blue'
            }`}
            disabled={buttonDisabled}
          >
            {loading ? "Processing": "Login" }
          </button>
        </form>
        <p className="text-center text-black mt-2">
            {"Don't have an account?  "}
            <Link href={'/signup'}>
              <span className="text-blue-500 hover:underline">
                {'SignUp here'}
              </span>
            </Link>
          </p>
      </div>
    </div>
  );
};

export default SigninPage;
