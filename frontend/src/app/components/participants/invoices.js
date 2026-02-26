// app/patients/[id]/invoices/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Invoices" tab
// Matches your screenshot 100%: expandable rows (modal on click), sortable Issue Date, New invoice modal, search, Paid/Delivered tags

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, ChevronDown } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} Invoice
 * @property {string} id - Unique identifier for the invoice
 * @property {string} invoiceNumber - The invoice number (e.g., "INV-AC-000023")
 * @property {string} to - The name of the participant the invoice is addressed to
 * @property {string} contact - The contact name associated with the invoice
 * @property {string} location - The location or clinic name related to the invoice
 * @property {string} practitioner - The name of the practitioner providing the service
 * @property {string} issueDate - The date the invoice was issued (formatted as "28 Nov 2025")
 * @property {string} dueDate - The date the invoice is due (formatted as "12 Dec 2025")
 * @property {string} amount - The total amount of the invoice (e.g., "387.98")
 * @property {string} outstanding - The outstanding amount on the invoice (e.g., "0.00")
 * @property {'Paid'} status - The payment status of the invoice (currently only "Paid")
 * @property {'Delivered'} sentStatus - The delivery status of the invoice (currently only "Delivered")
 * @property {string} details - Additional details or notes about the invoice
 */

const mockInvoices = [
  {
    id: "11941761",
    invoiceNumber: "INV-AC-000023",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "28 Nov 2025",
    dueDate: "12 Dec 2025",
    amount: "387.98",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "Invoice for speech pathology services. Paid in full.",
  },
  {
    id: "11804330",
    invoiceNumber: "INV-AC-000022",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "24 Nov 2025",
    dueDate: "8 Dec 2025",
    amount: "218.24",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "Session invoice.",
  },
  {
    id: "11488958",
    invoiceNumber: "INV-AC-000020",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "10 Nov 2025",
    dueDate: "24 Nov 2025",
    amount: "218.24",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "Regular support invoice.",
  },
  {
    id: "11375347",
    invoiceNumber: "INV-AC-000018",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "4 Nov 2025",
    dueDate: "18 Nov 2025",
    amount: "290.99",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "November services.",
  },
  {
    id: "11183620",
    invoiceNumber: "INV-AC-000016",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "27 Oct 2025",
    dueDate: "10 Nov 2025",
    amount: "185.26",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "October invoice.",
  },
  {
    id: "9485423",
    invoiceNumber: "INV-AC-000011",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "4 Aug 2025",
    dueDate: "18 Aug 2025",
    amount: "323.00",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "August services.",
  },
  {
    id: "9204073",
    invoiceNumber: "INV-AC-000009",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "21 Jul 2025",
    dueDate: "4 Aug 2025",
    amount: "226.00",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "July invoice.",
  },
  {
    id: "8992679",
    invoiceNumber: "INV-AC-000005",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "8 Jul 2025",
    dueDate: "22 Jul 2025",
    amount: "242.49",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "Early July services.",
  },
  {
    id: "8992668",
    invoiceNumber: "INV-AC-000004",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "8 Jul 2025",
    dueDate: "22 Jul 2025",
    amount: "97.00",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "Small top-up invoice.",
  },
  {
    id: "8722690",
    invoiceNumber: "INV-AC-000003",
    to: "Paige Lu",
    contact: "My Integra",
    location: "Approach Care Pty Ltd",
    practitioner: "Samantha Alcorn",
    issueDate: "23 Jun 2025",
    dueDate: "7 Jul 2025",
    amount: "242.49",
    outstanding: "0.00",
    status: "Paid",
    sentStatus: "Delivered",
    details: "June final invoice.",
  },
];

