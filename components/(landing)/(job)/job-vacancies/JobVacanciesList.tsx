"use client";

import { Container } from "../../Container";
import { JobVacancyCard } from "./JobVacancyCard";
import type { JobVacancy } from "@/data/(landing)/(job)/job-vacancies/job-vacancies";

interface JobVacanciesListProps {
  jobs: JobVacancy[];
  onSelectJob: (id: number) => void;
}

export function JobVacanciesList({ jobs, onSelectJob }: JobVacanciesListProps) {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobVacancyCard
              key={job.id}
              job={job}
              onDetail={onSelectJob}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
