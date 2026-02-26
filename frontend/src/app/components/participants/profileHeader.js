// components/ParticipantProfileHeader.tsx
// Reusable header used across all participant sub-pages (Details, Invoices, Payments, etc.)

"use client";
import { MessageSquare, Mail, ChevronDown } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

/**
 * @typedef {Object} ParticipantProfileHeaderProps
 * @property {string} participantName - The name of the participant to display in the header.
 */


export default function ParticipantProfileHeader({
  participantName = "Paige (Paige) Lu",
}) {
  return (
    <div
      className="bg-white border-b px-4 py-3 md:px-6 md:py-4"
      style={{ borderBottom: "1px solid rgb(232, 232, 232)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Title + Participant Name */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Participant
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-0.5">
              {participantName}
            </p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {/* New SMS */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-gray-600" />
            New SMS
          </button>

          {/* New Email */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-gray-600" />
            New email
          </button>

          {/* Actions Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors">
              Actions
              <ChevronDown className="w-4 h-4" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y divide-gray-100">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700"
                        } group flex w-full items-center px-5 py-3 text-sm font-medium`}
                      >
                        Send reminder
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700"
                        } group flex w-full items-center px-5 py-3 text-sm font-medium`}
                      >
                        Archive participant
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-red-50 text-red-700" : "text-red-600"
                        } group flex w-full items-center px-5 py-3 text-sm font-medium`}
                      >
                        Delete participant
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
