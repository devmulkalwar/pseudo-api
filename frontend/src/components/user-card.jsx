import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function UserCard({ user }) {
  return (
    <Card className="w-full max-w-sm transition-all duration-200 hover:shadow-md">
      <CardHeader className="pt-6 pb-4 text-center space-y-4">
        <Avatar className="h-20 w-20 mx-auto ring-2 ring-muted">
          <AvatarImage
            src={user.profileImage}
            alt={user.fullName}
            className="object-cover"
          />
          <AvatarFallback className="text-xl font-medium">
            {user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{user.fullName}</CardTitle>
          <Badge variant="secondary" className="font-normal">
            @{user.username}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-4 border-y">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1 p-2">
            <p className="text-xl font-bold">{user.starredApis.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Stars</p>
          </div>
          <div className="space-y-1 p-2 border-x">
            <p className="text-xl font-bold">{user.followers.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Followers</p>
          </div>
          <div className="space-y-1 p-2">
            <p className="text-xl font-bold">{user.createdApis.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Created</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col sm:flex-row gap-3 justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Follow
        </Button>
        <Link to={`/profile/${user._id}`} className="w-full sm:w-auto">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}