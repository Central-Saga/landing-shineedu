"use client";

import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { GalleryHero, GalleryGrid } from "@/components/(landing)/gallery";
import { galleryItems } from "@/data/(landing)/gallery/gallery";

export default function GalleryPage() {
  return (
    <LandingPageLayout>
      <GalleryHero />
      <GalleryGrid items={galleryItems} />
    </LandingPageLayout>
  );
}
