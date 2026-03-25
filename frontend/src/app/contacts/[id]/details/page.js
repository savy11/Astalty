// app/contacts/[id]/page.js
import ContactDetail from "../../../components/contacts/details";

const contact = {
  id: 1,
  name: "Test User",
  type: "Plan manager",
  company: "Test Company",
  email: "test@example.com",
  phone: "+61 1234567890",
};

export default function Page() {
  return <ContactDetail contact={contact} />;
}
