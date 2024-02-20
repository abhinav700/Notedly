"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData } from "@/redux/userSlice";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch()
  const isHome = pathName == '/';
  const isSignin= pathName == '/signin';
  const isSignup = pathName == '/signup';
  const isPublic = isHome || isSignin || isSignup;
  
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/users/logout");
      dispatch(setUserData({email:"", username:"", id:''}))
      router.push("/signin");
    } catch (error: any) {
    }
  };

    return (
      
    <nav className="bg-black text-white -500 p-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Notedly</div>
        {
          <div className="space-x-4">
            {!isSignup && isPublic && !isHome ? (
              <button className="bg-white text-blue-500 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
                onClick={()=>{router.push('/signup')}}
              >
                Sign Up
              </button>
            ) : null}

            {!isSignin && isPublic ? (
              <button 
                className="bg-blue-400 text-black-500 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
                onClick={()=>{router.push('/signin')}}>
                Sign In
              </button>
            ) : null}

            {!isPublic ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            ) : null}
          </div>
        }
      </div>
    </nav>
  );
};
NavBar.displayName = "NavBar"
export default NavBar;
