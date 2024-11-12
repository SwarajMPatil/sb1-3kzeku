"use client";

import { useState } from "react";
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { PortfolioAssets } from "@/components/portfolio/portfolio-assets";
import { AddAssetDialog } from "@/components/portfolio/add-asset-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function PortfolioPage() {
  const [showAddAsset, setShowAddAsset] = useState(false);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">
            Track and manage your digital asset investments
          </p>
        </div>
        <Button onClick={() => setShowAddAsset(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <PortfolioOverview />
      <PortfolioAssets />
      <AddAssetDialog open={showAddAsset} onOpenChange={setShowAddAsset} />
    </div>
  );
}