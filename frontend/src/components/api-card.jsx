import { useState } from "react";
import { Star, Pencil, Trash } from "lucide-react";
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

export function ApiCard({
  name,
  description,
  endpoint,
  entries,
  isPublic,
  owner = {},
  tags = [],
  isOwner = false,
  starCount = 0,
  onEdit = () => {},
  onDelete = () => {},
}) {
  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState(starCount);

  const toggleStar = () => {
    setIsStarred((prev) => {
      const newValue = !prev;
      setCount((prevCount) => (newValue ? prevCount + 1 : prevCount - 1));
      return newValue;
    });
  };

  return (
    <Card className="w-full max-w-[380px] hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
        <CardTitle className="text-lg sm:text-xl">{name}</CardTitle>
        <CardDescription className="text-sm sm:text-base line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3 px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center space-x-2 rounded-md bg-muted p-2 sm:p-3">
          <code className="font-mono text-xs sm:text-sm break-words overflow-x-auto">
            {endpoint}
          </code>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-2 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

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
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarImage
              src={owner?.profileImageUrl || "/default-avatar.png"}
            />
            <AvatarFallback>
              {(owner?.firstName?.[0] || "U") + (owner?.lastName?.[0] || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {owner?.firstName || "Unknown"} {owner?.lastName || ""}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              @{owner?.username || "unknown"}
            </p>
          </div>
        </div>

        {isOwner ? (
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={onEdit}
              aria-label="Edit API"
            >
              <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={onDelete}
              aria-label="Delete API"
            >
              <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={toggleStar}
              aria-label="Star API"
            >
              <Star
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isStarred ? "fill-yellow-400 stroke-yellow-400" : ""
                }`}
              />
            </Button>
            <span className="text-sm min-w-[20px] text-center">{count}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
