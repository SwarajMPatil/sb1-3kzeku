"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
} from "lucide-react";
import useSWR from "swr";

interface Asset {
  coin: string;
  amount: number;
  purchasePrice: number;
}

interface Portfolio {
  _id: string;
  userId: string;
  name: string;
  assets: Asset[];
}

export function PortfolioOverview() {
  const { data: portfolios, isLoading, error } = useSWR<Portfolio[]>("/api/portfolio");

  if (isLoading) return <OverviewSkeleton />;
  if (error) return null;

  const assets = portfolios?.[0]?.assets || [];

  // Mock current prices for demonstration
  const mockPrices: Record<string, number> = {
    Bitcoin: 50000,
    Ethereum: 3000,
    // Add more mock prices as needed
  };

  // Calculate portfolio statistics
  const stats = assets.reduce((acc, asset) => {
    const currentPrice = mockPrices[asset.coin] || asset.purchasePrice;
    const value = asset.amount * currentPrice;
    const originalValue = asset.amount * asset.purchasePrice;
    const pnl = value - originalValue;
    const pnlPercentage = ((value - originalValue) / originalValue) * 100;

    return {
      totalValue: acc.totalValue + value,
      totalPnl: acc.totalPnl + pnl,
      totalPnlPercentage: acc.totalOriginalValue > 0 
        ? ((acc.totalValue + value - acc.totalOriginalValue) / acc.totalOriginalValue) * 100
        : 0,
      totalOriginalValue: acc.totalOriginalValue + originalValue,
    };
  }, {
    totalValue: 0,
    totalPnl: 0,
    totalPnlPercentage: 0,
    totalOriginalValue: 0,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Value"
        value={`$${stats.totalValue.toLocaleString()}`}
        icon={<DollarSign className="w-4 h-4" />}
      />
      <StatCard
        title="Total P&L"
        value={`${stats.totalPnl >= 0 ? '+' : ''}$${stats.totalPnl.toLocaleString()}`}
        icon={stats.totalPnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        valueColor={stats.totalPnl >= 0 ? "text-green-500" : "text-red-500"}
      />
      <StatCard
        title="P&L %"
        value={`${stats.totalPnlPercentage >= 0 ? '+' : ''}${stats.totalPnlPercentage.toFixed(2)}%`}
        icon={stats.totalPnlPercentage >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        valueColor={stats.totalPnlPercentage >= 0 ? "text-green-500" : "text-red-500"}
      />
      <StatCard
        title="Total Assets"
        value={assets.length.toString()}
        icon={<PieChart className="w-4 h-4" />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  valueColor = "",
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </Card>
  );
}

function OverviewSkeleton() {
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