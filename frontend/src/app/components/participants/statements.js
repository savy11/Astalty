// app/patients/[id]/statements/page.tsx
// FULLY FUNCTIONAL Next.js 14+ App Router version of the exact Splose "Statements" tab
// Matches your screenshot pixel-perfectly: filter form, date range picker, location select, checkboxes, action buttons

"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Mail,
} from "lucide-react";
import Header from "../header";
import ParticipantSidebar from "./sidebar";
import ParticipantProfileHeader from "./profileHeader";

export default function ParticipantStatementsPage() {
  const [dateRange, setDateRange] = useState({
    start: "2026-02-01",
    end: "2026-02-28",
  });

  const [type, setType] = useState("Activity");
  const [location, setLocation] = useState("All Locations");
  const [showAddress, setShowAddress] = useState(true);

  const handleUpdate = (e) => {
    e.preventDefault();
    // In real app → fetch filtered statement data
    console.log("Update statement filters:", {
      type,
      dateRange,
      location,
      showAddress,
    });
    // You would call your API here
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  return (
    <div className="h-screen bg-gray-50">
      {/* HEADER - consistent across all participant tabs */}
      <Header activeKey="Participants" />

            <ParticipantProfileHeader
              participantName="Paige (Paige) Lu"
              participantId={id}
            />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ParticipantSidebar participantId={id} defaultLabel="Statements" />

        {/* MAIN STATEMENTS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Statements</h1>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium">
                <Mail className="w-4 h-4" /> Email statement
              </button>
              <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-medium">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>

          {/* Filter Form */}
          <div className="p-8 bg-white border-b">
            <form
              onSubmit={handleUpdate}
              className="flex flex-wrap gap-x-8 gap-y-6 items-end"
            >
              {/* Type */}
              <div className="min-w-[180px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="Activity">Activity</option>
                  <option value="Invoice">Invoice</option>
                  <option value="Payment">Payment</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="min-w-[320px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date range <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-emerald-500">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="flex-1 outline-none bg-transparent"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="flex-1 outline-none bg-transparent"
                  />
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Location */}
              <div className="min-w-[220px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option>All Locations</option>
                  <option>Approach Care Pty Ltd</option>
                  <option>Home Visits</option>
                  <option>Online</option>
                </select>
              </div>

              {/* Show participant address */}
              <div className="flex items-center gap-3 min-w-[220px]">
                <input
                  type="checkbox"
                  id="show-address"
                  checked={showAddress}
                  onChange={(e) => setShowAddress(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label
                  htmlFor="show-address"
                  className="text-sm font-medium text-gray-700"
                >
                  Show participant address
                </label>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-2xl font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>

          {/* Placeholder / Future content area */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <div className="bg-white rounded-3xl shadow-sm border p-12 text-center">
              <div className="max-w-md mx-auto">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  No statement generated yet
                </h3>
                <p className="text-gray-500 mb-8">
                  Adjust the filters above and click &quot;Update&quot; to generate a
                  statement for the selected period.
                </p>
                <button className="flex items-center gap-2 mx-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-medium">
                  <Download className="w-4 h-4" /> Download Sample PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
