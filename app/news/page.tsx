"use client";

import { useState } from "react";
import { NewsCard } from "@/components/news/news-card";
import { NewsFilter } from "@/components/news/news-filter";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { getNews } from "@/lib/api";

const categories = ["Markets", "Business", "Regulation", "Technology"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: news, isLoading } = useSWR("news", getNews, {
    refreshInterval: 300000, // Refresh every 5 minutes
  });

  const filteredNews = selectedCategory === "all"
    ? news
    : news?.filter((article: any) => article.category === selectedCategory);

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Latest News</h1>
        <p className="text-muted-foreground">
          Stay informed with the latest updates from the digital asset industry
        </p>
      </div>

      <NewsFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews?.map((article: any) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}