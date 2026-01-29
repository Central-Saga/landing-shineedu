"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { JobVacancy } from "@/data/(landing)/(job)/job-vacancies/job-vacancies";

interface JobVacancyCardProps {
  job: JobVacancy;
  onDetail: (id: number) => void;
}

export function JobVacancyCard({ job, onDetail }: JobVacancyCardProps) {
  const isFullTime = job.type === "Full-time";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
      <div>
        <div className="flex justify-between items-start mb-4">
          <Badge
            className={cn(
              "border-2 shadow-md",
              isFullTime
                ? "bg-[#b42519] text-white border-[#7a160d]"
                : "bg-[#d2a741] text-white border-[#ad8934]"
            )}
          >
            {job.type}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Ditutup: {job.endDate}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-gray-900">
            Kualifikasi:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {job.requirements.slice(0, 3).map((req, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-[#b42519] mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
            {job.requirements.length > 3 && (
              <li className="text-sm text-gray-500 italic">
                +{job.requirements.length - 3} kualifikasi lainnya
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-xs text-gray-500">
            Diposting: {job.postedDate}
          </span>
          <Button
            type="button"
            onClick={() => onDetail(job.id)}
            className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md"
          >
            Detail
          </Button>
        </div>
      </div>
    </Card>
  );
}
