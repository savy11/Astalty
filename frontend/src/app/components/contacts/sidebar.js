// components/ParticipantSidebar.js
import Link from "next/link";
import { useRouter } from "next/navigation"; // For active state highlighting

const ContactSidebar = ({ contactId, defaultLabel }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  // Default menu items if not provided via props
  const defaultMenuItems = [
    {
      label: "Details",
      badge: null,
      href: `/contacts/${contactId}/details`,
      active: false,
    },
    {
      label: "Cases",
      badge: null,
      href: `/contacts/${contactId}/cases`,
      active: false,
    },
    {
      label: "Letters",
      badge: null,
      href: `/contacts/${contactId}/letters`,
      active: false,
    },
    {
      label: "Invoices",
      badge: "13",
      href: `/contacts/${contactId}/invoices`,
      active: false,
    },
  ];

  const items = defaultMenuItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => {
          const isActive =
            defaultLabel === item.label || currentPath === item.href;
          return (
            <Link key={index} href={item.href}>
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-purple-50 text-purple-700" : "text-gray-700"
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-sm text-gray-500 ${isActive ? "text-purple-500" : ""}`}
                  >
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

export default ContactSidebar;
