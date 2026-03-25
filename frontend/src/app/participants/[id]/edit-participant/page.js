"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditParticipantRedirect() {

  const { id } = useParams();
  const router = useRouter();


  console.log("move1"+id)

  useEffect(() => {

    if (!id) return;

    console.log("move1"+id)

    router.push(`/participants/${id}/edit-participant`);

  }, [id, router]);

  return <div>Redirecting...</div>;
}