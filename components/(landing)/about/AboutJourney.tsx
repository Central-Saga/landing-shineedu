"use client";

import { Container } from "../Container";
import type { Milestone } from "@/data/(landing)/abouts/about";
import { cn } from "@/lib/utils";

interface AboutJourneyProps {
  milestones: Milestone[];
}

export function AboutJourney({ milestones }: AboutJourneyProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Perjalanan Kami
          </h2>
          <p className="text-gray-600">
            Jejak langkah kami dalam membangun dan mengembangkan Shine
            Education hingga saat ini
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 h-full w-0.5 bg-[#b42519]" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col md:gap-8 items-start",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-[#b42519] z-10" />
                  <div
                    className={cn(
                      "pl-12 md:pl-0 md:w-1/2",
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block px-4 py-1 text-white font-bold rounded-full mb-2 shadow-lg transition-colors",
                        index % 2 === 0
                          ? "bg-[#b42519] hover:bg-[#7a160d]"
                          : "bg-[#d2a741] hover:bg-[#ad8934]"
                      )}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
