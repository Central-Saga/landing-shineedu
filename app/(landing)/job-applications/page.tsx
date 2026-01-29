"use client";

import Navbar from "@/components/(landing)/homes/Navbar";
import Footer from "@/components/(landing)/homes/Footer";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import { JobApplicationsHero } from "@/components/landing/job-applications/JobApplicationsHero";
import { JobApplicationsTabs } from "@/components/landing/job-applications/JobApplicationsTabs";
import { JobApplicationsFaq } from "@/components/landing/job-applications/JobApplicationsFaq";

export default function JobApplicationsPage() {
  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />

      <Navbar />

      <JobApplicationsHero />
      <JobApplicationsTabs />
      <JobApplicationsFaq />

      <Footer />
    </main>
  );
}
