"use client";

import { useState, useMemo, useEffect } from "react";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  JobVacanciesHero,
  JobVacanciesList,
  WhyJoinUs,
  JobVacanciesCta,
  JobDetailModal,
} from "@/components/(landing)/(job)/job-vacancies";
import { fetchPublicJobVacancies, type JobVacancyUI } from "@/lib/api";

export default function JobVacanciesPage() {
  const [jobs, setJobs] = useState<JobVacancyUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) ?? null,
    [jobs, selectedJobId]
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPublicJobVacancies()
      .then((data) => {
        if (!cancelled) setJobs(data);
      })
      .catch(() => {
        if (!cancelled) setError("Gagal memuat lowongan. Coba lagi nanti.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LandingPageLayout>
      <JobVacanciesHero />
      {error && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 text-center text-red-600">
            {error}
          </div>
        </section>
      )}
      {loading ? (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            Memuat lowongan...
          </div>
        </section>
      ) : jobs.length === 0 ? (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            Belum ada lowongan tersedia saat ini.
          </div>
        </section>
      ) : (
        <JobVacanciesList jobs={jobs} onSelectJob={setSelectedJobId} />
      )}
      <WhyJoinUs />
      <JobVacanciesCta />
      {selectedJobId !== null && selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </LandingPageLayout>
  );
}
