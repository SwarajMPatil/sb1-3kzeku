"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import useSWR from "swr";

interface Asset {
  coin: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

interface Portfolio {
  _id: string;
  userId: string;
  name: string;
  assets: Asset[];
}

export function PortfolioAssets() {
  const { data: portfolios, isLoading, error } = useSWR<Portfolio[]>("/api/portfolio");

  if (isLoading) return <AssetsSkeleton />;
  if (error) return null;

  const assets = portfolios?.[0]?.assets || [];

  // Mock current prices for demonstration
  const mockPrices: Record<string, number> = {
    Bitcoin: 50000,
    Ethereum: 3000,
    // Add more mock prices as needed
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Avg. Price</TableHead>
            <TableHead className="text-right">P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset, index) => {
            const currentPrice = mockPrices[asset.coin] || asset.purchasePrice;
            const value = asset.amount * currentPrice;
            const pnl = value - (asset.amount * asset.purchasePrice);
            const pnlPercentage = ((currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;

            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full" />
                    <div>
                      <div className="font-medium">{asset.coin}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{asset.amount}</TableCell>
                <TableCell className="text-right">
                  ${value.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${asset.purchasePrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className={pnl >= 0 ? "text-green-500" : "text-red-500"}>
                    ${pnl.toLocaleString()} ({pnlPercentage.toFixed(2)}%)
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          {assets.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No assets added yet. Click "Add Asset" to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

function AssetsSkeleton() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Avg. Price</TableHead>
            <TableHead>P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(5)].map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}