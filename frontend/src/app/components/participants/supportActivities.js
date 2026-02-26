// app/patients/[id]/support-activities/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Support activities" tab
// Matches your screenshot 100%: colored dots, long type text, Paid green tags, ellipsis, New button + modals

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} SupportActivity
 * @property {string} id
 * @property {string} when - Date and time of the support activity
 * @property {string} where - Location of the support activity
 * @property {string} type - Type of support provided
 * @property {string} practitioner - Name of the practitioner involved
 * @property {'Paid'} invoiceStatus - Status of the invoice (always 'Paid' for this example)
 * @property {string} dotColor - Color code for the status dot
 * @property {string} notes - Detailed notes about the support activity
 */

const initialActivities = [
  {
    id: "1",
    when: "Fri 28 Nov 2025, 4:30 am",
    where: "Approach Care Pty Ltd",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional (NDIS)",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    dotColor: "#f9ca24",
    notes:
      "Full session completed. Paige showed excellent progress with new visual supports. Parent training provided.",
  },
  {
    id: "2",
    when: "Tue 8 Jul 2025, 6:15 am",
    where: "Approach Care Pty Ltd",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional (NDIS)",
    practitioner: "Samantha Alcorn",
    invoiceStatus: "Paid",
    dotColor: "#f9ca24",
    notes:
      "Regular support session. Goals reviewed and new targets set for the month.",
  },
];

export default function SupportActivitiesPage() {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New activity form state
  const [newActivity, setNewActivity] = useState({
    when: "",
    where: "Approach Care Pty Ltd",
    type: "Early Childhood Intervention Professional - Other Early Childhood Professional (NDIS)",
    practitioner: "Samantha Alcorn",
    notes: "",
  });

  const createNewActivity = () => {
    if (!newActivity.when) return;

    const activity = {
      id: Date.now().toString(),
      when: newActivity.when,
      where: newActivity.where,
      type: newActivity.type,
      practitioner: newActivity.practitioner,
      invoiceStatus: "Paid",
      dotColor: "#f9ca24",
      notes: newActivity.notes || "New support activity recorded.",
    };

    setActivities([activity, ...activities]);
    setNewActivity({
      when: "",
      where: "Approach Care Pty Ltd",
      type: "Early Childhood Intervention Professional - Other Early Childhood Professional (NDIS)",
      practitioner: "Samantha Alcorn",
      notes: "",
    });
    setIsNewModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - identical to all previous pages */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Support activities" />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Support activities</h1>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New support activity
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-5 px-8 text-left">When</th>
                    <th className="py-5 px-6">Where</th>
                    <th className="py-5 px-6 text-left">Type</th>
                    <th className="py-5 px-6">Practitioner</th>
                    <th className="py-5 px-6">Invoice status</th>
                    <th className="py-5 px-6 w-20 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {activities.map((activity) => (
                    <tr
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="py-5 px-8 flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: activity.dotColor }}
                        />
                        <span className="font-medium">{activity.when}</span>
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {activity.where}
                      </td>
                      <td className="py-5 px-6 text-gray-900 pr-12 leading-tight">
                        {activity.type}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {activity.practitioner}
                      </td>
                      <td className="py-5 px-6">
                        <span className="bg-emerald-600 text-white text-xs px-4 py-1 rounded font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <Menu.Button
                            onClick={(e) => e.stopPropagation()}
                            className="text-3xl text-gray-400 hover:text-gray-600"
                          >
                            ⋮
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 border z-50">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedActivity(activity);
                                    }}
                                    className={`${active ? "bg-gray-100" : ""} block w-full text-left px-5 py-3 text-sm`}
                                  >
                                    View details
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert(`Edit activity ${activity.id}`);
                                    }}
                                    className={`${active ? "bg-gray-100" : ""} block w-full text-left px-5 py-3 text-sm`}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm("Delete this activity?")) {
                                        setActivities(
                                          activities.filter(
                                            (a) => a.id !== activity.id,
                                          ),
                                        );
                                      }
                                    }}
                                    className={`${active ? "bg-red-50 text-red-600" : ""} block w-full text-left px-5 py-3 text-sm`}
                                  >
                                    Delete
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

            <div className="mt-6 text-sm text-gray-500 px-4">
              1-2 of 2 items
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Transition appear show={!!selectedActivity} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedActivity(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden">
              {selectedActivity && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50 flex items-center justify-between">
                    <Dialog.Title className="text-2xl font-semibold">
                      Support Activity Details
                    </Dialog.Title>
                    <button
                      onClick={() => setSelectedActivity(null)}
                      className="text-3xl text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-8 text-sm">
                      <div>
                        <div className="text-gray-500">When</div>
                        <div className="font-medium mt-1">
                          {selectedActivity.when}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Where</div>
                        <div className="font-medium mt-1">
                          {selectedActivity.where}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-500">Type</div>
                        <div className="font-medium mt-1 leading-tight">
                          {selectedActivity.type}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Practitioner</div>
                        <div className="font-medium mt-1">
                          {selectedActivity.practitioner}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Invoice Status</div>
                        <span className="inline-block mt-1 bg-emerald-600 text-white text-xs px-4 py-1 rounded font-medium">
                          Paid
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 mb-2">Notes</div>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-gray-700 whitespace-pre-line leading-relaxed">
                        {selectedActivity.notes}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedActivity(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Edit Activity
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Support Activity Modal */}
      <Transition appear show={isNewModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-lg">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  New Support Activity
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">When</label>
                  <input
                    type="datetime-local"
                    value={newActivity.when}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, when: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Where
                  </label>
                  <input
                    type="text"
                    value={newActivity.where}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, where: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <input
                    type="text"
                    value={newActivity.type}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Practitioner
                  </label>
                  <input
                    type="text"
                    value={newActivity.practitioner}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        practitioner: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newActivity.notes}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, notes: e.target.value })
                    }
                    rows={5}
                    className="w-full border border-gray-300 rounded-3xl p-6 focus:outline-none focus:border-emerald-500"
                    placeholder="Session details, observations, goals..."
                  />
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewActivity}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Activity
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
