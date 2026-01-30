import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { GalleryHero, GalleryGrid } from "@/components/(landing)/gallery";
import { fetchPublicGallery } from "@/lib/api";

export default async function GalleryPage() {
  const items = await fetchPublicGallery();
  return (
    <LandingPageLayout>
      <GalleryHero />
      <GalleryGrid items={items} />
    </LandingPageLayout>
  );
}
