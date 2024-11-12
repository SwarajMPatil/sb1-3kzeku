"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import useSWR from "swr";
import { getMarketStats } from "@/lib/api";

export function MarketStats() {
  const { data: stats, isLoading } = useSWR("market-stats", getMarketStats, {
    refreshInterval: 60000,
  });

  if (isLoading) {
    return <StatsGridSkeleton />;
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Market Cap"
        value={formatNumber(stats?.total_market_cap?.usd || 0)}
        icon={<DollarSign className="w-4 h-4" />}
      />
      <StatCard
        title="24h Volume"
        value={formatNumber(stats?.total_volume?.usd || 0)}
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <StatCard
        title="BTC Dominance"
        value={`${stats?.market_cap_percentage?.btc.toFixed(1)}%`}
        icon={<Percent className="w-4 h-4" />}
      />
      <StatCard
        title="Active Cryptocurrencies"
        value={stats?.active_cryptocurrencies.toLocaleString()}
        icon={<TrendingDown className="w-4 h-4" />}
      />
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}

function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card className="p-6" key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-32" />
        </Card>
      ))}
    </div>
  );
}