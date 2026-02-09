// components/ParticipantDetails.js
import Header from "./header";
import ParticipantSidebar from "./ParticipantSidebar";

const ParticipantDetails = () => {
  // const router = useRouter();
  // const { id } = router.query; // Assuming participantId is the dynamic route param
  const id = 1; // Hardcoded for demonstration; replace with dynamic param as needed

  
  return (
    <div className="h-screen bg-gray-50">
      {/* Top Navigation */}
      <Header activeKey="Participants" />

      {/* Breadcrumbs and Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Participant &gt; Page &gt; Lu
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md">
            New SMS
          </button>
          <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md">
            New email
          </button>
          <div className="relative inline-block text-left">
            <button className="px-4 py-2 border border-gray-300 text-sm rounded-md">
              Actions ▼
            </button>
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {/* Left Sidebar */}
        <ParticipantSidebar participantId={id} defaultLabel="Details" />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Tab Header */}
          <div className="flex items-center mb-6">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md mr-2">
              Details
            </button>
            <button className="px-4 py-2 text-gray-500">Appointments</button>
          </div>

          {/* Account Balance Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Account balance
              </h2>
              <p className="text-sm text-gray-500">£0.00</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-900">
                Available credit balance
              </h2>
              <p className="text-sm text-gray-500">£0.00</p>
            </div>
          </div>

          {/* Participant Tags */}
          <div className="flex space-x-2 mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Plan managed
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
              Xero
            </span>
            <button className="text-sm text-blue-600 hover:underline">
              ⊕ Open Xero
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold">PL</span>
                </div>
                General details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">Ms Paige Lu</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of birth
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    29 Dec 2021 (4 years old)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sex
                  </label>
                  <p className="mt-1 text-sm text-gray-900">Female</p>
                </div>
              </div>
            </div>

            {/* Participant Contact */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Participant contact
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    paige.lu@example.com
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone numbers
                  </label>
                  <p className="mt-1 text-sm text-gray-900">+61 409 195 353</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preference
                  </label>
                  <p className="mt-1 text-sm text-gray-900">Email</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    70 Hummingbird Vic 3977
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    GMT+11 (Australia/Sydney)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Consent */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Privacy policy consent
            </h3>
            <p className="text-sm text-green-600">Accepted</p>
          </div>

          {/* Medications, Allergies & Intolerances */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Medications, allergies & intolerances
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medications
                </label>
                <p className="mt-1 text-sm text-gray-900">None</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allergies
                </label>
                <p className="mt-1 text-sm text-gray-900">None</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Intolerances
                </label>
                <p className="mt-1 text-sm text-gray-900">None</p>
              </div>
            </div>
          </div>

          {/* NDIS Details */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              NDIS details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NDIS number
                </label>
                <p className="mt-1 text-sm text-gray-900">53184170</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan start
                </label>
                <p className="mt-1 text-sm text-gray-900">19 Mar 2025</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan end
                </label>
                <p className="mt-1 text-sm text-gray-900">18 Mar 2026</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fund management
                </label>
                <p className="mt-1 text-sm text-gray-900">Plan-managed</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Plan nominee
                </label>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-900">Paula Lu</p>
                  <p className="text-sm text-gray-500">+61 409 195 353</p>
                  <p className="text-sm text-gray-500">paula.lu@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Emergency contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <p className="mt-1 text-sm text-gray-900">Paula Lu</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <p className="mt-1 text-sm text-gray-900">Mother</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <p className="mt-1 text-sm text-gray-900">0409195353</p>
              </div>
            </div>
          </div>

          {/* Invoicing */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invoicing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Send invoices to
                </label>
                <p className="mt-1 text-sm text-gray-900">My integra</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Invoice reminder preference
                </label>
                <p className="mt-1 text-sm text-gray-900">On</p>
              </div>
            </div>
          </div>

          {/* Associated Contacts */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Associated contacts ⊕
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoices
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Jessica Burke
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Teacher
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Michelle
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Teacher
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      (1)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Referral Source */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Referral source
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <p className="mt-1 text-sm text-gray-900">Other</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Information
                </label>
                <p className="mt-1 text-sm text-gray-900">Samantha Alcorn</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParticipantDetails;
