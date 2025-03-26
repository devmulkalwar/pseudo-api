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
  owner,
  tags = [],
  isOwner = false, // Indicates if the authenticated user owns the API
  starCount = 0, // Initial star count
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
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2 rounded-md bg-muted p-3">
          <code className="font-mono text-sm">{endpoint}</code>
        </div>

        {/* Tag Badges Section */}
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

        <div className="flex gap-4 text-sm text-muted-foreground">
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

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={owner.profileImageUrl} />
            <AvatarFallback>
              {owner.firstName[0]}
              {owner.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {owner.firstName} {owner.lastName}
            </p>
            <p className="text-sm text-muted-foreground">@{owner.username}</p>
          </div>
        </div>

        {isOwner ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              aria-label="Edit API"
            >
              <Pencil className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              aria-label="Delete API"
            >
              <Trash className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleStar}
              aria-label="Star API"
            >
              <Star
                className={`h-5 w-5 ${
                  isStarred ? "fill-yellow-400 stroke-yellow-400" : ""
                }`}
              />
            </Button>
            <span className="text-sm">{count}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
