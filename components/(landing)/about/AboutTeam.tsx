"use client";

import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import { HorizontalAutoScroll } from "./HorizontalAutoScroll";
import type {
  TeamMember,
  TeachersBySubject,
  PengelolaByBidang,
} from "@/data/(landing)/abouts/about";

function AvatarPlaceholder() {
  return (
    <svg
      className="w-20 h-24 text-muted-foreground"
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

function MemberCard({
  member,
  centerContent,
}: {
  member: TeamMember;
  centerContent?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = member.image && !imgError;

  return (
    <Card className="overflow-hidden h-full flex flex-col max-w-[320px] w-full">
      <div className="relative w-full aspect-3/4 min-h-[280px] sm:min-h-[300px] shrink-0 bg-gray-100">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <AvatarPlaceholder />
          </div>
        )}
      </div>
      <div
        className={`p-6 flex-1 flex flex-col ${centerContent ? "text-center" : ""}`}
      >
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-[#d2a741] font-medium mb-4">{member.role}</p>
        <p className="text-gray-600 text-sm flex-1">{member.bio}</p>
      </div>
    </Card>
  );
}

/** Kartu penjelasan nama materi — tampil di sebelah kiri tim guru dalam satu baris horizontal */
function MateriCard({
  subjectLabel,
  description,
}: {
  subjectLabel: string;
  description: string;
}) {
  return (
    <Card className="shrink-0 min-w-[200px] sm:min-w-[240px] h-full flex flex-col justify-center bg-[#fef8f6] border-[#b42519]/20">
      <div className="p-6">
        <h4 className="text-xl md:text-2xl font-bold text-[#b42519] mb-2">
          {subjectLabel}
        </h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Card>
  );
}

/** Kartu bidang pengelola (Admin, Content Creator, dll.) — untuk slideshow pengelola */
function BidangCard({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <Card className="shrink-0 min-w-[200px] sm:min-w-[220px] h-full flex flex-col justify-center bg-[#fef8f6] border-[#b42519]/20">
      <div className="p-6 text-center">
        <h4 className="text-xl md:text-2xl font-bold text-[#b42519] mb-2">
          {label}
        </h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Card>
  );
}

interface AboutTeamProps {
  owner: TeamMember;
  pengelolaByBidang: PengelolaByBidang[];
  teachersBySubject: TeachersBySubject[];
}

export function AboutTeam({
  owner,
  pengelolaByBidang,
  teachersBySubject,
}: AboutTeamProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Tim Kami
          </h2>
          <p className="text-gray-600">
            Kenali para profesional berdedikasi yang bekerja keras di balik
            layar untuk memberikan pendidikan terbaik.
          </p>
        </div>

        {/* Owner — satu orang, rata tengah */}
        <div className="mb-14 flex flex-col items-center text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[#b42519] mb-2">
            Owner
          </h3>
          <p className="text-gray-600 text-sm mb-6 max-w-md">
            Pendiri dan pemilik Shine Education.
          </p>
          <div className="max-w-[320px] w-full mx-auto">
            <MemberCard member={owner} centerContent />
          </div>
        </div>

        {/* Pengelola — slideshow horizontal dengan bidang (Admin, Content Creator, Manajemen), auto-scroll, kartu ditengah */}
        <div className="mb-14 flex flex-col justify-center items-center text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#b42519] mb-2">
            Pengelola Shine
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Tim yang mengelola operasional, konten, dan kurikulum Shine.
          </p>
          <div className="w-full flex justify-center">
            <HorizontalAutoScroll
              speed={2}
              intervalMs={20}
              labelPlay="Putar auto-scroll"
              labelPause="Jeda — geser manual"
            >
              {pengelolaByBidang.map((group) => (
                <Fragment key={group.bidang}>
                  <div className="shrink-0 snap-center flex items-stretch">
                    <BidangCard
                      label={group.label}
                      description={group.description}
                    />
                  </div>
                  {group.members.map((member, index) => (
                    <div
                      key={`${group.bidang}-${index}`}
                      className="shrink-0 snap-center min-w-[260px] sm:min-w-[280px] max-w-[320px] flex justify-center"
                    >
                      <MemberCard member={member} centerContent />
                    </div>
                  ))}
                </Fragment>
              ))}
            </HorizontalAutoScroll>
          </div>
        </div>

        {/* Guru — satu slideshow horizontal + auto-scroll, scrollbar disembunyikan, klik untuk jeda */}
        <div className="w-full flex flex-col items-center text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#b42519] mb-2">
            Guru
          </h3>
          <p className="text-gray-600 mb-6">
            Guru-guru yang mengajar berdasarkan masing-masing materi.
          </p>
          <HorizontalAutoScroll
            speed={1}
            intervalMs={25}
            labelPlay="Putar auto-scroll"
            labelPause="Jeda — geser manual"
          >
            {teachersBySubject.map((group) => (
              <Fragment key={group.subject}>
                <div className="shrink-0 snap-center">
                  <MateriCard
                    subjectLabel={group.subjectLabel}
                    description={`Guru yang mengajar materi ${group.subjectLabel}.`}
                  />
                </div>
                {group.teachers.map((teacher, index) => (
                  <div
                    key={index}
                    className="shrink-0 snap-center min-w-[260px] sm:min-w-[280px] max-w-[320px]"
                  >
                    <MemberCard member={teacher} />
                  </div>
                ))}
              </Fragment>
            ))}
          </HorizontalAutoScroll>
        </div>
      </Container>
    </section>
  );
}
