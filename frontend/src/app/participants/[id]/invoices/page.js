import ParticipantInvoicesPage from "../../../components/participants/invoices";

// export default function ParticipantInvoices() {
//   return <ParticipantInvoicesPage />;
// }

export default async function ParticipantInvoices({ params }) {
  const { id } = await params;

  return <ParticipantInvoicesPage participantId={id} />;
}
