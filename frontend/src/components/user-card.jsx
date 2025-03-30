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
export function UserCard({ user }) {
  return (
    <Card className="w-full max-w-sm sm:max-w-md shadow-lg rounded-xl hover:shadow-xl transition-shadow mx-auto">
      <CardHeader className="flex items-center flex-col gap-3 pb-3">
        <Avatar className="h-24 w-24 border-2 border-primary/10">
          <AvatarImage 
            src={user.profileImage} 
            alt={user.fullName} 
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-medium">
            {user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <CardTitle className="text-xl font-bold">{user.fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4 py-4 border-y">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-primary">{user.starredApis.length}</p>
          <p className="text-xs text-muted-foreground">STARS</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-primary">{user.followers.length}</p>
          <p className="text-xs text-muted-foreground">FOLLOWERS</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-primary">{user.createdApis.length}</p>
          <p className="text-xs text-muted-foreground">CREATED</p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4 gap-2">
        <Button variant="outline" size="sm" className="gap-2 px-3 w-full sm:w-auto">
          <UserPlus className="h-4 w-4" />
          <span>Follow</span>
        </Button>
        <Link to={`/profile/${user._id}`} className="w-full sm:w-auto">
        <Button variant="default" size="sm" className="gap-2 px-3 w-full sm:w-auto">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
