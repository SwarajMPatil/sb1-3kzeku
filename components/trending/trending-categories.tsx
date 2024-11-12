"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import useSWR from "swr";
import { getTrendingCategories } from "@/lib/api";

export function TrendingCategories() {
  const { data: categories, isLoading } = useSWR("trending-categories", getTrendingCategories, {
    refreshInterval: 300000,
  });

  if (isLoading) return <CategoriesSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories?.map((category: any) => (
        <Card key={category.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <Badge variant={category.market_cap_change_24h >= 0 ? "default" : "destructive"}>
              {category.market_cap_change_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(category.market_cap_change_24h).toFixed(2)}%
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-medium">
                ${category.market_cap.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Volume 24h</span>
              <span className="font-medium">
                ${category.volume_24h.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Top Coins</span>
              <span className="font-medium">
                {category.top_coins.slice(0, 3).join(", ")}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}