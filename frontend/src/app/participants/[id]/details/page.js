"use client";

import { useParams } from "next/navigation";
import Details from "../../../components/participants/details";

export default function ParticipantDetailsPage() {

  const { id } = useParams();

  return <Details participantId={id} />;

}