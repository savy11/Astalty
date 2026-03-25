// app/contacts/page.js
// Contacts List Page with sortable columns + pagination (plain JS)

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Plus, ChevronDown, MoreHorizontal, 
  ChevronLeft, ChevronRight, ChevronUp 
} from 'lucide-react';
import { Menu, MenuItems, MenuItem, MenuButton, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Header from '../components/header';

const mockContacts = [
  { id: '1', type: 'Plan manager', name: 'Test User', company: 'Test Company', email: 'test@example.com', workPhone: '', mobilePhone: '+61 1234567890' },
  // Add more entries here if you want to test pagination with > 10 items
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return mockContacts;
    const term = searchTerm.toLowerCase();
    return mockContacts.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      (c.company && c.company.toLowerCase().includes(term)) ||
      c.type.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = (a[sortConfig.key] || '').toString().toLowerCase();
      const bVal = (b[sortConfig.key] || '').toString().toLowerCase();

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortConfig]);

  // Pagination
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = sorted.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort change
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' 
      ? <ChevronDown className="w-4 h-4" /> 
      : <ChevronUp className="w-4 h-4" />;
  };

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <Header activeKey="Contacts" />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Page Header */}
          <div className="bg-white border-b px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
              <Link href="/contacts/new">
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm">
                  <Plus className="w-4 h-4" /> New contact
                </button>
              </Link>
            </div>

            <div className="mt-5 max-w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for contact name, phone number, email and company name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50 border-b">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th 
                        className="py-5 px-8 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('type')}
                      >
                        <div className="flex items-center gap-1">
                          Type
                          {getSortIcon('type')}
                        </div>
                      </th>
                      <th 
                        className="py-5 px-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {getSortIcon('name')}
                        </div>
                      </th>
                      <th 
                        className="py-5 px-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('company')}
                      >
                        <div className="flex items-center gap-1">
                          Company
                          {getSortIcon('company')}
                        </div>
                      </th>
                      <th 
                        className="py-5 px-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('email')}
                      >
                        <div className="flex items-center gap-1">
                          Email
                          {getSortIcon('email')}
                        </div>
                      </th>
                      <th 
                        className="py-5 px-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('workPhone')}
                      >
                        <div className="flex items-center gap-1">
                          Work phone
                          {getSortIcon('workPhone')}
                        </div>
                      </th>
                      <th 
                        className="py-5 px-6 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => requestSort('mobilePhone')}
                      >
                        <div className="flex items-center gap-1">
                          Mobile phone
                          {getSortIcon('mobilePhone')}
                        </div>
                      </th>
                      <th className="py-5 px-6 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm text-gray-700">
                    {paginatedContacts.map(contact => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-8 font-medium">{contact.type}</td>
                        <td className="py-5 px-6">
                          <Link href={`/contacts/${contact.id}/details`} className="text-purple-600 hover:underline">
                            {contact.name}
                          </Link>
                        </td>
                        <td className="py-5 px-6 text-gray-600">{contact.company || '—'}</td>
                        <td className="py-5 px-6">
                          <a href={`mailto:${contact.email}`} className="text-purple-600 hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="py-5 px-6 text-gray-600">{contact.workPhone || '—'}</td>
                        <td className="py-5 px-6 text-gray-600">{contact.mobilePhone || '—'}</td>
                        <td className="py-5 px-6 text-center">
                          <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="text-gray-400 hover:text-gray-600 focus:outline-none">
                              <MoreHorizontal className="w-5 h-5" />
                            </MenuButton>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <MenuItems className="absolute right-0 w-48 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-100">
                                <MenuItem>
                                  {({ active }) => (
                                    <Link
                                      href={`/contacts/${contact.id}/details`}
                                      className={`block px-5 py-2.5 text-sm ${active ? 'bg-gray-50' : ''} hover:text-purple-700`}
                                    >
                                      View profile
                                    </Link>
                                  )}
                                </MenuItem>
                                {/* You can add more menu items here */}
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalItems > 0 && (
                <div className="px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
                  <div>
                    Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} contacts
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1.5 rounded-lg border ${
                          page === currentPage
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <select
                      value={itemsPerPage}
                      onChange={() => {
                        setCurrentPage(1);
                        // You can save this preference to localStorage if desired
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                      <option value={50}>50 per page</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}