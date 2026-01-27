"use client";
// components/ParticipantAppointments.js
import React, { useState, useMemo } from 'react';
import Header from './header';
import ParticipantSidebar from './ParticipantSidebar';

const appointmentsData = [
  {
    id: 1,
    date: 'Mon 24 Nov 2025',
    time: '5:00 am',
    status: 'scheduled',
    location: '432 Baxter-Tooradin Rd, Pearcedale VIC 3972',
    type: 'Early Childhood Intervention',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 2,
    date: 'Mon 10 Nov 2025',
    time: '5:00 am',
    status: 'scheduled',
    location: '79 Hummingbird Dr, Botanic Ridge VIC 3977',
    type: 'Early Childhood Intervention Professional - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 3,
    date: 'Mon 3 Nov 2025',
    time: '4:00 am',
    status: 'scheduled',
    location: '79 Hummingbird Dr, Botanic Ridge VIC 3977',
    type: 'Early Childhood Intervention Professional - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 4,
    date: 'Mon 27 Oct 2025',
    time: '5:00 am',
    status: 'scheduled',
    location: '79 Hummingbird Dr, Botanic Ridge VIC 3977',
    type: 'Early Childhood Intervention Professional - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 5,
    date: 'Mon 8 Sep 2025',
    time: '6:00 am',
    status: 'cancelled',
    location: 'Approach Care Pty Ltd Pearcedale',
    type: 'Early Childhood Intervention Professional - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: '--',
  },
  {
    id: 6,
    date: 'Mon 4 Aug 2025',
    time: '6:00 am',
    status: 'scheduled',
    location: '432 Baxter-Tooradin Rd, Pearcedale VIC 3972',
    type: 'Early Childhood Intervention - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 7,
    date: 'Mon 21 Jul 2025',
    time: '5:00 am',
    status: 'scheduled',
    location: '432 Baxter-Tooradin Rd, Pearcedale VIC 3972',
    type: 'Early Childhood Intervention - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 8,
    date: 'Tue 8 Jul 2025',
    time: '5:00 am',
    status: 'scheduled',
    location: '60 Langwarrin Rd, Langwarrin VIC 3910',
    type: 'Early Childhood Intervention - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
  {
    id: 9,
    date: 'Mon 23 Jun 2025',
    time: '4:45 am',
    status: 'arrived',
    location: '79 Hummingbird Dr, Botanic Ridge VIC 3977',
    type: 'Early Childhood Intervention Professional - Other Early Childhood Professional',
    practitioner: 'Samantha Alcorn',
    invoiceStatus: 'Paid',
  },
];

const statusColors = {
  scheduled: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  arrived: 'bg-blue-100 text-blue-800 border-blue-200',
};

const ParticipantAppointments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showActions, setShowActions] = useState(null);
  const [sendUpcoming, setSendUpcoming] = useState(false);

  const itemsPerPage = 10;
  const totalItems = appointmentsData.length;

  const currentAppointments = useMemo(() => {
    let sorted = [...appointmentsData];
    sorted.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'date':
          aVal = new Date(`${a.date} ${a.time}`);
          bVal = new Date(`${b.date} ${b.time}`);
          break;
        case 'location':
          aVal = a.location.toLowerCase();
          bVal = b.location.toLowerCase();
          break;
        case 'type':
          aVal = a.type.toLowerCase();
          bVal = b.type.toLowerCase();
          break;
        case 'practitioner':
          aVal = a.practitioner.toLowerCase();
          bVal = b.practitioner.toLowerCase();
          break;
        case 'invoiceStatus':
          aVal = a.invoiceStatus.toLowerCase();
          bVal = b.invoiceStatus.toLowerCase();
          break;
        default:
          aVal = a.date;
          bVal = b.date;
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [sortBy, sortOrder, currentPage]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleActionClick = (id) => {
    setShowActions(showActions === id ? null : id);
  };

  const handleNewAppointment = () => {
    // TODO: Open modal or navigate to new appointment form
    alert('New appointment modal would open here');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  // Optionally override default menu items with dynamic data (e.g., from API)
  const dynamicMenuItems = [
    {
      label: "Details",
      badge: null,
      href: `/participants/${id}`,
    },
    {
      label: "Appointments",
      badge: "9",
      href: `/participants/${id}/appointments`,
    },
    {
      label: "Files",
      badge: "18/39",
      href: `/participants/${id}/files`,
    },
    {
      label: "Progress notes",
      badge: "8",
      href: `/participants/${id}/progress-notes`,
    },
    {
      label: "Cases",
      badge: "1",
      href: `/participants/${id}/cases`,
    },
    {
      label: "Support activities",
      badge: "2",
      href: `/participants/${id}/support-activities`,
    },
    {
      label: "Forms",
      badge: "10",
      href: `/participants/${id}/forms`,
    },
    {
      label: "Invoices",
      badge: "10",
      href: `/participants/${id}/invoices`,
    },
    {
      label: "Payments",
      badge: "10",
      href: `/participants/${id}/payments`,
    },
    {
      label: "Statements",
      badge: null,
      href: `/participants/${id}/statements`,
    },
    {
      label: "Letters",
      badge: null,
      href: `/participants/${id}/letters`,
    },
  ];

  return (
    <div className="h-screen bg-gray-50">
      {/* Top Navigation */}
      <Header activeKey="Participants" />

      {/* Breadcrumbs and Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Participant &gt; Paige &gt; Lu</span>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md">New SMS</button>
          <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md">New email</button>
          <div className="relative inline-block text-left">
            <button className="px-4 py-2 border border-gray-300 text-sm rounded-md">Actions ▼</button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
                <ParticipantSidebar participantId={id} menuItems={dynamicMenuItems} />


        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Tab Header */}
          <div className="flex items-center mb-6">
            <button className="px-4 py-2 text-gray-500">Details</button>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md mr-2">Appointments</button>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sendUpcoming}
                  onChange={(e) => setSendUpcoming(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Send upcoming appointments</span>
              </label>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <option>▼</option>
              </select>
            </div>
            <button
              onClick={handleNewAppointment}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
            >
              + New appointment
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort('date')}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    When {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('location')}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Where {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('type')}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('practitioner')}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Practitioner {sortBy === 'practitioner' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('invoiceStatus')}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice status {sortBy === 'invoiceStatus' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[appt.status]}`}>
                        {appt.status === 'cancelled' && 'Cancelled '}
                        {appt.status === 'arrived' && 'Arrived '}
                        {`${appt.date} ${appt.time}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appt.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appt.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appt.practitioner}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${appt.invoiceStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {appt.invoiceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 relative">
                      <button
                        onClick={() => handleActionClick(appt.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ...
                      </button>
                      {showActions === appt.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cancel</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reschedule</a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalItems > itemsPerPage && (
            <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-700">
                {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                >
                  ‹
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">{currentPage} / {Math.ceil(totalItems / itemsPerPage)}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ParticipantAppointments;