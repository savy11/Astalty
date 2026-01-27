"use client";
import { FaCheck } from "react-icons/fa";
import { HiChevronRight } from 'react-icons/hi';

export default function LeftSection() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-[#DE8776]">
      <div className="h-[800px] flex justify-center space-x-8 text-white font-medium">
      <div className="heroContent">
       <div className="flex items-center gap-4">
        <div className="breadcrumb">
          <button className="text-blue-500 border border-blue-400/30 rounded-full px-4 py-2 hover:bg-blue-500/10">
            What&apos;s new
          </button>
        </div>

        <div className="flex items-center px-4 py-3 text-white hover:bg-blue-900 
          cursor-pointer rounded-md justify-start gap-2">
          <span className="text-sm font-medium">Forms, Incidents & Referrals</span>
          <HiChevronRight className="text-gray-400 text-xl" />
        </div>
      </div>

        <h1>Simplify your NDIS business operations</h1>

        <p className="subtext">
          Ready to take your NDIS business to the next level? Try Astalty, the
          most straightforward NDIS software with the most advanced features.
        </p>

        <ul className="features">
          <li><FaCheck /> Developed by NDIS experts</li>
          <li><FaCheck /> Free onboarding and training</li>
          <li><FaCheck /> Data import to get started quickly</li>
        </ul>

        <div className="heroButtons">
          <button className="primaryBtn">Start free trial</button>
          <button className="linkBtn">Book a demo →</button>
        </div>

        <small className="note">14-day free trial. No credit card required.</small>
      </div>
    </div>
    </div>

    
  );
}
