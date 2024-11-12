import { Suspense } from "react";
import { MarketStats } from "@/components/markets/market-stats";
import { CryptoTable } from "@/components/markets/crypto-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Cryptocurrency Markets</h1>
        <p className="text-muted-foreground">
          Track real-time cryptocurrency prices, market cap, volume, and more.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-[200px]" />}>
        <MarketStats />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[500px]" />}>
        <CryptoTable />
      </Suspense>
    </div>
  );
}