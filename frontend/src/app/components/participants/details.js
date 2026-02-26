// app/patients/[id]/details/page.tsx
// Fully functional "Details" tab for participant profile
// Matches your screenshot: avatar, general info, contact, privacy, meds/allergies, NDIS, emergency contact, invoicing, associated contacts table, tags & Xero card

"use client";

import Link from "next/link";
import { DollarSign, Edit, Plus, ExternalLink } from "lucide-react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

export default function ParticipantDetailsPage() {
  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* Global Header - same as previous tabs */}
      <Header activeKey="Participants" />

      <ParticipantProfileHeader
        participantName="Paige (Paige) Lu"
        participantId={id}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ParticipantSidebar participantId={id} defaultLabel="Details" />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Participant Header */}
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Details</h1>
            </div>
            <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium">
              <Edit className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* General Details */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  General details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold">
                    PL
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Ms Paige (Paige) Lu</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500">
                      Date of birth
                    </label>
                    <p className="mt-1 font-medium">
                      29 Dec 2021 (4 years 1 months old)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Sex</label>
                    <p className="mt-1 font-medium">Female</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  Participant contact details
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500">Email</label>
                    <a
                      href="mailto:paulabiancalu@gmail.com"
                      className="mt-1 text-emerald-600 hover:underline font-medium"
                    >
                      paulabiancalu@gmail.com
                    </a>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      Phone numbers
                    </label>
                    <p className="mt-1 font-medium">+61 0416091953 (Mobile)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Preference
                  </label>
                  <p className="mt-1 font-medium">Email</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">Address</label>
                  <p className="mt-1 font-medium whitespace-pre-line">
                    79 Hummingbird Dr
                    <br />
                    Botanic Ridge VIC 3977
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Timezone
                  </label>
                  <p className="mt-1 font-medium">GMT+11 - Australia/Sydney</p>
                </div>
              </div>
            </section>

            {/* Privacy Consent */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  Privacy policy consent
                </h2>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  Accepted
                </div>
              </div>
            </section>

            {/* Medications, Allergies & Intolerances */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  Medications, allergies & intolerances
                </h2>
              </div>
              <div className="p-6 space-y-5">
                {["Medications", "Allergies", "Intolerances"].map((label) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <span className="text-gray-700 font-medium">{label}</span>
                    <span className="text-gray-500">None</span>
                  </div>
                ))}
              </div>
            </section>

            {/* NDIS Details */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  NDIS details
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">
                    NDIS number
                  </label>
                  <p className="mt-1 font-medium">531841270</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Plan start date
                  </label>
                  <p className="mt-1 font-medium">19 Mar 2025</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Plan end date
                  </label>
                  <p className="mt-1 font-medium">18 Mar 2026</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Fund management
                  </label>
                  <p className="mt-1 font-medium">Plan-managed</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Plan nominee
                  </label>
                  <p className="mt-1 font-medium">Paula Bianca Lu</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Mobile number
                  </label>
                  <p className="mt-1 font-medium">+61 0416091953</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Nominee email
                  </label>
                  <a
                    href="mailto:paulabiancalu@gmail.com"
                    className="mt-1 text-emerald-600 hover:underline"
                  >
                    paulabiancalu@gmail.com
                  </a>
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  Emergency contact
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm text-gray-500">
                    Full name
                  </label>
                  <p className="mt-1 font-medium">Paula Bianca Lu</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Relationship
                  </label>
                  <p className="mt-1 font-medium">Mother</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Phone number
                  </label>
                  <p className="mt-1 font-medium">0416091953</p>
                </div>
              </div>
            </section>

            {/* Invoicing */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  Invoicing
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm text-gray-500">
                    Send invoices to
                  </label>
                  <Link
                    href="/contacts/1021432/view"
                    className="mt-1 text-emerald-600 hover:underline font-medium"
                  >
                    My Integra
                  </Link>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Invoice reminder preference
                  </label>
                  <p className="mt-1 font-medium">On</p>
                </div>
              </div>
            </section>

            {/* Associated Contacts Table */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Associated contacts
                </h2>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add contact
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-4 px-6 text-left">Name</th>
                      <th className="py-4 px-6 text-left">Type</th>
                      <th className="py-4 px-6 text-left">Notes</th>
                      <th className="py-4 px-6 text-center">Appts</th>
                      <th className="py-4 px-6 text-center">Invoices</th>
                      <th className="py-4 px-6 text-center">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Link
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Jessica Burke
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-gray-700">Teacher</td>
                      <td className="py-4 px-6 text-gray-500">N/A</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Link
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          Michelle
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-gray-700">Teacher</td>
                      <td className="py-4 px-6 text-gray-500">N/A</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                      <td className="py-4 px-6 text-center text-gray-500">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sidebar-like Cards (Account balance, tags, Xero) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Account Balance */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Account balance</h3>
                    <DollarSign className="w-6 h-6 opacity-80" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm opacity-90">
                      <span>Nothing owed</span>
                      <span className="font-medium">—</span>
                    </div>
                    <div className="flex justify-between text-sm opacity-90 border-t border-indigo-400 pt-3">
                      <span>Available credit balance</span>
                      <span className="font-medium">0.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participant Tags */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Participant tags
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Plan-managed
                    </span>
                  </div>
                </div>
              </div>

              {/* Xero Integration */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Xero</h3>
                </div>
                <div className="p-6">
                  <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                    <ExternalLink className="w-4 h-4" />
                    Open in Xero
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
