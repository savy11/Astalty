// components/Header/Header.jsx
// Reusable Header component for Next.js.
// Usage: Import and render <Header menuItems={[]} activeKey="Dashboard" logoSrc="/assets/logo-white.png" /> on any page.
// Props: menuItems (array, required), activeKey (string, for highlighting), logoSrc (string), logoAlt (string), logoWidth (number), logoHeight (number), showUserDropdown (bool).
// Assumptions: UserDropdown and MultiDropdown components exist in ../userDropdown and ../multiDropdown.
// For mobile, toggles a dropdown menu.

"use client";

import { useState } from "react";
import Image from "next/image"; // Added missing import
import UserDropdown from "./userDropdown";
import MultiDropdown from "./multiDropdown";
import {
  BiSolidDashboard,
  BiCalendar,
  BiUserPin,
  BiUser,
  BiAlarm,
  BiWalletAlt,
  BiMoney,
  BiFile,
  BiBasket,
  BiMenu,
  BiX,
} from "react-icons/bi";

function Header({
  menuItems = [
    { key: "Dashboard", label: "Dashboard", icon: BiSolidDashboard, hasActive: false, hasDropdown: false },
    { key: "Calendar", label: "Calendar", icon: BiCalendar, hasActive: false, hasDropdown: false },
    { key: "Participants", label: "Participants", icon: BiUserPin, hasActive: false, hasDropdown: false },
    { key: "Contacts", label: "Contacts", icon: BiUser, hasActive: false, hasDropdown: false },
    { key: "Waitlist", label: "Waitlist", icon: BiAlarm, hasActive: false, hasDropdown: false },
    { key: "Invoices", label: "Invoices", icon: BiWalletAlt, hasActive: false, hasDropdown: false },
    { key: "Payments", label: "Payments", icon: BiMoney, hasActive: false, hasDropdown: false },
    { key: "Reports", label: "Reports", icon: BiFile, hasActive: false, hasDropdown: false },
    { key: "Products", label: "Products", icon: BiBasket, hasActive: false, hasDropdown: false },
    /* Add dropdown example:
    {
      key: "Tasks",
      label: "Tasks",
      icon: SomeIcon,
      hasActive: false,
      hasDropdown: true,
      dropdownItems: [{ label: "Test 1" }, { label: "Test 2" }],
    },
    */
  ],
  activeKey = "Dashboard", // Prop to set active item
  logoSrc = "/assets/logo.png",
  logoAlt = "Lifegroup Logo",
  logoWidth = 120,
  logoHeight = 40,
  showUserDropdown = true, // Toggle user dropdown
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Compute active state based on activeKey prop
  const computedMenuItems = menuItems.map((item) => ({
    ...item,
    hasActive: item.key === activeKey,
  }));

  return (
    <div>
      <div className="flex">
        {/* Header */}
        <div className="text-[#232323] flex justify-between items-center w-full p-4 shadow-[2px_2px_2px_rgba(0,0,0,0.1)] relative">
          <div className="font-bold flex items-center">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
            />
          </div>

          <nav className="hidden lg:flex">
            {computedMenuItems.map((item, idx) => (
              <div key={idx}>
                {item.hasDropdown ? (
                  <MultiDropdown
                    dropdownTitle={item.label}
                    dropdownMenuItems={item.dropdownItems}
                  />
                ) : (
                  <a
                    href={` /${item.key.toLowerCase()}`} // Dynamic href based on key; customize as needed (e.g., to router.push)
                    className={`flex items-center space-x-2 xl:px-4 px-2 py-2 mr-1 rounded transition-all ease-linear xl:text-base text-sm ${
                      item.hasActive ? "bg-purple-500 text-white hover:bg-purple-900" : "hover:bg-[#f2f2f2]"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="flex">
            {/* Mobile toggle (hidden on lg+) */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden flex lg:items-center mr-2 p-2 rounded-full bg-gray-200 hover:ring-2 ring-gray-300 transition"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <BiX className="w-6 h-6" />
              ) : (
                <BiMenu className="w-6 h-6" />
              )}
            </button>
            {showUserDropdown && <UserDropdown />}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-[64px] left-0 right-0 bg-white shadow-md z-50">
            <nav className="flex flex-col">
              {computedMenuItems.map((item, idx) => (
                <div key={idx} className="border-b last:border-b-0">
                  {item.hasDropdown ? (
                    <div className="px-4 py-3 text-sm font-medium">
                      {item.label} {/* Placeholder; extend MultiDropdown for mobile if needed */}
                    </div>
                  ) : (
                    <a
                      href={`#${item.key.toLowerCase()}`}
                      className={`flex items-center px-4 py-3 text-sm space-x-2 hover:bg-[#f8f8f8] ${
                        item.hasActive ? "bg-purple-500 text-white" : ""
                      }`}
                      onClick={() => setShowMobileMenu(false)} // Close on click
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;