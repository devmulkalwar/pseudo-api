import { useEffect, useState } from "react";
import { Star, Pencil, Trash, Share, Copy, Check, Share2Icon, ShareIcon, Share2 } from "lucide-react";
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
import useGlobalContext from "@/hooks/useGlobalContext";

export function ApiCard({
  _id,
  name,
  description,
  endpoint,
  entries,
  isPublic,
  owner,
  tags = [],
  isOwner = false,
  starredBy = [],
  onEdit = () => {},
  onDelete = () => {},
}) {
  const { users } = useGlobalContext();
  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState(starredBy.length);
  const [ownerData, setOwnerData] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const result = users.find((user) => user._id === owner);
    setOwnerData(result);
  }, [users, owner]);

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
    <Card className="w-full max-w-[380px] hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <CardHeader className="flex flex-row justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col flex-1 min-w-0">
          <CardTitle className="text-lg sm:text-xl truncate">{name}</CardTitle>
          <CardDescription className="text-sm sm:text-base line-clamp-2">
            {description}
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
          onClick={handleShareApi}
          aria-label="Share API"
        >
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </CardHeader>

      <CardContent className="grid gap-3 px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-1 font-semibold">{entries}</span>
            entries
          </div>
          <div className="flex items-center">
            {isPublic ? (
              <>
                <span className="mr-1 text-green-500">•</span>
                Public
              </>
            ) : (
              <>
                <span className="mr-1 text-red-500">•</span>
                Private
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 rounded-md bg-muted p-2 sm:p-3 min-w-0">
          <code
            className="font-mono text-xs sm:text-sm flex-1 overflow-x-hidden "
            title={endpoint} // Shows full text on hover
          >
            {endpoint}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0"
            onClick={handleCopyEndpoint}
            aria-label={isCopied ? "Copied!" : "Copy endpoint"}
          >
            {isCopied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button key={tag} size="sm" className="px-2 py-1">
                {tag}
              </Button>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center gap-3 px-6 py-4">
  <div className="flex items-center gap-3 w-auto">
    <Avatar className="h-9 w-9">
      <AvatarImage
        src={ownerData?.profileImage || "/default-avatar.png"}
      />
      <AvatarFallback>{ownerData?.fullName?.[0] || "U"}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">
        {ownerData?.fullName || "Unknown"}
      </p>
      <p className="text-sm text-muted-foreground truncate">
        @{ownerData?.username || "unknown"}
      </p>
    </div>
  </div>

  {isOwner ? (
    <div className="flex items-center gap-2 w-auto justify-end">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={onEdit}
        aria-label="Edit API"
      >
        <Pencil className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={onDelete}
        aria-label="Delete API"
      >
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-4 w-auto justify-between">
      <div className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={toggleStar}
          aria-label="Star API"
        >
          <Star
            className={`h-5 w-5 ${
              isStarred ? "fill-yellow-400 stroke-yellow-400" : ""
            }`}
          />
        </Button>
        <span className="text-xs text-muted-foreground">{count}</span>
      </div>
    </div>
  )}
</CardFooter>

    </Card>
  );
}
