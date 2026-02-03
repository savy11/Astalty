"use client";

import { useState, useRef, useEffect } from "react";
import { BiUser, BiLogOut, BiCog, BiConversation, BiNotification } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
  router.push("/login"); // or "/" or "/logout"
  };  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 ring-gray-300 transition"
      >
        <BiUser className="w-5 h-5 text-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-20 border border-gray-100">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-800">Shubham Kumar</p>
            <p className="text-xs text-gray-500">shubham@gmail.com</p>
          </div>
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <BiNotification className="w-4 h-4" /> Notifications
              </a>
            </li>
            <li>
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <BiConversation className="w-4 h-4" /> Conversations
              </a>
            </li>
            <li>
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <BiCog className="w-4 h-4" /> Settings
              </a>
            </li>
            <li>
              <button 
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100">
                <BiLogOut className="w-4 h-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
