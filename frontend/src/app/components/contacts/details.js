"use client";

import React from "react";
import Link from "next/link";
import { Edit, MoreHorizontal, HelpCircle } from "lucide-react";
import Header from "../header";
import ContactSidebar from "./sidebar";

export default function ContactDetail({ contact }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== Top Header ==================== */}
      <Header activeKey="Contacts" />

      <div className="flex">
        {/* ==================== Sidebar Menu ==================== */}
        
        <ContactSidebar contactId={contact.id} defaultLabel="Details" />

        {/* ==================== Main Content ==================== */}
        <div className="flex-1 p-4">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Details
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <Link href={`/contacts/edit/${contact.id}`}>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                  <Edit className="w-4 h-4" /> Edit
                </button>
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* General Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">General details</h3>
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100">
                  <div className="px-8 py-6 flex">
                    <span className="w-52 text-gray-500 font-medium">Name</span>
                    <span className="flex-1 text-gray-900">{contact.name}</span>
                  </div>
                  <div className="px-8 py-6 flex">
                    <span className="w-52 text-gray-500 font-medium">Type</span>
                    <span className="flex-1 text-gray-900">{contact.type}</span>
                  </div>
                  <div className="px-8 py-6 flex">
                    <span className="w-52 text-gray-500 font-medium">
                      Company
                    </span>
                    <span className="flex-1 text-gray-900">
                      {contact.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-violet-500 to-transparent" />
                <h3 className="text-xl font-semibold">Contact details</h3>
                <div className="h-px flex-1 bg-gradient-to-l from-violet-500 to-transparent" />
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100">
                  <div className="px-8 py-6 flex">
                    <span className="w-52 text-gray-500 font-medium">
                      Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex-1 text-violet-600 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="px-8 py-6 flex">
                    <span className="w-52 text-gray-500 font-medium">
                      Phone
                    </span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 text-gray-900 hover:underline"
                    >
                      {contact.phone} (Mobile)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Associated Participants */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-xl font-semibold">
                  Associated participants
                </h3>
                <HelpCircle className="w-5 h-5 text-gray-400" />
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">
                  No associated participants
                </p>
              </div>
            </div>

            <button className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-2 transition">
              View change log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
