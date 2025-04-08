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

import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import useGlobalContext from "@/hooks/useGlobalContext";

export function UserCard({ user: profileUser }) {
  const { user, followUser, unfollowUser, showToast, getUsers } = useGlobalContext();
  const { getToken } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Add dependency on users list to update following status
  useEffect(() => {
    if (user?.following && profileUser?.clerkUserId) {
      const isUserFollowing = user.following.includes(profileUser.clerkUserId);
      if (isFollowing !== isUserFollowing) {
        setIsFollowing(isUserFollowing);
      }
    }
  }, [user?.following, profileUser?.clerkUserId, isFollowing]);

  const handleFollowToggle = async () => {
    if (!user) {
      showToast("Please login to follow users", "error");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      
      if (isFollowing) {
        await unfollowUser(profileUser.clerkUserId, token);
      } else {
        await followUser(profileUser.clerkUserId, token);
      }
      
      // Refresh users list
      await getUsers();
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Follow toggle error:", error);
      showToast("Failed to update follow status", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm transition-all duration-200 hover:shadow-md">
      <CardHeader className="pt-6 pb-4 text-center space-y-4">
        <Avatar className="h-20 w-20 mx-auto ring-2 ring-muted">
          <AvatarImage
            src={profileUser.profileImage}
            alt={profileUser.fullName}
            className="object-cover"
          />
          <AvatarFallback className="text-xl font-medium">
            {profileUser.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{profileUser.fullName}</CardTitle>
          <Badge variant="secondary" className="font-normal">
            @{profileUser.username}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-4 border-y">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1 p-2">
            <p className="text-xl font-bold">{profileUser.starredApis.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Stars</p>
          </div>
          <div className="space-y-1 p-2 border-x">
            <p className="text-xl font-bold">{profileUser.followers.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Followers</p>
          </div>
          <div className="space-y-1 p-2">
            <p className="text-xl font-bold">{profileUser.createdApis.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Created</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col sm:flex-row gap-3 justify-between">
        <Button 
          variant={isFollowing ? "default" : "outline"}
          size="sm"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={handleFollowToggle}
          disabled={loading || user?._id === profileUser._id}
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Link to={`/profile/${profileUser._id}`} className="w-full sm:w-auto">
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