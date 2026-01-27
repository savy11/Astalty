"use client";
import { useState } from "react";
import Link from 'next/link';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="md:w-1/2 flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="••••••••"
            required
          />
        </div>

        <Link href="/dashboard">
          <button
          type="loginBtn"
          className="w-full bg-[#000000] hover:bg-blue-700 text-white py-2 rounded-md transition" >
          Login
        </button>
        </Link>
        
        <p className="text-center text-xs text-gray-500">
          By signing up, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>

      </form>

    </div>
  );
}
