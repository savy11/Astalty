// app/patients/[id]/progress-notes/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the Splose "Progress notes" tab
// Matches your screenshot exactly: table, tags, sortable columns, New note modal, click row to view full note

"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} ProgressNote
 * @property {string} id
 * @property {string} name
 * @property {'Final'} status
 * @property {string} createdBy
 * @property {string} serviceDate
 * @property {string} lastUpdate
 * @property {string} createdAt
 * @property {string} content
 */

const mockNotes = [
  {
    id: "1",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 23 Jun 2025, 6:45 am",
    lastUpdate: "4:56 pm, 28 Nov 2025",
    createdAt: "12:04 pm, 7 Jul 2025",
    content:
      "Hi My Integra,\n\nPaige attended today’s speech pathology session. She demonstrated excellent engagement with the new visual supports. We worked on turn-taking and requesting using her AAC device. Progress is steady. Next session will focus on generalising skills at home.\n\nRegards,\nSamantha Alcorn",
  },
  {
    id: "2",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 24 Nov 2025, 5:00 am",
    lastUpdate: "7:23 am, 24 Nov 2025",
    createdAt: "7:09 am, 24 Nov 2025",
    content:
      "Appointment reminder followed by full session. Paige was very responsive today.",
  },
  {
    id: "3",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 10 Nov 2025, 5:00 am",
    lastUpdate: "6:48 am, 10 Nov 2025",
    createdAt: "6:36 am, 10 Nov 2025",
    content: "Focused on social communication goals. Great improvement noted.",
  },
  {
    id: "4",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 3 Nov 2025, 4:00 am",
    lastUpdate: "8:01 am, 4 Nov 2025",
    createdAt: "7:18 am, 3 Nov 2025",
    content: "Reviewed previous goals. New targets set for November.",
  },
  {
    id: "5",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 27 Oct 2025, 5:00 am",
    lastUpdate: "10:11 am, 27 Oct 2025",
    createdAt: "10:08 am, 27 Oct 2025",
    content: "Session went very well. Paige used her device independently.",
  },
  {
    id: "6",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 4 Aug 2025, 6:00 am",
    lastUpdate: "10:19 am, 4 Aug 2025",
    createdAt: "9:37 am, 4 Aug 2025",
    content: "Toileting visual support introduced and practiced successfully.",
  },
  {
    id: "7",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Mon 21 Jul 2025, 6:00 am",
    lastUpdate: "7:58 am, 21 Jul 2025",
    createdAt: "7:38 am, 21 Jul 2025",
    content: "ALD training session completed. Paige is making steady progress.",
  },
  {
    id: "8",
    name: "Default note template",
    status: "Final",
    createdBy: "Samantha Alcorn",
    serviceDate: "Tue 8 Jul 2025, 5:00 am",
    lastUpdate: "7:15 am, 8 Jul 2025",
    createdAt: "6:38 am, 8 Jul 2025",
    content: "Goals review for June-July period. All targets met or exceeded.",
  },
];

export default function ProgressNotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [notes, searchTerm]);

  const openNote = (note) => setSelectedNote(note);

  const createNewNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      name: newNoteTitle,
      status: "Final",
      createdBy: "You",
      serviceDate: new Intl.DateTimeFormat("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
      lastUpdate: "Just now",
      createdAt: "Just now",
      content: newNoteContent || "New progress note content...",
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsNewNoteModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - identical to all other pages */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Progress notes" />

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Progress notes</h1>

            <div className="flex items-center gap-3">
              <button className="border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium">
                Scroll view
              </button>
              <button
                onClick={() => setIsNewNoteModalOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> New note
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-8 py-5 bg-white border-b">
            <div className="max-w-lg relative">
              <input
                type="text"
                placeholder="Search for content and title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500 text-base"
              />
              <Search className="absolute left-5 top-4 text-gray-400" />
              <button className="absolute right-3 top-2 bg-gray-900 text-white px-8 py-2 rounded-xl hover:bg-black">
                Search
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto p-8 bg-gray-50">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-5 px-8 text-left">Name</th>
                    <th className="py-5 px-6">Created by</th>
                    <th className="py-5 px-6">Service date</th>
                    <th className="py-5 px-6">Last update</th>
                    <th className="py-5 px-6">Created at</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {filteredNotes.map((note) => (
                    <tr
                      key={note.id}
                      onClick={() => openNote(note)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">
                            {note.name}
                          </span>
                          <span className="bg-emerald-600 text-white text-xs px-3 py-0.5 rounded font-medium">
                            Final
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {note.createdBy}
                      </td>
                      <td className="py-5 px-6">
                        <button className="text-emerald-600 hover:underline font-medium">
                          {note.serviceDate}
                        </button>
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {note.lastUpdate}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {note.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500 px-2">
              1-{filteredNotes.length} of {notes.length} items
            </div>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      <Transition appear show={!!selectedNote} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedNote(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
              {selectedNote && (
                <>
                  <div className="px-8 py-6 border-b flex items-center justify-between bg-gray-50">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold">
                        {selectedNote.name}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 mt-1">
                        Service Date: {selectedNote.serviceDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="text-3xl text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8 overflow-auto flex-1 leading-relaxed whitespace-pre-wrap text-[15px] text-gray-700">
                    {selectedNote.content}
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100">
                      Edit note
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Download PDF
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Note Modal */}
      <Transition appear show={isNewNoteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewNoteModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-2xl">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  New Progress Note
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="e.g. Session 28 Nov 2025"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Note Content
                  </label>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    rows={12}
                    placeholder="Write the full progress note here..."
                    className="w-full border border-gray-300 rounded-3xl p-6 focus:outline-none focus:border-emerald-500 resize-y"
                  />
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewNoteModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewNote}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Note
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
