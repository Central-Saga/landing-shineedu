"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/(landing)/Container";
import { JobApplicationForm } from "./JobApplicationForm";
import { TrackApplicationForm } from "./TrackApplicationForm";

export function JobApplicationsTabs() {
  const [activeTab, setActiveTab] = useState("apply");

  return (
    <section className="py-12 bg-white">
      <Container>
        <Tabs
          defaultValue="apply"
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="apply">Kirim Lamaran</TabsTrigger>
            <TabsTrigger value="track">Pantau Status</TabsTrigger>
          </TabsList>

          <TabsContent value="apply" className="mt-6">
            <JobApplicationForm />
          </TabsContent>

          <TabsContent value="track" className="mt-6">
            <TrackApplicationForm />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}

