"use client";

import { useState } from "react";
import {
  Plus,
  ChevronDown,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} CaseItem
 * @property {string} id
 * @property {string} caseNumber
 * @property {string} issueDate
 * @property {string} expiryDate
 * @property {string} assignee
 * @property {string} type
 * @property {string} allocated
 * @property {string} invoiced
 * @property {'Open'} status
 */

const initialCases = [
  {
    id: "1",
    caseNumber:
      "Assessment Recommendation Therapy or Training - EC - Speech Pathologist",
    issueDate: "1 Jun 2025",
    expiryDate: "2 Jun 2026",
    assignee: "Samantha Alcorn",
    type: "Budget",
    allocated: "2,658.65 of 8,535.56",
    invoiced: "2,431.69 of 8,535.56",
    status: "Open",
  },
];

export default function ParticipantCasesPage() {
  const [cases, setCases] = useState(initialCases);
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);

  // Simple form state for new case
  const [newCaseData, setNewCaseData] = useState({
    caseNumber: "",
    issueDate: "",
    expiryDate: "",
    assignee: "Samantha Alcorn",
    type: "Budget",
  });

  const sortedCases = [...cases].sort((a, b) => {
    const dateA = new Date(a.issueDate);
    const dateB = new Date(b.issueDate);
    return sortDirection === "desc"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  const createNewCase = () => {
    if (
      !newCaseData.caseNumber ||
      !newCaseData.issueDate ||
      !newCaseData.expiryDate
    )
      return;

    const newCase = {
      id: Date.now().toString(),
      caseNumber: newCaseData.caseNumber,
      issueDate: newCaseData.issueDate,
      expiryDate: newCaseData.expiryDate,
      assignee: newCaseData.assignee,
      type: newCaseData.type,
      allocated: "0.00 of 0.00",
      invoiced: "0.00 of 0.00",
      status: "Open",
    };

    setCases([newCase, ...cases]);
    setNewCaseData({
      caseNumber: "",
      issueDate: "",
      expiryDate: "",
      assignee: "Samantha Alcorn",
      type: "Budget",
    });
    setIsNewCaseModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - identical to previous pages */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Cases" />

        {/* MAIN CASES AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Cases</h1>

            <button
              onClick={() => setIsNewCaseModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New case
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-5 px-8 text-left">Case Number</th>
                    <th
                      onClick={toggleSort}
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    >
                      Issue date
                      <ChevronDown
                        className={`w-4 h-4 transition ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    </th>
                    <th className="py-5 px-6">Expiry date</th>
                    <th className="py-5 px-6">Assignee</th>
                    <th className="py-5 px-6">Type</th>
                    <th className="py-5 px-6">Allocated</th>
                    <th className="py-5 px-6">Invoiced</th>
                    <th className="py-5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {sortedCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="py-5 px-8 font-medium text-gray-900 pr-12">
                        {c.caseNumber}
                      </td>
                      <td className="py-5 px-6 text-gray-600">{c.issueDate}</td>
                      <td className="py-5 px-6 text-gray-600">
                        {c.expiryDate}
                      </td>
                      <td className="py-5 px-6 text-gray-600">{c.assignee}</td>
                      <td className="py-5 px-6 text-gray-600">{c.type}</td>
                      <td className="py-5 px-6 text-gray-600">{c.allocated}</td>
                      <td className="py-5 px-6 text-gray-600">{c.invoiced}</td>
                      <td className="py-5 px-6">
                        <span className="bg-emerald-400 text-white text-xs px-4 py-1 rounded font-medium">
                          Open
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500 px-4">
              1-{sortedCases.length} of {cases.length} items
            </div>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      <Transition appear show={!!selectedCase} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedCase(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden">
              {selectedCase && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50">
                    <Dialog.Title className="text-2xl font-semibold">
                      Case Details
                    </Dialog.Title>
                  </div>

                  <div className="p-8 space-y-8 text-sm">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <div className="text-gray-500 mb-1">Case Number</div>
                        <div className="font-medium">
                          {selectedCase.caseNumber}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Issue Date</div>
                        <div>{selectedCase.issueDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Expiry Date</div>
                        <div>{selectedCase.expiryDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Assignee</div>
                        <div>{selectedCase.assignee}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Type</div>
                        <div>{selectedCase.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Status</div>
                        <span className="bg-emerald-400 text-white text-xs px-4 py-1 rounded font-medium">
                          Open
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 mb-2">Financials</div>
                      <div className="flex gap-12">
                        <div>
                          <div className="text-xs text-gray-500">Allocated</div>
                          <div className="text-xl font-semibold text-emerald-600">
                            {selectedCase.allocated}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Invoiced</div>
                          <div className="text-xl font-semibold text-emerald-600">
                            {selectedCase.invoiced}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Edit Case
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Case Modal */}
      <Transition appear show={isNewCaseModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewCaseModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-lg">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  Create New Case
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Case Number / Title
                  </label>
                  <input
                    type="text"
                    value={newCaseData.caseNumber}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        caseNumber: e.target.value,
                      })
                    }
                    placeholder="Assessment Recommendation Therapy or Training - EC - Speech Pathologist"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={newCaseData.issueDate}
                      onChange={(e) =>
                        setNewCaseData({
                          ...newCaseData,
                          issueDate: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={newCaseData.expiryDate}
                      onChange={(e) =>
                        setNewCaseData({
                          ...newCaseData,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Assignee
                  </label>
                  <select
                    value={newCaseData.assignee}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        assignee: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Samantha Alcorn</option>
                    <option>Manjinder Rattu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={newCaseData.type}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Budget</option>
                    <option>Plan</option>
                    <option>Assessment</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewCaseModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewCase}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Case
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
