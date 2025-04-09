import { useEffect, useState } from "react";
import { Star, Pencil, Trash, Share2, Copy, Check, Clock, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGlobalContext from "@/hooks/useGlobalContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export function ApiCard({
  _id,
  name,
  endpoint,
  entries,
  isPublic,
  owner,
  tags = [],
  category = "Ecommerce",
  createdAt,
  starredBy = [],
}) {
  const { getToken } = useAuth();
  const { users, user, deleteApi, starApi, unstarApi, showToast } = useGlobalContext();
  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState(starredBy.length);
  const [ownerData, setOwnerData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const result = users.find((u) => u._id === owner);
    setOwnerData(result || {});
    if (owner === user?._id) {
      setIsOwner(true);
    }
    setIsStarred(Array.isArray(starredBy) && user?._id && starredBy.includes(user._id));
  }, [users, owner, user, starredBy]);

  const toggleStar = async () => {
    try {
      const token = await getToken();
      if (isStarred) {
        await unstarApi(_id, token);
        setIsStarred(false);
        setCount(prev => prev - 1);
        showToast("API removed from favorites", "info");
      } else {
        await starApi(_id, token);
        setIsStarred(true);
        setCount(prev => prev + 1);
        showToast("API added to favorites", "success");
      }
    } catch (error) {
      showToast("Failed to update star status", "error");
    }
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
          url: apiUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(apiUrl);
      showToast("Link copied to clipboard", "success");
    }
  };

  const onDelete = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this API?')) {
        return;
      }
      const token = await getToken();
      await deleteApi(_id, token);
      showToast("API deleted successfully", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to delete API", "error");
    }
  }

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Just now";
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Just now";
      }
      
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      // Less than a minute
      if (diff < 60000) return "Just now";
      
      // Less than an hour
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}m ago`;
      }
      
      // Less than a day
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}h ago`;
      }
      
      // Less than a week
      if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}d ago`;
      }
      
      // Format as date
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
      
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Just now";
    }
  };

  return (
    <Card className="flex flex-col w-full h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg sm:text-xl font-semibold tracking-tight truncate max-w-full">
                {name}
              </CardTitle>
              {category && (
                <Badge variant="outline" className="capitalize text-xs whitespace-nowrap">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={toggleStar}
                    disabled={!user}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        isStarred ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                    <span className="sr-only">Star API</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isStarred ? "Unstar" : "Star"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground">{count}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-3 px-4 pt-0 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <span className="mr-1 font-medium">{entries}</span>
              entries
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              {formatDate(createdAt)}
            </div>
          </div>
          <div>
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
                  className="h-6 w-6 rounded-full flex-shrink-0"
                  onClick={handleCopyEndpoint}
                >
                  {isCopied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isCopied ? "Copied!" : "Copy endpoint"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="min-h-8">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col space-y-3 border-t p-4">
        <div className="flex items-center justify-between w-full">
          <Link to={`/profile/${owner}`} className="flex items-center gap-3 min-w-0 max-w-[60%]">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-8 w-8 border flex-shrink-0">
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
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="truncate">@{ownerData?.username || "unknown"}</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-1 flex-shrink-0">
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
            
            {isOwner && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`/edit-api/${_id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
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
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={onDelete}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete API</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        <Link to={`/api-details/${_id}`} className="w-full">
          <Button 
            variant="default" 
            className="w-full flex items-center justify-center gap-2"
          >
            <span>View Details</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}