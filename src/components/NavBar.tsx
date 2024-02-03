"use client";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const notIsProfile = pathName != '/profile'
  const notIsHome = pathName != '/'
  const notIsSignin= pathName != '/signin'
  const notIsSignup = pathName != '/signup'

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
    }
  };

    return (
    <nav className="bg-brown-500 p-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Notedly</div>
        {
          <div className="space-x-4">
            {notIsSignup && notIsProfile && notIsHome ? (
              <button className="bg-white text-blue-500 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
                onClick={()=>{router.push('/signup')}}
              >
                Sign Up
              </button>
            ) : null}

            {notIsSignin && notIsProfile ? (
              <button 
                className="bg-white text-blue-500 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
                onClick={()=>{router.push('/signin')}}>
                Sign In
              </button>
            ) : null}

            {notIsHome && notIsSignin && notIsSignup ? (
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

export default NavBar;
