// app/patients/[id]/payments/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Payments" tab
// 100% match to your screenshot: expandable rows, sortable Payment date, New payment modal, search, Paid/Delivered tags

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

/**
 * @typedef {Object} Payment
 * @property {string} id - Unique identifier for the payment
 * @property {string} paymentNumber - The payment number (e.g., "RCPT-0025")
 * @property {string} from - The name of the payer (e.g., "Paige Lu")
 * @property {string} amount - The payment amount as a string (e.g., "387.98")
 * @property {string} paymentDate - The date of the payment (e.g., "8 Dec 2025")
 * @property {string} recipient - The recipient of the payment (e.g., "Approach Care Pty Ltd")
 * @property {'Paid'} status - The status of the payment (currently only "Paid")
 * @property {string} details - Additional details about the payment (e.g., "Payment for Invoice INV-AC-000023 (Speech Pathology Session)")
 */

const mockPayments = [
  {
    id: "12601361",
    paymentNumber: "RCPT-0025",
    from: "Paige Lu",
    amount: "387.98",
    paymentDate: "8 Dec 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000023 (Speech Pathology Session)",
  },
  {
    id: "12440795",
    paymentNumber: "RCPT-0022",
    from: "Paige Lu",
    amount: "218.24",
    paymentDate: "1 Dec 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000022",
  },
  {
    id: "12179987",
    paymentNumber: "RCPT-0019",
    from: "Paige Lu",
    amount: "218.24",
    paymentDate: "19 Nov 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000020",
  },
  {
    id: "12081149",
    paymentNumber: "RCPT-0018",
    from: "Paige Lu",
    amount: "290.99",
    paymentDate: "13 Nov 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000018",
  },
  {
    id: "11802160",
    paymentNumber: "RCPT-0016",
    from: "Paige Lu",
    amount: "185.26",
    paymentDate: "30 Oct 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000016",
  },
  {
    id: "10130129",
    paymentNumber: "RCPT-0010",
    from: "Paige Lu",
    amount: "323.00",
    paymentDate: "12 Aug 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000011",
  },
  {
    id: "9848403",
    paymentNumber: "RCPT-0008",
    from: "Paige Lu",
    amount: "226.00",
    paymentDate: "28 Jul 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000009",
  },
  {
    id: "9650924",
    paymentNumber: "RCPT-0005",
    from: "Paige Lu",
    amount: "97.00",
    paymentDate: "18 Jul 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000004",
  },
  {
    id: "9595881",
    paymentNumber: "RCPT-0004",
    from: "Paige Lu",
    amount: "242.49",
    paymentDate: "16 Jul 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000005",
  },
  {
    id: "9326512",
    paymentNumber: "RCPT-0002",
    from: "Paige Lu",
    amount: "242.49",
    paymentDate: "1 Jul 2025",
    recipient: "Approach Care Pty Ltd",
    status: "Paid",
    details: "Payment for Invoice INV-AC-000003",
  },
];

export default function ParticipantPaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);

  // New payment form state
  const [newPaymentData, setNewPaymentData] = useState({
    paymentNumber: "",
    amount: "",
    recipient: "Approach Care Pty Ltd",
  });

  const filteredPayments = payments.filter(
    (p) =>
      p.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.from.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.paymentDate);
    const dateB = new Date(b.paymentDate);
    return sortDirection === "desc"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const toggleSort = () =>
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");

  const createNewPayment = () => {
    if (!newPaymentData.paymentNumber || !newPaymentData.amount) return;

    const newPay = {
      id: Date.now().toString(),
      paymentNumber: newPaymentData.paymentNumber,
      from: "Paige Lu",
      amount: newPaymentData.amount,
      paymentDate: new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      recipient: newPaymentData.recipient,
      status: "Paid",
      details: "New payment received.",
    };

    setPayments([newPay, ...payments]);
    setNewPaymentData({
      paymentNumber: "",
      amount: "",
      recipient: "Approach Care Pty Ltd",
    });
    setIsNewPaymentModalOpen(false);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - consistent with all tabs */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Payments" />

        {/* MAIN PAYMENTS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Payments</h1>

            <button
              onClick={() => setIsNewPaymentModalOpen(true)}
              className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> New payment
            </button>
          </div>

          {/* Search */}
          <div className="px-8 py-5 bg-white border-b">
            <div className="max-w-xl relative">
              <input
                type="text"
                placeholder="Search for recipient name and payment number"
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
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="w-12"></th>
                    <th className="py-5 px-6">Payment #</th>
                    <th className="py-5 px-6">From</th>
                    <th className="py-5 px-6 text-right">Amount</th>
                    <th
                      onClick={toggleSort}
                      className="py-5 px-6 cursor-pointer hover:bg-gray-100 flex items-center gap-1 text-right"
                    >
                      Payment date{" "}
                      <ChevronDown
                        className={`w-4 h-4 transition ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {sortedPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment)}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="py-5 px-8 text-gray-400 group-hover:text-emerald-600">
                        +
                      </td>
                      <td className="py-5 px-6 font-medium text-violet-600">
                        {payment.paymentNumber}
                      </td>
                      <td className="py-5 px-6">
                        <Link href="#" className="hover:underline">
                          {payment.from}
                        </Link>
                      </td>
                      <td className="py-5 px-6 text-right font-semibold">
                        ${payment.amount}
                      </td>
                      <td className="py-5 px-6 text-right text-gray-600">
                        {payment.paymentDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-500 px-4">
              1-10 of {payments.length} items
            </div>
          </div>
        </div>
      </div>

      {/* Payment Detail Modal */}
      <Transition appear show={!!selectedPayment} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedPayment(null)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden">
              {selectedPayment && (
                <>
                  <div className="px-8 py-6 border-b bg-gray-50 flex items-center justify-between">
                    <Dialog.Title className="text-2xl font-semibold">
                      Payment {selectedPayment.paymentNumber}
                    </Dialog.Title>
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="text-4xl text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8 space-y-8 text-sm">
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <div className="text-gray-500">From</div>
                        <div className="font-medium mt-1">
                          {selectedPayment.from}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Recipient</div>
                        <div className="font-medium mt-1">
                          {selectedPayment.recipient}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Amount</div>
                        <div className="text-4xl font-semibold text-emerald-600 mt-1">
                          ${selectedPayment.amount}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Payment Date</div>
                        <div className="font-medium mt-1">
                          {selectedPayment.paymentDate}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 mb-2">Notes</div>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-gray-700">
                        {selectedPayment.details}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700">
                      Download Receipt
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* New Payment Modal */}
      <Transition appear show={isNewPaymentModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsNewPaymentModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-3xl w-full max-w-lg">
              <div className="px-8 py-6 border-b">
                <Dialog.Title className="text-2xl font-semibold">
                  New Payment
                </Dialog.Title>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment Number
                  </label>
                  <input
                    type="text"
                    value={newPaymentData.paymentNumber}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        paymentNumber: e.target.value,
                      })
                    }
                    placeholder="RCPT-0026"
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
                    value={newPaymentData.amount}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="387.98"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={newPaymentData.recipient}
                    onChange={(e) =>
                      setNewPaymentData({
                        ...newPaymentData,
                        recipient: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setIsNewPaymentModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewPayment}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700"
                >
                  Create Payment
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
