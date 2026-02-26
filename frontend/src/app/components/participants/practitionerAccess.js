// app/patients/[id]/practitioner-access/page.tsx

"use client";

import { MoreHorizontal } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} Practitioner
 * @property {string} id - Unique identifier for the practitioner
 * @property {string} name - Full name of the practitioner
 * @property {boolean} isOwner - Whether this practitioner is the account owner
 * @property {string} roleName - The name of the practitioner's role (e.g. "Receptionist")
 * @property {string} roleType - The type of the practitioner's role (e.g. "Receptionist", "Practitioner admin")
 * @property {string} group - The group the practitioner belongs to (if any)
 * @property {string} status - The access status of the practitioner ("Linked", "Pending", "Revoked")
 */

const mockPractitioners = [
  {
    id: "practitioner_45965",
    name: "Manjinder Rattu",
    isOwner: true,
    roleName: "Receptionist",
    roleType: "Receptionist",
    group: "---",
    status: "Linked",
  },
  {
    id: "practitioner_45970",
    name: "Samantha Alcorn",
    isOwner: false,
    roleName: "Practitioner admin",
    roleType: "Practitioner admin",
    group: "---",
    status: "Linked",
  },
];

export default function PractitionerAccessPage() {
  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* ────────────────────────────────────────────────
          HEADER (same across all participant tabs)
      ──────────────────────────────────────────────── */}
      <Header activeKey="Participants" />

      <ParticipantProfileHeader
        participantName="Paige (Paige) Lu"
        participantId={id}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ────────────────────────────────────────────────
            LEFT SIDEBAR (Participant navigation)
        ──────────────────────────────────────────────── */}
        <ParticipantSidebar
          participantId={id}
          defaultLabel="Practitioner Access"
        />

        {/* ────────────────────────────────────────────────
            MAIN CONTENT AREA
        ──────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-header */}
          <div className="bg-white border-b px-8 py-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              Practitioner access
            </h1>
          </div>

          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-gray-700 text-sm">
              You can link practitioners to participants via creating an
              appointment or support activity in the calendar tab.
              <a
                href="https://support.splose.com/en/articles/4737776-create-an-appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1 font-medium"
              >
                Learn more →
              </a>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50 border-b">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-5 px-8 text-left sticky left-0 bg-gray-50 z-10">
                        Name
                      </th>
                      <th className="py-5 px-6 text-left">Role name</th>
                      <th className="py-5 px-6 text-left">Role type</th>
                      <th className="py-5 px-6 text-left">Group</th>
                      <th className="py-5 px-6 text-left">Status</th>
                      <th className="py-5 px-6 w-20 text-center sticky right-0 bg-gray-50 z-10">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm text-gray-700">
                    {mockPractitioners.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-5 px-8 sticky left-0 bg-white z-10">
                          <div className="flex flex-col">
                            <span className="font-medium">{p.name}</span>
                            {p.isOwner && (
                              <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Account owner
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-6">{p.roleName}</td>
                        <td className="py-5 px-6">{p.roleType}</td>
                        <td className="py-5 px-6 text-gray-500">{p.group}</td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {p.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-center sticky right-0 bg-white z-10">
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
                              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-gray-50 text-gray-900"
                                            : "text-gray-700"
                                        } group flex w-full items-center px-5 py-3 text-sm`}
                                      >
                                        View details
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-gray-50 text-gray-900"
                                            : "text-gray-700"
                                        } group flex w-full items-center px-5 py-3 text-sm`}
                                      >
                                        Revoke access
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="px-8 py-4 border-t flex items-center justify-between text-sm text-gray-500">
                <div>1-2 of 2 items</div>
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
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
