"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, ExternalLink } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { getTrendingCoins } from "@/lib/api";

export function TrendingCoins() {
  const { data: trendingCoins, isLoading } = useSWR("trending-coins", getTrendingCoins, {
    refreshInterval: 60000,
  });

  if (isLoading) return <TrendingCoinsSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingCoins?.map((coin: any) => (
        <Card key={coin.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={coin.thumb}
                alt={coin.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">{coin.name}</h3>
                <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
              </div>
            </div>
            <a
              href={`https://www.coingecko.com/en/coins/${coin.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Market Cap Rank</span>
              <span className="font-medium">#{coin.market_cap_rank}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price (BTC)</span>
              <span className="font-medium">{coin.price_btc.toFixed(8)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">{coin.score + 1}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TrendingCoinsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}