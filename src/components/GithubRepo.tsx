import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface GithubRepoProps {
  owner: string;
  name: string;
}

interface RepoData {
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export function GithubRepo({ owner, name }: GithubRepoProps) {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setRepoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repo data:", error);
        setLoading(false);
      });
  }, [owner, name]);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (!repoData) {
    return (
      <Card className="w-full max-w-md p-4">
        Failed to load repository data.
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={repoData.owner.avatar_url}
            alt={repoData.owner.login}
          />
          <AvatarFallback>
            {repoData.owner.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold p-0 m-0">
            {owner}/{name}
          </CardTitle>
          <CardDescription>{repoData.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>{repoData.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            <span>{repoData.forks_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{repoData.watchers_count.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
