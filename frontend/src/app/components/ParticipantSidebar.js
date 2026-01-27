// components/ParticipantSidebar.js
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For active state highlighting

const ParticipantSidebar = ({ participantId, menuItems = [] }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  // Default menu items if not provided via props
  const defaultMenuItems = [
    { label: 'Details', badge: null, href: `/participants/${participantId}`, active: false },
    { label: 'Appointments', badge: '9', href: `/participants/${participantId}/appointments`, active: false },
    { label: 'Files', badge: '18/39', href: `/participants/${participantId}/files`, active: false },
    { label: 'Progress notes', badge: '8', href: `/participants/${participantId}/progress-notes`, active: false },
    { label: 'Cases', badge: '1', href: `/participants/${participantId}/cases`, active: false },
    { label: 'Support activities', badge: '2', href: `/participants/${participantId}/support-activities`, active: false },
    { label: 'Forms', badge: '10', href: `/participants/${participantId}/forms`, active: false },
    { label: 'Invoices', badge: '10', href: `/participants/${participantId}/invoices`, active: false },
    { label: 'Payments', badge: '10', href: `/participants/${participantId}/payments`, active: false },
    { label: 'Statements', badge: null, href: `/participants/${participantId}/statements`, active: false },
    { label: 'Letters', badge: null, href: `/participants/${participantId}/letters`, active: false },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => {
          const isActive = currentPath === item.href;
          return (
            <Link key={index} href={item.href}>
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                  isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`text-sm text-gray-500 ${isActive ? 'text-purple-500' : ''}`}>
                    ({item.badge})
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default ParticipantSidebar;