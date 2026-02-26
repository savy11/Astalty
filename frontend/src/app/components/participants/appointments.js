// app/patients/[id]/appointments/page.tsx

"use client";

import { useState } from "react";
import { Plus, ChevronDown, MoreHorizontal } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} Appointment
 * @property {string} id - Unique identifier for the appointment
 * @property {string} date - Date and time of the appointment (e.g. "Mon 24 Nov 2025, 5:00 am")
 * @property {string} location - Location of the appointment
 * @property {string} type - Type of appointment (e.g. "Early Childhood Intervention Professional - Other Early Childhood Professional")
 * @property {string} practitioner - Name of the practitioner (e.g. "Samantha Alcorn")
 * @property {'Paid' | 'Unpaid' | 'Cancelled' | 'Arrived'} invoiceStatus - Status of the invoice
 * @property {boolean} [isCancelled] - Optional flag indicating if the appointment is cancelled
 * @property {string} [statusColor] - Optional CSS class for the status dot color (e.g. "bg-emerald-500")
 */

const mockAppointments = [
  {
    id: "1",
    date: "Mon 24 Nov 2025, 5:00 am",
    location: "432 Baxter-Tooradin Rd, Pearcedale VIC 3912, Australia",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "2",
    date: "Mon 10 Nov 2025, 5:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "3",
    date: "Mon 3 Nov 2025, 4:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "4",
    date: "Mon 27 Oct 2025, 5:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "5",
    date: "Mon 8 Sep 2025, 6:00 am",
    location: "Approach Care Pty Ltd",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Cancelled",
    isCancelled: true,
    statusColor: "bg-orange-500",
  },
    {
    id: "6",
    date: "Mon 24 Nov 2025, 5:00 am",
    location: "432 Baxter-Tooradin Rd, Pearcedale VIC 3912, Australia",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "7",
    date: "Mon 10 Nov 2025, 5:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "8",
    date: "Mon 3 Nov 2025, 4:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "9",
    date: "Mon 27 Oct 2025, 5:00 am",
    location: "79 Hummingbird Dr Botanic Ridge VIC 3977",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    statusColor: "bg-emerald-500",
  },
  {
    id: "10",
    date: "Mon 8 Sep 2025, 6:00 am",
    location: "Approach Care Pty Ltd",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Cancelled",
    isCancelled: true,
    statusColor: "bg-orange-500",
  },
  
  // ... more entries (you can extend the array)
];

export default function ParticipantAppointmentsPage() {
  const [appointments] = useState(mockAppointments);

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* ────────────────────────────────────────────────
          GLOBAL HEADER (same across app)
      ──────────────────────────────────────────────── */}
      <Header activeKey="Participants" />

      <ParticipantProfileHeader
        participantName="Paige (Paige) Lu"
        participantId={id}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ────────────────────────────────────────────────
            SIDEBAR NAVIGATION
        ──────────────────────────────────────────────── */}
        <ParticipantSidebar participantId={id} defaultLabel="Appointments" />

        {/* ────────────────────────────────────────────────
            MAIN CONTENT
        ──────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Appointments</h1>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium">
                Send upcoming appointments
                <ChevronDown className="w-4 h-4" />
              </button>

              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm">
                <Plus className="w-4 h-4" /> New appointment
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50 border-b sticky top-0 z-10">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-5 px-8 text-left">When</th>
                      <th className="py-5 px-6">Where</th>
                      <th className="py-5 px-6">Type</th>
                      <th className="py-5 px-6">Practitioner</th>
                      <th className="py-5 px-6">Invoice status</th>
                      <th className="py-5 px-6 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {appointments.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${app.statusColor || "bg-gray-400"}`}
                            />
                            <span className="font-medium">{app.date}</span>
                            {app.isCancelled && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Cancelled
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-gray-700">
                          {app.location}
                        </td>
                        <td className="py-5 px-6 text-gray-600 line-clamp-2 max-w-xs">
                          {app.type}
                        </td>
                        <td className="py-5 px-6 text-gray-700">
                          {app.practitioner}
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              app.invoiceStatus === "Paid"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.invoiceStatus === "Cancelled"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {app.invoiceStatus}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <Menu.Button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                              <MoreHorizontal className="w-5 h-5" />
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
                              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active ? "bg-gray-50" : ""
                                      } block w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:text-emerald-700`}
                                    >
                                      View details
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active ? "bg-gray-50" : ""
                                      } block w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:text-emerald-700`}
                                    >
                                      Reschedule
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-red-50 text-red-700"
                                          : "text-red-600"
                                      } block w-full text-left px-5 py-2.5 text-sm`}
                                    >
                                      Cancel appointment
                                    </button>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-8 py-4 border-t flex items-center justify-between text-sm text-gray-500">
                <div>1-9 of 9 items</div>
                <div className="flex items-center gap-4">
                  <button disabled className="text-gray-400 cursor-not-allowed">
                    ← Previous
                  </button>
                  <span className="font-medium text-gray-900">1</span>
                  <button disabled className="text-gray-400 cursor-not-allowed">
                    Next →
                  </button>
                  <select
                    defaultValue="10"
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
