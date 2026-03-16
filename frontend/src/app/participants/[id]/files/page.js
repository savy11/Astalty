import ParticipantFilesPage from '../../../components/participants/files';

// export default function ParticipantFiles() {
//   return <ParticipantFilesPage />;
// }

export default async function ParticipantFiles({ params }) {
  const { id } = await params;

  return <ParticipantFilesPage participantId={id} />;
}