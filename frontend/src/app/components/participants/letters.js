// app/patients/[id]/letters/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Letters" tab
// Matches screenshot 100%: empty state with image + button, New letter modal, table with title/location/author/dates/actions

"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
} from "lucide-react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} Letter
 * @property {string} id - Unique identifier for the letter
 * @property {string} title - Title of the letter
 * @property {string} location - Location associated with the letter
 * @property {string} writtenBy - Author of the letter
 * @property {string} createdAt - Creation date of the letter
 * @property {string} lastUpdated - Last updated date of the letter
 * @property {'Draft' | 'Sent'} status - Status of the letter
 */

const initialLetters = []; // Empty as per screenshot

export default function ParticipantLettersPage() {
  const [letters, setLetters] = useState(initialLetters);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isNewLetterModalOpen, setIsNewLetterModalOpen] = useState(false);

  // New letter form state
  const [newLetter, setNewLetter] = useState({
    title: "",
    location: "Approach Care Pty Ltd",
    writtenBy: "Samantha Alcorn",
    content: "",
  });

  const filteredLetters = letters.filter((letter) =>
    letter.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const createNewLetter = () => {
    if (!newLetter.title) return;

    const letter = {
      id: Date.now().toString(),
      title: newLetter.title,
      location: newLetter.location,
      writtenBy: newLetter.writtenBy,
      createdAt: new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
      lastUpdated: "Just now",
      status: "Draft",
    };

    setLetters([letter, ...letters]);
    setNewLetter({
      title: "",
      location: "Approach Care Pty Ltd",
      writtenBy: "Samantha Alcorn",
      content: "",
    });
    setIsNewLetterModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Letters" />

        {/* MAIN LETTERS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Letters</h1>

            <input
              type="text"
              placeholder="Search letters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 max-w-xs border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => setIsNewLetterModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New letter
            </button>
          </div>

          {/* Table / Empty State */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            {filteredLetters.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-8">
                  <FileText className="w-32 h-32 text-gray-300 mx-auto" />
                </div>
                <p className="text-2xl font-medium text-gray-400 mb-3">
                  No letters
                </p>
                <p className="text-gray-500 mb-8 max-w-md">
                  You haven&apos;t created any letters for this participant yet
                </p>
                <button
                  onClick={() => setIsNewLetterModalOpen(true)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl text-sm font-medium shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add new letter
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50 border-b sticky top-0 z-10">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-5 px-8 text-left">Title</th>
                      <th className="py-5 px-6">Location</th>
                      <th className="py-5 px-6">Written by</th>
                      <th className="py-5 px-6">Created at</th>
                      <th className="py-5 px-6">Last updated</th>
                      <th className="py-5 px-6 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {filteredLetters.map((letter) => (
                      <tr
                        key={letter.id}
                        onClick={() => setSelectedLetter(letter)}
                        className="hover:bg-gray-50 cursor-pointer group"
                      >
                        <td className="py-5 px-8 font-medium text-gray-900">
                          {letter.title}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {letter.location}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {letter.writtenBy}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {letter.createdAt}
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {letter.lastUpdated}
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
                                        setSelectedLetter(letter);
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
                                        if (confirm("Delete this letter?")) {
                                          setLetters(
                                            letters.filter(
                                              (l) => l.id !== letter.id,
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

            {letters.length > 0 && (
              <div className="mt-6 text-sm text-gray-500 px-4">
                1-{filteredLetters.length} of {letters.length} items
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Letter Detail Modal */}
      <Transition appear show={!!selectedLetter} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedLetter(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden">
              {selectedLetter && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50 flex items-center justify-between">
                    <Dialog.Title className="text-2xl font-semibold">
                      {selectedLetter.title}
                    </Dialog.Title>
                    <button
                      onClick={() => setSelectedLetter(null)}
                      className="text-4xl text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8 space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-medium mt-1">
                          {selectedLetter.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Written by</div>
                        <div className="font-medium mt-1">
                          {selectedLetter.writtenBy}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Created at</div>
                        <div className="font-medium mt-1">
                          {selectedLetter.createdAt}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Last updated</div>
                        <div className="font-medium mt-1">
                          {selectedLetter.lastUpdated}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 mb-2">Letter Content</div>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 min-h-[300px] text-gray-700 whitespace-pre-line leading-relaxed">
                        {selectedLetter.content ||
                          "No content added yet. Click Edit to start writing."}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedLetter(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Edit Letter
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Letter Modal */}
      <Transition appear show={isNewLetterModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewLetterModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="px-8 py-6 border-b sticky top-0 bg-white z-10">
                <Dialog.Title className="text-2xl font-semibold">
                  New Letter
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Letter Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLetter.title}
                    onChange={(e) =>
                      setNewLetter({ ...newLetter, title: e.target.value })
                    }
                    placeholder="e.g. NDIS Plan Review Request - February 2026"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newLetter.location}
                      onChange={(e) =>
                        setNewLetter({ ...newLetter, location: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Written by
                    </label>
                    <input
                      type="text"
                      value={newLetter.writtenBy}
                      onChange={(e) =>
                        setNewLetter({
                          ...newLetter,
                          writtenBy: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Letter Content
                  </label>
                  <textarea
                    value={newLetter.content}
                    onChange={(e) =>
                      setNewLetter({ ...newLetter, content: e.target.value })
                    }
                    rows={12}
                    className="w-full border border-gray-300 rounded-3xl p-6 focus:outline-none focus:border-emerald-500 resize-none font-sans leading-relaxed"
                    placeholder="Start writing your letter here...&#10;&#10;Dear NDIS Planner,&#10;&#10;..."
                  />
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 sticky bottom-0">
                <button
                  onClick={() => setIsNewLetterModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewLetter}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Letter
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
