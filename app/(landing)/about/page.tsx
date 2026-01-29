"use client";

import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  AboutHero,
  AboutStory,
  AboutVisionMission,
  AboutTeam,
  AboutJourney,
  AboutCta,
} from "@/components/(landing)/about";
import { teamMembers, milestones } from "@/data/(landing)/abouts/about";

export default function AboutPage() {
  return (
    <LandingPageLayout>
      <AboutHero />
      <AboutStory />
      <AboutVisionMission />
      <AboutTeam teamMembers={teamMembers} />
      <AboutJourney milestones={milestones} />
      <AboutCta />
    </LandingPageLayout>
  );
}
