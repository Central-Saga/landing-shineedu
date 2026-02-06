"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DaftarProgramLayout,
  DaftarProgramSuccess,
  DaftarProgramForm,
} from ".";

export default function DaftarProgramPage() {
  const searchParams = useSearchParams();
  const programIdParam = searchParams.get("programId");
  const [success, setSuccess] = useState(false);

  return (
    <DaftarProgramLayout>
      {success ? (
        <DaftarProgramSuccess />
      ) : (
        <DaftarProgramForm
          programIdParam={programIdParam}
          onSuccess={() => setSuccess(true)}
        />
      )}
    </DaftarProgramLayout>
  );
}
