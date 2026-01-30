import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPublicBlog } from "@/lib/api";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { Container } from "@/components/(landing)/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CATEGORY_LABEL: Record<string, string> = {
  tips: "Tips",
  travel: "Travel",
  trips: "Trips",
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!id || isNaN(numId)) notFound();

  const blog = await fetchPublicBlog(numId);
  if (!blog) notFound();

  const date =
    blog.created_at != null
      ? new Date(blog.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";
  const categoryLabel = CATEGORY_LABEL[blog.category] ?? blog.category;

  return (
    <LandingPageLayout>
      <article className="py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Link>
            <header className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#b42519]/10 text-[#b42519] text-sm font-medium mb-4">
                {categoryLabel}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{date}</span>
                <span>•</span>
                <span>Oleh {blog.author?.name ?? "Admin"}</span>
              </div>
            </header>

            {(blog.featured_image_url ?? blog.assets?.[0]?.file_url) && (
              <div className="mb-8 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={blog.featured_image_url ?? blog.assets?.[0]?.file_url ?? ""}
                  alt={blog.assets?.[0]?.title ?? blog.title}
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#b42519]"
              dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
            />

            {blog.assets && blog.assets.length > 1 && (
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                {blog.assets.slice(1).map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-lg overflow-hidden border border-gray-100"
                  >
                    <img
                      src={asset.file_url}
                      alt={asset.title ?? ""}
                      className="w-full h-48 object-cover"
                    />
                    {asset.title && (
                      <p className="p-2 text-sm text-gray-600">{asset.title}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 pt-8 border-t">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Daftar Blog
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </LandingPageLayout>
  );
}