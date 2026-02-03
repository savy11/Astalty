// app/participants/page.js (or pages/participants.js in Pages Router)
// Participants page with search, sortable table, tags, and pagination.
// Assumptions:
// - Tailwind CSS is installed/configured for styling.
// - Data is static/sample; integrate with API (e.g., fetch) for real use.
// - Basic search filters by name, phone, email (case-insensitive).
// - Sorting on Name (asc/desc).
// - Tags as green badges.
// - Pagination: 10 per page, simple controls.

"use client";

import { useState } from "react";
import { Tooltip } from 'react-tooltip';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // For sort icons; npm install react-icons
import Header from "../components/header";

const sampleData = [
  {
    id: 1,
    name: "Malakai (Malakai Sajul)",
    dob: "24 Sep 2022",
    phone: "+61 0458348255",
    email: "mariengelenalvarez@gmail.com",
    tags: ["Plan-managed"],
  },
  {
    id: 2,
    name: "Paige (Paige) Lu",
    dob: "29 Dec 2021",
    phone: "+61 0416091953",
    email: "paula.bian.calu@gmail.com",
    tags: ["Plan-managed"],
  },
  // Add more sample rows as needed
  {
    id: 3,
    name: "John Doe (John Doe)",
    dob: "15 Jan 2023",
    phone: "+61 0123456789",
    email: "john.doe@example.com",
    tags: ["Plan-managed"],
  },
];

function ParticipantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setSortDir] = useState("asc"); // 'asc', 'desc', null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data by search
  const filteredData = sampleData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data by name
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDir === "asc") return a.name.localeCompare(b.name);
    if (sortDir === "desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = () => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Dynamic tooltip for sort button
  const getSortTooltip = () => {
    if (sortDir === 'asc') return 'Click to sort descending.';
    if (sortDir === 'desc') return 'Click to sort ascending.';
    return 'Click to sort ascending.';
  };

  return (
    <div className="w-full">
      <Header activeKey="Participants" />
      <div className="p-4">
        <div className="flex mb-4 items-center">
          <h1 className="text-2xl font-bold text-purple-500">
            Participants
          </h1>
          <button
            onClick={() => {
              /* Handle add participant action */
            }}
            className="ml-auto px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-purple-500 hover:text-white transition ease-linear"
          >
            + Add Participant
          </button>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for name, phone number, and email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 tracking-wider" data-tooltip-id="sort-tooltip" data-tooltip-content={getSortTooltip()} onClick={handleSort}>
                  <Tooltip id="sort-tooltip" />
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <span>Name</span>
                    {sortDir === null && <FaSort className="w-3 h-3" />}
                    {sortDir === "asc" && <FaSort className="w-3 h-3" />}
                    {sortDir === "desc" && <FaSort className="w-3 h-3" />}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.dob}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-500">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-1">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              {totalItems > 0
                ? `${startIndex + 1}-${Math.min(
                    startIndex + itemsPerPage,
                    totalItems
                  )} of ${totalItems} items`
                : "0 of 0 items"}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm font-medium">
                {currentPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="text-sm text-gray-700">{itemsPerPage}/page</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParticipantsPage;
