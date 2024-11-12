import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart3, Newspaper, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
            alt="Digital Assets Background"
            fill
            className="object-cover blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Gateway to Digital Assets
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Discover, analyze, and track digital assets with real-time market data and expert insights
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Digital Asset Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <BarChart3 className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
              <p className="text-muted-foreground">
                Real-time data and advanced analytics for informed decision-making
              </p>
            </Card>

            <Card className="p-6">
              <Newspaper className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Latest News</h3>
              <p className="text-muted-foreground">
                Breaking news and in-depth coverage of the digital asset market
              </p>
            </Card>

            <Card className="p-6">
              <TrendingUp className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Trending Assets</h3>
              <p className="text-muted-foreground">
                Track the most popular and trending digital assets in real-time
              </p>
            </Card>

            <Card className="p-6">
              <Wallet className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-muted-foreground">
                Monitor and manage your digital asset portfolio with ease
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}