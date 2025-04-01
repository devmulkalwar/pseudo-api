import { useEffect, useState } from "react";
import { Star, Pencil, Trash, Share2, Copy, Check, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGlobalContext from "@/hooks/useGlobalContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ApiCard({
  _id,
  name,
  description,
  endpoint,
  entries,
  isPublic,
  owner,
  tags = [],
  category = "Ecommerce",
  createdAt,
  starredBy = [],
  onEdit = () => {},
  onDelete = () => {},
}) {
  const { users, user } = useGlobalContext();
  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState(starredBy.length);
  const [ownerData, setOwnerData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const result = users.find((user) => user._id === owner);
    setOwnerData(result || {});
    if (owner === user?._id) {
      setIsOwner(true);
    }
  }, [users, owner, user]);

  const toggleStar = () => {
    setIsStarred((prev) => {
      const newValue = !prev;
      setCount((prevCount) => (newValue ? prevCount + 1 : prevCount - 1));
      return newValue;
    });
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(endpoint);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareApi = () => {
    const apiUrl = `${window.location.origin}/apis/${_id}`;
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: description,
          url: apiUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(apiUrl);
    }
  };

  return (
    <Card className="w-full max-w-md transition-all duration-200 hover:shadow-md">
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-semibold tracking-tight truncate">
                {name}
              </CardTitle>
              {category && (
                <Badge variant="outline" className="capitalize text-xs">
                  {category}
                </Badge>
              )}
            </div>
            <CardDescription className="line-clamp-2 text-sm">
              {description}
            </CardDescription>
            <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(createdAt).toLocaleDateString()}
              </span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleShareApi}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share API</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-1 font-medium">{entries}</span>
            entries
          </div>
          <div className="flex items-center">
            {isPublic ? (
              <Badge variant="secondary" className="text-xs px-2 py-0">
                Public
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs px-2 py-0">
                Private
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 rounded-md bg-muted p-2">
          <code className="font-mono text-xs truncate flex-1" title={endpoint}>
            {endpoint}
          </code>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={handleCopyEndpoint}
                >
                  {isCopied ? (
                    <Check className="h-3 w-3 text-primary" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isCopied ? "Copied!" : "Copy endpoint"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-8 w-8 border">
            <AvatarImage
              src={ownerData?.profileImage || "/default-avatar.png"}
              alt={ownerData?.fullName || "User"}
            />
            <AvatarFallback className="text-xs">
              {ownerData?.fullName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {ownerData?.fullName || "Unknown"}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>@{ownerData?.username || "unknown"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isOwner && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={onEdit}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit API</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {isOwner && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={onDelete}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete API</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <div className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={toggleStar}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        isStarred ? "fill-primary stroke-primary" : ""
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Star API</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground">{count}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}