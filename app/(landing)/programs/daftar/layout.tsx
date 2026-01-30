import { Suspense } from "react";
import { DaftarProgramLayout } from "@/components/(landing)/programs/daftar";

export default function DaftarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <DaftarProgramLayout>
          <div className="min-h-[50vh] flex items-center justify-center">
            Memuat...
          </div>
        </DaftarProgramLayout>
      }
    >
      {children}
    </Suspense>
  );
}
