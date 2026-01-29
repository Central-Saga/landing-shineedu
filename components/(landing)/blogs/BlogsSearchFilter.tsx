"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Container } from "../Container";
import { cn } from "@/lib/utils";

interface BlogsSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogsSearchFilter({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}: BlogsSearchFilterProps) {
  return (
    <section className="pb-8 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between max-w-6xl mx-auto">
          <div className="relative w-full md:w-72">
            <Input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-4 py-1 text-sm rounded-full transition-all",
                  activeCategory === category
                    ? "bg-[#b42519] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
