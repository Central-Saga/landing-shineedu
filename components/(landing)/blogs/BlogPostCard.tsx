"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@/data/(landing)/blogs/blog-posts";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/90 text-[#b42519] hover:bg-white shadow-md rounded-full">
              {post.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 bg-white">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>Oleh {post.author}</span>
          </div>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          <Link href={`/blog/${post.id}`}>
            <Button
              variant="link"
              className="p-0 h-auto text-[#b42519] hover:text-[#7a160d]"
            >
              Baca Selengkapnya →
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
