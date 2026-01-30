"use client";

import { useEffect, useState } from "react";
import { fetchPublicBlogs, mapPublicBlogToPost } from "@/lib/api";
import type { BlogPostShape } from "@/lib/api";
import { BlogPageContent } from "./BlogPageContent";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { BlogsHero, BlogsSearchFilter, BlogsNewsletter } from "./index";
import { Container } from "../Container";

export function BlogListClient() {
  const [posts, setPosts] = useState<BlogPostShape[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const items = await fetchPublicBlogs({ per_page: 50 });
        if (!cancelled) {
          setPosts(items.map(mapPublicBlogToPost));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Gagal memuat artikel");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <LandingPageLayout>
        <BlogsHero />
        <BlogsSearchFilter
          searchQuery=""
          onSearchChange={() => {}}
          categories={["Semua", "Tips", "Travel", "Trips"]}
          activeCategory="Semua"
          onCategoryChange={() => {}}
        />
        <section className="py-8 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <BlogsNewsletter />
      </LandingPageLayout>
    );
  }

  if (error) {
    return (
      <LandingPageLayout>
        <BlogsHero />
        <BlogsSearchFilter
          searchQuery=""
          onSearchChange={() => {}}
          categories={["Semua", "Tips", "Travel", "Trips"]}
          activeCategory="Semua"
          onCategoryChange={() => {}}
        />
        <section className="py-8 bg-white">
          <Container>
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <p className="mt-2 text-gray-500 text-sm">
                Pastikan API backend berjalan dan CORS mengizinkan domain ini.
              </p>
            </div>
          </Container>
        </section>
        <BlogsNewsletter />
      </LandingPageLayout>
    );
  }

  return <BlogPageContent posts={posts} />;
}
