import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface NewsArticle {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  category: string;
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <div className="relative h-48">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
          <h3 className="font-semibold line-clamp-2 text-lg group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {article.description}
          </p>
          <div className="text-sm font-medium text-muted-foreground">
            {article.source}
          </div>
        </div>
      </a>
    </Card>
  );
}