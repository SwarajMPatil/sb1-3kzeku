"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { getGainersLosers } from "@/lib/api";

export function GainersLosers() {
  const { data, isLoading } = useSWR("gainers-losers", getGainersLosers, {
    refreshInterval: 60000,
  });

  if (isLoading) return <GainersLosersSkeleton />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Top Gainers (24h)
        </h2>
        <div className="space-y-4">
          {data?.gainers.map((coin: any) => (
            <CoinCard key={coin.id} coin={coin} type="gainer" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-500" />
          Top Losers (24h)
        </h2>
        <div className="space-y-4">
          {data?.losers.map((coin: any) => (
            <CoinCard key={coin.id} coin={coin} type="loser" />
          ))}
        </div>
      </div>
    </div>
  );
}

function CoinCard({ coin, type }: { coin: any; type: 'gainer' | 'loser' }) {
  const priceChangeColor = type === 'gainer' ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium">{coin.name}</h3>
            <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">${coin.current_price.toLocaleString()}</div>
          <div className={`text-sm font-medium ${priceChangeColor}`}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </Card>
  );
}

function GainersLosersSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-4">
            {[...Array(5)].map((_, j) => (
              <Card key={j} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}