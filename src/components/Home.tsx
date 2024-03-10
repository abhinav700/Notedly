"use client";
import { useState } from "react";
import Link from "next/link";
import Signup from "./Signup";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-black">
            Welcome to Notedly!
          </h1>
          <Signup />
        </div>
      </div>
    </div>
  );
};
Home.displayName = "Home";
export default Home;
