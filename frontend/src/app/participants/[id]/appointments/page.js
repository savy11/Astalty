import ParticipantAppointmentsPage from "../../../components/participants/appointments";
export default function AppointmentsPage( { params }) {
  const { id } = params;
  return <ParticipantAppointmentsPage participantId={id} />;
}