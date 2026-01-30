"use client";

import { useState, useMemo } from "react";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  BlogsHero,
  BlogsSearchFilter,
  BlogsGrid,
  BlogsNewsletter,
} from "@/components/(landing)/blogs";
import type { BlogPostShape } from "@/lib/api";

const BLOG_CATEGORIES = ["Semua", "Tips", "Travel", "Trips"];

interface BlogPageContentProps {
  posts: BlogPostShape[];
}

export function BlogPageContent({ posts }: BlogPageContentProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const categoryMatch =
          activeCategory === "Semua" || post.category === activeCategory;
        const searchMatch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
      }),
    [posts, activeCategory, searchQuery]
  );

  return (
    <LandingPageLayout>
      <BlogsHero />
      <BlogsSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={BLOG_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogsGrid posts={filteredPosts} />
      <BlogsNewsletter />
    </LandingPageLayout>
  );
}
