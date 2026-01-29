const baseImages = [
  { src: "/pichome/hero-section.JPG", label: "Kegiatan Belajar" },
  { src: "/picprogram/coding.png", label: "Kelas Coding" },
  { src: "/picprogram/calistung.png", label: "Kelas Calistung" },
  { src: "/picprogram/matematika.png", label: "Kelas Matematika" },
  { src: "/picprogram/bahasainggris.png", label: "Kelas Bahasa Inggris" },
];

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = Array.from(
  { length: 15 },
  (_, index) => {
    const base = baseImages[index % baseImages.length];
    return {
      id: index + 1,
      src: base.src,
      alt: `${base.label} ${index + 1}`,
    };
  }
);
