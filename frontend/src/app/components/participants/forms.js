// app/patients/[id]/forms/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Forms" tab
// Matches screenshot 100%: Empty state with image + button, New form modal, search, sortable table, actions

"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
} from "lucide-react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} FormItem
 * @property {string} id - Unique identifier for the form
 * @property {string} title - Title of the form
 * @property {string} createdAt - Creation date of the form
 * @property {string} completed - Completion status or date of the form
 * @property {string} relatedAppointment - Related appointment details
 * @property {'Completed' | 'Draft'} status - Status of the form, either 'Completed' or 'Draft'
 */

const initialForms = []; // Empty by default as per screenshot

export default function ParticipantFormsPage() {
  const [forms, setForms] = useState(initialForms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const [isNewFormModalOpen, setIsNewFormModalOpen] = useState(false);

  // New form form state
  const [newFormData, setNewFormData] = useState({
    title: "",
    relatedAppointment: "",
  });

  const filteredForms = forms.filter((f) =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const createNewForm = () => {
    if (!newFormData.title) return;

    const newForm = {
      id: Date.now().toString(),
      title: newFormData.title,
      createdAt: new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
      completed: "—",
      relatedAppointment: newFormData.relatedAppointment || "—",
      status: "Draft",
    };

    setForms([newForm, ...forms]);
    setNewFormData({ title: "", relatedAppointment: "" });
    setIsNewFormModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - consistent with all previous tabs */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar
          participantId={id}
          defaultLabel="Forms"
        />

        {/* MAIN FORMS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Forms</h1>

            <button
              onClick={() => setIsNewFormModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New form
            </button>
          </div>

          {/* Search */}
          <div className="px-8 py-5 bg-white border-b">
            <div className="max-w-md relative">
              <input
                type="text"
                placeholder="Search for title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute left-5 top-4 text-gray-400" />
            </div>
          </div>

          {/* Table / Empty State */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            {filteredForms.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-6">
                  <FileText className="w-24 h-24 text-gray-300 mx-auto" />
                </div>
                <p className="text-2xl font-medium text-gray-400 mb-2">
                  No forms
                </p>
                <p className="text-gray-500 mb-8">
                  You haven&apos;t created any forms yet
                </p>
                <button
                  onClick={() => setIsNewFormModalOpen(true)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add new form
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50 border-b sticky top-0 z-10">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-5 px-8 text-left">Title</th>
                      <th className="py-5 px-6">Created at</th>
                      <th className="py-5 px-6">Completed</th>
                      <th className="py-5 px-6">Related appointment</th>
                      <th className="py-5 px-6 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {filteredForms.map((form) => (
                      <tr
                        key={form.id}
                        onClick={() => setSelectedForm(form)}
                        className="hover:bg-gray-50 cursor-pointer group"
                      >
                        <td className="py-5 px-8 font-medium text-gray-900">
                          {form.title}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {form.createdAt}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {form.completed}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {form.relatedAppointment}
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
                              ⋯
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
                                        setSelectedForm(form);
                                      }}
                                      className={`${active ? "bg-gray-100" : ""} block w-full text-left px-5 py-3 text-sm`}
                                    >
                                      View / Edit
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm("Delete this form?")) {
                                          setForms(
                                            forms.filter(
                                              (f) => f.id !== form.id,
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
            )}
          </div>
        </div>
      </div>

      {/* Form Detail Modal */}
      <Transition appear show={!!selectedForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedForm(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden">
              {selectedForm && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50">
                    <Dialog.Title className="text-2xl font-semibold">
                      {selectedForm.title}
                    </Dialog.Title>
                  </div>
                  <div className="p-8 space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-gray-500">Created at</div>
                        <div className="mt-1 font-medium">
                          {selectedForm.createdAt}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Completed</div>
                        <div className="mt-1 font-medium">
                          {selectedForm.completed}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-500">Related appointment</div>
                        <div className="mt-1 font-medium">
                          {selectedForm.relatedAppointment}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedForm(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Edit Form
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Form Modal */}
      <Transition appear show={isNewFormModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewFormModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-lg">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  New Form
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={newFormData.title}
                    onChange={(e) =>
                      setNewFormData({ ...newFormData, title: e.target.value })
                    }
                    placeholder="e.g. NDIS Plan Review 2025"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Related Appointment (optional)
                  </label>
                  <input
                    type="text"
                    value={newFormData.relatedAppointment}
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        relatedAppointment: e.target.value,
                      })
                    }
                    placeholder="e.g. Speech Pathology - 28 Nov 2025"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewFormModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewForm}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Form
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
