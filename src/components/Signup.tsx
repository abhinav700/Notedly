// pages/signup.js

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username : "",
    email : "",
    password :"", 
})

    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup",user);
      if(response.data.error)
        alert(`${response.data.error}`)
      else
        router.push("/login");
    } catch (error) { 
        console.log(error)
    }
    finally{
      setUser({
        username : "",
        email : "",
        password :"", 
    })
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
        setIsButtonDisabled(false);
    else
        setIsButtonDisabled(true);
  })
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-black text-2xl mb-4 font-bold">Create an account</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
            required
            value = {user.username}
            onChange={(e) => {setUser({...user,username: e.target.value})}}
          />    
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
            required
            value = {user.email}
            onChange={(e) => {setUser({...user,email: e.target.value})}}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 border text-black border-gray-300 rounded w-full text-black"
            required
            value = {user.password}
            onChange={(e) => {setUser({...user,password: e.target.value})}}
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:cursor-pointer ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={isButtonDisabled}
          
        >
        {loading?"processing":"SignUp"}
        </button>
      <p className="mt-2 stext-center text-black">
            {"Already registered? "}
            <Link href={'/login'}>
              <span className="text-blue-500 hover:underline">
                {'Login here'}
              </span>
            </Link>
          </p>
      </form>
    </div>
  );
};

export default Signup;
