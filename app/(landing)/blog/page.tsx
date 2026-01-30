import {
  fetchPublicBlogs,
  mapPublicBlogToPost,
} from "@/lib/api";
import { BlogPageContent } from "@/components/(landing)/blogs";

export default async function BlogPage() {
  const items = await fetchPublicBlogs({ per_page: 50 });
  const posts = items.map(mapPublicBlogToPost);

  return <BlogPageContent posts={posts} />;
}
