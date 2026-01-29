"use client";

import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import type { TeamMember } from "@/data/(landing)/abouts/about";

interface AboutTeamProps {
  teamMembers: TeamMember[];
}

function AvatarPlaceholder() {
  return (
    <svg
      className="w-24 h-24 text-muted-foreground"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AboutTeam({ teamMembers }: AboutTeamProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Tim Kami
          </h2>
          <p className="text-gray-600">
            Kenali para profesional berdedikasi yang bekerja keras di balik
            layar untuk memberikan pendidikan terbaik
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <AvatarPlaceholder />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[#d2a741] font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
