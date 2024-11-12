"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { getTopCryptos } from "@/lib/api";
import Image from "next/image";

export function CryptoTable() {
  const [search, setSearch] = useState("");
  const { data: cryptos, isLoading } = useSWR("top-cryptos", getTopCryptos, {
    refreshInterval: 30000,
  });

  const filteredCryptos = cryptos?.filter((crypto: any) =>
    crypto.name.toLowerCase().includes(search.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search cryptocurrencies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">7d %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCryptos?.map((crypto: any) => (
              <TableRow key={crypto.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground uppercase">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${crypto.current_price.toLocaleString()}
                </TableCell>
                <TableCell className={`text-right ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell className={`text-right ${getPriceChangeColor(crypto.price_change_percentage_7d_in_currency)}`}>
                  {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  ${crypto.market_cap.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${crypto.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function getPriceChangeColor(change: number) {
  if (change > 0) return "text-green-500";
  if (change < 0) return "text-red-500";
  return "";
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[300px]" />
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h %</TableHead>
              <TableHead>7d %</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}