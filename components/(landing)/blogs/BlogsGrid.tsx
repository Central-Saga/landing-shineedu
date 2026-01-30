"use client";

import { Container } from "../Container";
import { BlogPostCard } from "./BlogPostCard";
import type { BlogPostShape } from "@/lib/api";

interface BlogsGridProps {
  posts: BlogPostShape[];
}

export function BlogsGrid({ posts }: BlogsGridProps) {
  if (posts.length === 0) {
    return (
      <section className="py-8 bg-white">
        <Container>
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              Tidak ada artikel yang ditemukan.
            </h3>
            <p className="mt-2 text-gray-500">
              Silakan coba kata kunci lain atau ubah kategori.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
