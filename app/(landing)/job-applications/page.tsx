"use client";

import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  JobApplicationsHero,
  JobApplicationsTabs,
  JobApplicationsFaq,
} from "@/components/(landing)/(job)/job-applications";

export default function JobApplicationsPage() {
  return (
    <LandingPageLayout>
      <JobApplicationsHero />
      <JobApplicationsTabs />
      <JobApplicationsFaq />
    </LandingPageLayout>
  );
}
