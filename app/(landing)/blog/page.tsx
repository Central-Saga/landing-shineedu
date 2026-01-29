"use client";

import { useState, useMemo } from "react";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import {
  BlogsHero,
  BlogsSearchFilter,
  BlogsGrid,
  BlogsNewsletter,
} from "@/components/(landing)/blogs";
import { blogPosts, blogCategories } from "@/data/(landing)/blogs/blog-posts";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      blogPosts.filter((post) => {
        const categoryMatch =
          activeCategory === "Semua" || post.category === activeCategory;
        const searchMatch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
      }),
    [activeCategory, searchQuery]
  );

  return (
    <LandingPageLayout>
      <BlogsHero />
      <BlogsSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={blogCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogsGrid posts={filteredPosts} />
      <BlogsNewsletter />
    </LandingPageLayout>
  );
}
