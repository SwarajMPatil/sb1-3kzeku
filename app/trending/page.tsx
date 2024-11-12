"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingCoins } from "@/components/trending/trending-coins";
import { GainersLosers } from "@/components/trending/gainers-losers";
import { TrendingCategories } from "@/components/trending/trending-categories";

export default function TrendingPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Trending</h1>
        <p className="text-muted-foreground">
          Discover the most popular and trending digital assets in the market
        </p>
      </div>

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trending">Trending Coins</TabsTrigger>
          <TabsTrigger value="gainers-losers">Top Gainers & Losers</TabsTrigger>
          <TabsTrigger value="categories">Trending Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-8">
          <TrendingCoins />
        </TabsContent>

        <TabsContent value="gainers-losers" className="space-y-8">
          <GainersLosers />
        </TabsContent>

        <TabsContent value="categories" className="space-y-8">
          <TrendingCategories />
        </TabsContent>
      </Tabs>
    </div>
  );
}