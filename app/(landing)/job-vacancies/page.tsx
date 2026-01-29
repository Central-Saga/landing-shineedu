"use client";

import { useState, useMemo } from "react";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  JobVacanciesHero,
  JobVacanciesList,
  WhyJoinUs,
  JobVacanciesCta,
  JobDetailModal,
} from "@/components/(landing)/(job)/job-vacancies";
import { vacancyData } from "@/data/(landing)/(job)/job-vacancies/job-vacancies";

export default function JobVacanciesPage() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const selectedJob = useMemo(
    () => vacancyData.find((j) => j.id === selectedJobId) ?? null,
    [selectedJobId]
  );

  return (
    <LandingPageLayout>
      <JobVacanciesHero />
      <JobVacanciesList jobs={vacancyData} onSelectJob={setSelectedJobId} />
      <WhyJoinUs />
      <JobVacanciesCta />
      {selectedJobId !== null && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </LandingPageLayout>
  );
}