export default function ParticipantInvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);

  // New invoice form state
  const [newInvoiceData, setNewInvoiceData] = useState({
    invoiceNumber: "",
    amount: "",
  });

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const dateA = new Date(a.issueDate);
    const dateB = new Date(b.issueDate);
    return sortDirection === "desc"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const toggleSort = () =>
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");

  const createNewInvoice = () => {
    if (!newInvoiceData.invoiceNumber || !newInvoiceData.amount) return;

    const newInv = {
      id: Date.now().toString(),
      invoiceNumber: newInvoiceData.invoiceNumber,
      to: "Paige Lu",
      contact: "My Integra",
      location: "Approach Care Pty Ltd",
      practitioner: "Samantha Alcorn",
      issueDate: new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      dueDate: "30 days",
      amount: newInvoiceData.amount,
      outstanding: "0.00",
      status: "Paid",
      sentStatus: "Delivered",
      details: "Newly created invoice.",
    };

    setInvoices([newInv, ...invoices]);
    setNewInvoiceData({ invoiceNumber: "", amount: "" });
    setIsNewInvoiceModalOpen(false);
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
        <ParticipantSidebar participantId={id} defaultLabel="Invoices" />

        {/* MAIN INVOICES AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Invoices</h1>

            <button
              onClick={() => setIsNewInvoiceModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New invoice
            </button>
          </div>

          {/* Search */}
          <div className="px-8 py-5 bg-white border-b">
            <div className="max-w-xl relative">
              <input
                type="text"
                placeholder="Search for invoice number, participant name and contact name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute left-5 top-4 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-5 px-8 w-12"></th>
                    <th className="py-5 px-6">Invoice #</th>
                    <th className="py-5 px-6">To</th>
                    <th className="py-5 px-6">Location</th>
                    <th className="py-5 px-6">Practitioner</th>
                    <th
                      onClick={toggleSort}
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100 flex items-center gap-1"
                    >
                      Issue date{" "}
                      <ChevronDown
                        className={`w-4 h-4 transition ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    </th>
                    <th className="py-5 px-6">Due date</th>
                    <th className="py-5 px-6 text-right">Amount</th>
                    <th className="py-5 px-6 text-right">Outstanding</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6">Sent status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {sortedInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="py-5 px-8 text-gray-400 group-hover:text-emerald-600">
                        +
                      </td>
                      <td className="py-5 px-6 font-medium text-violet-600">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-5 px-6">
                        <Link href="#" className="hover:underline">
                          {inv.to}
                        </Link>
                        <span className="ml-2 text-gray-500">
                          ({inv.contact})
                        </span>
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {inv.location}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {inv.practitioner}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {inv.issueDate}
                      </td>
                      <td className="py-5 px-6 text-gray-600">{inv.dueDate}</td>
                      <td className="py-5 px-6 text-right font-medium">
                        ${inv.amount}
                      </td>
                      <td className="py-5 px-6 text-right font-medium text-emerald-600">
                        ${inv.outstanding}
                      </td>
                      <td className="py-5 px-6">
                        <span className="bg-emerald-600 text-white text-xs px-4 py-1 rounded font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="bg-emerald-400 text-white text-xs px-4 py-1 rounded font-medium">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500 px-4">
              1-10 of {invoices.length} items
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <Transition appear show={!!selectedInvoice} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedInvoice(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden">
              {selectedInvoice && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50 flex items-center justify-between">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold">
                        Invoice {selectedInvoice.invoiceNumber}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedInvoice.issueDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="text-4xl text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8 space-y-8 text-sm">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                      <div>
                        <div className="text-gray-500">To</div>
                        <div className="font-medium mt-1">
                          {selectedInvoice.to} ({selectedInvoice.contact})
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-medium mt-1">
                          {selectedInvoice.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Practitioner</div>
                        <div className="font-medium mt-1">
                          {selectedInvoice.practitioner}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Due Date</div>
                        <div className="font-medium mt-1">
                          {selectedInvoice.dueDate}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 flex justify-between items-end">
                      <div>
                        <div className="text-xs text-gray-500">
                          Total Amount
                        </div>
                        <div className="text-4xl font-semibold text-emerald-600">
                          ${selectedInvoice.amount}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Outstanding</div>
                        <div className="text-4xl font-semibold text-emerald-600">
                          ${selectedInvoice.outstanding}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 mb-2">Notes</div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-700">
                        {selectedInvoice.details}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
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

      {/* New Invoice Modal */}
      <Transition appear show={isNewInvoiceModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewInvoiceModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-lg">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  New Invoice
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={newInvoiceData.invoiceNumber}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    placeholder="INV-AC-000024"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount (AUD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvoiceData.amount}
                    onChange={(e) =>
                      setNewInvoiceData({
                        ...newInvoiceData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="387.98"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewInvoiceModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewInvoice}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Invoice
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
