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

import { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import { FaSort } from "react-icons/fa"; // For sort icons; npm install react-icons
import Link from "next/link";
import Header from "../components/header";

// const sampleData = [
//   {
//     id: 1,
//     name: "Malakai (Malakai Sajul)",
//     dob: "24 Sep 2022",
//     phone: "+61 0458348255",
//     email: "mariengelenalvarez@gmail.com",
//     tags: ["Plan-managed"],
//     link: "/participants/1",
//   },
//   {
//     id: 2,
//     name: "Paige (Paige) Lu",
//     dob: "29 Dec 2021",
//     phone: "+61 0416091953",
//     email: "paula.bian.calu@gmail.com",
//     tags: ["Plan-managed"],
//     link: "/participants/1",
//   },
//   // Add more sample rows as needed
//   {
//     id: 3,
//     name: "John Doe (John Doe)",
//     dob: "15 Jan 2023",
//     phone: "+61 0123456789",
//     email: "john.doe@example.com",
//     tags: ["Plan-managed"],
//     link: "/participants/1",
//   },
// ];

function ParticipantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setSortDir] = useState("asc"); // 'asc', 'desc', null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch real participants
  useEffect(() => {
    const fetchParticipants = async () => {
      try {

        const token = localStorage.getItem("token");
        console.log("API token:", token);

        if (!token) {
          console.log("No token found");
          return;
        }

        const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

        const response = await fetch(
        `${baseApiUrl}/api/participants/fetch`,
          {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );

        const data = await response.json();

        console.log("API response:", data);

        // Handle both response formats
        setParticipants(data.data || data);
      } catch (error) {
        console.error("Failed to fetch participants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

   // 🔎 Search
  // const filteredData = participants.filter((item) =>
  //   `${item.firstName} ${item.lastName}`
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase()) ||
  //   item.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredData = Array.isArray(participants)
  ? participants.filter((item) =>
      `${item.firstName || ""} ${item.lastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  // // Filter data by search
  // const filteredData = sampleData.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // 🔄 Sort by name
  const sortedData = [...filteredData].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`;
    const nameB = `${b.firstName} ${b.lastName}`;

    if (sortDir === "asc") return nameA.localeCompare(nameB);
    if (sortDir === "desc") return nameB.localeCompare(nameA);
    return 0;
  });

  // // Sort data by name
  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortDir === "asc") return a.name.localeCompare(b.name);
  //   if (sortDir === "desc") return b.name.localeCompare(a.name);
  //   return 0;
  // });

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
          <Link
            href="/add-participant"
            className="ml-auto px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-purple-500 hover:text-white transition ease-linear"
          >
            + Add Participant
          </Link>
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

        
        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading participants...
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-sm font-bold text-gray-500 cursor-pointer"
                      onClick={handleSort}
                    >
                      Name {sortDir === "asc" ? "▲" : "▼"}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                      Date of Birth
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                      Tags
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 bg-gray-50 font-medium">
                        {item.firstName} {item.lastName}
                      </td>

                      <td className="px-6 py-4">
                        {item.day}/{item.month}/{item.year}
                      </td>

                      <td className="px-6 py-4 text-purple-500">
                        {item.phoneNumber}
                      </td>

                      <td className="px-6 py-4">
                        {item.email}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {item.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
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
                <div className="text-sm text-gray-600">
                  {startIndex + 1}-
                  {Math.min(
                    startIndex + itemsPerPage,
                    totalItems
                  )}{" "}
                  of {totalItems}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-1">
                    {currentPage}
                  </span>

                  <button
                    onClick={() =>
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ParticipantsPage;
