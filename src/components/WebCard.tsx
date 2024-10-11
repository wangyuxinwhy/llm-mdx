import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface WebCardProps {
  url: string;
}

interface MetaData {
  title: string;
  description: string;
  image: string;
}

export function WebCard({ url }: WebCardProps) {
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 这里应该是一个获取元数据的函数
    // 为了示例，我们使用一个模拟的异步函数
    const fetchMetadata = async () => {
      setLoading(true);
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMetadata({
        title: "MDN Web Docs",
        description: "Cross-Origin Resource Sharing (CORS)",
        image: "https://developer.mozilla.org/mdn-social-share.png",
      });
      setLoading(false);
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline"
        >
          {metadata?.image && (
            <img
              src={metadata.image}
              alt={metadata.title}
              className="w-full h-24 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 mt-2">
              {metadata?.title}
            </h3>
            <p className="text-sm text-gray-600">{metadata?.description}</p>
          </div>
        </a>
      </CardContent>
    </Card>
  );
}
