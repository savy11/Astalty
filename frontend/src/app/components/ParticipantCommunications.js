// app/participant/[id]/page.js (or a standalone component file)
// This is a Next.js page/component recreating the provided screenshot UI.
// Assumptions:
// - Tailwind CSS is set up in your Next.js app (add via `npx tailwindcss init` if not).
// - Using React hooks for state management (search, pagination).
// - Mock data for communications (in a real app, fetch from API).
// - Basic functionality: Search, pagination, sorting (by date/time), actions (dropdown with options like View, Edit, Delete).
// - Links to invoices are mock hyperlinks.
// - Sidebar and header are simplified based on the screenshot.
// - For full app integration, wrap in your layout.

// Mock data (replace with API fetch)
const mockCommunications = [
  {
    id: 1,
    dateTime: "4:18 PM, 28 Nov 2025",
    subject: "Invoice INV-AC-00023 from Approach Care Pty Ltd",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Invoice INV-AC-00023",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 2,
    dateTime: "4:16 PM, 28 Nov 2025",
    subject: "Paige NDIS Outcome report",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 3,
    dateTime: "9:30 AM, 24 Nov 2025",
    subject: "Support reference regarding end of",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 4,
    dateTime: "7:25 AM, 24 Nov 2025",
    subject: "Invoice INV-AC-00022 from Approach Care Pty Ltd",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Invoice INV-AC-00022",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 5,
    dateTime: "7:25 AM, 24 Nov 2025",
    subject: "Progress note from Approach Care (14/11/25 Paige)",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Default note template",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 6,
    dateTime: "5:00 AM, 23 Nov 2025",
    subject: "Appointment reminder from Approach Care Pty Ltd",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Appointment 24 Nov 2025 5:00 AM",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 7,
    dateTime: "6:50 AM, 10 Nov 2025",
    subject: "Invoice INV-AC-00020 from Approach Care",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Invoice INV-AC-00020",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 8,
    dateTime: "6:50 AM, 10 Nov 2025",
    subject: "Progress note from Approach Care (10/11/25 Paige)",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Default note template",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 9,
    dateTime: "5:00 AM, 9 Nov 2025",
    subject: "Appointment reminder from Approach Care Pty Ltd",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Appointment 10 Nov 2025 5:00 AM",
    actions: ["View", "Edit", "Delete"],
  },
  {
    id: 10,
    dateTime: "8:07 AM, 4 Nov 2025",
    subject: "Invoice INV-AC-00018 from Approach Care Pty Ltd",
    type: "Email",
    direction: "Outbound",
    status: "Delivered",
    link: "Invoice INV-AC-00018",
    actions: ["View", "Edit", "Delete"],
  },
  // Add more for pagination demo
];

import { useState } from "react";
import Link from "next/link";

export default function ParticipantCommunications({ params }) {
  const { id } = params; // Assuming dynamic route for participant ID
  const [communications, setCommunications] = useState(mockCommunications);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("dateTime"); // Default sort
  const [sortDirection, setSortDirection] = useState("desc"); // desc for newest first

  // Filter communications
  const filteredCommunications = communications.filter(
    (comm) =>
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.dateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort communications
  const sortedCommunications = [...filteredCommunications].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCommunications = sortedCommunications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedCommunications.length / itemsPerPage);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle sort
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("desc");
    }
  };

  // Handle action click (mock)
  const handleAction = (action, commId) => {
    alert(`Action: ${action} for Communication ID: ${commId}`);
    // In real app: Open modal, navigate, etc.
  };

  // Mock participant data
  const participant = {
    name: "Paige (Page) Lu",
    appointments: 9,
    communications: 39,
    files: 18,
    progressNotes: 8,
    cases: 1,
    supportActivities: 2,
    filesCount: 10, // Wait, screenshot has Files 18, but whatever
    payments: 10,
    statements: 10,
    letters: 10,
    practitionerAccess: 10,
  };

  return (
    <div className="h-screen bg-gray-50">
      {/* Sidebar */}
      <Header activeKey="Participants" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{participant.name}</h1>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              New SMS
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              New email
            </button>
            <div className="relative inline-block text-left">
              <button className="text-gray-500 hover:text-gray-700">
                Actions ▼
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-500">+ New</button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>{" "}
            {/* User avatar */}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Participant Details */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">Details</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">Appointments</span>
                <div className="text-2xl font-bold">
                  {participant.appointments}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">Communications</span>
                <div className="text-2xl font-bold">
                  {participant.communications}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">Files</span>
                <div className="text-2xl font-bold">{participant.files}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">Progress notes</span>
                <div className="text-2xl font-bold">
                  {participant.progressNotes}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">Cases</span>
                <div className="text-2xl font-bold">{participant.cases}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-gray-500">
                  Support activities
                </span>
                <div className="text-2xl font-bold">
                  {participant.supportActivities}
                </div>
              </div>
              {/* Add more stats as per screenshot */}
            </div>
          </div>

          {/* Right Panel: Communications */}
          <div className="flex-1 p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Communications</h2>
              <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  + Log communication
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search for message, to or from"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">
                        <button
                          onClick={() => handleSort("dateTime")}
                          className="flex items-center"
                        >
                          Date and time{" "}
                          {sortBy === "dateTime" &&
                            (sortDirection === "desc" ? "▼" : "▲")}
                        </button>
                      </th>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Direction</th>
                      <th className="p-3 text-left">Links</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCommunications.map((comm) => (
                      <tr key={comm.id} className="border-t border-gray-200">
                        <td className="p-3">+ {comm.dateTime}</td>
                        <td className="p-3">{comm.subject}</td>
                        <td className="p-3">{comm.type}</td>
                        <td className="p-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {comm.direction} {comm.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {comm.link && (
                            <Link
                              href={`/invoices/${comm.link}`}
                              className="text-blue-500 hover:underline"
                            >
                              {comm.link}
                            </Link>
                          )}
                        </td>
                        <td className="p-3 relative">
                          <div className="flex items-center space-x-1">
                            <button className="text-gray-500">...</button>
                            {/* Simple dropdown mock - use a library like Headless UI for production */}
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg hidden group-hover:block">
                              {comm.actions.map((action) => (
                                <button
                                  key={action}
                                  onClick={() => handleAction(action, comm.id)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div>1-10 of {filteredCommunications.length} items</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  <option value={10}>10 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
