import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, User, Star, Users, UserPlus } from "lucide-react";
import { ApiCard } from "@/components/api-card";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { user, users, apis, followUser, unfollowUser, showToast, getUsers } = useGlobalContext();
  const [profileUser, setProfileUser] = useState(null);
  const [createdApis, setCreatedApis] = useState([]);
  const [starredApis, setStarredApis] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && users) {
      const foundUser = users.find((u) => u._id === id);
      // If user is not found in the list, default to the current logged in user
      setProfileUser(foundUser || user);
    }
  }, [id, users, user]);

  // Instead of calling getApiByUser, filter the apis array to find the user's APIs
  useEffect(() => {
    if (apis && profileUser) {
      const userApis = apis.filter((api) => api.owner === profileUser._id);
      setCreatedApis(userApis);
    }
  }, [apis, profileUser]);

  useEffect(() => {
    if (apis && profileUser) {
      // Set created APIs
      const userApis = apis.filter((api) => api.owner === profileUser._id);
      setCreatedApis(userApis);

      // Set starred APIs - filter APIs where user's ID is in starredBy array
      const userStarredApis = apis.filter((api) => 
        Array.isArray(api.starredBy) && 
        api.starredBy.includes(profileUser._id)
      );
      setStarredApis(userStarredApis);
    }
  }, [apis, profileUser]);

  // Update the useEffect that checks following status
  useEffect(() => {
    if (user?.following && profileUser?.clerkUserId) {
      setIsFollowing(user.following.includes(profileUser.clerkUserId));
    }
  }, [user?.following, profileUser?.clerkUserId]);

  // Add follow/unfollow handler
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

  // Update the follow button JSX
  const FollowButton = () => (
    <Button
      variant={isFollowing ? "default" : "outline"}
      className={`flex items-center gap-2 ${loading ? 'opacity-50' : ''}`}
      onClick={handleFollowToggle}
      disabled={loading}
    >
      {loading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );

  const getTotalStars = () => {
    return createdApis.reduce((total, api) => 
      total + (Array.isArray(api.starredBy) ? api.starredBy.length : 0), 0
    );
  };

  if (!profileUser) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col gap-4 w-full mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-32 w-32 border-2 mx-auto md:mx-0">
            <AvatarImage src={profileUser.profileImage} />
            <AvatarFallback>
              {profileUser.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                {profileUser.fullName}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground text-center md:text-left">
                @{profileUser.username}
              </p>
            </div>
            {/* Only show Follow button if this profile is not the current logged in user */}
            {profileUser._id !== user?._id && <FollowButton />}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-row justify-around md:justify-start md:gap-8 flex-wrap mt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg md:text-xl">
              {getTotalStars()}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="text-xs md:text-sm text-muted-foreground">
                Stars
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg md:text-xl">
              {profileUser.followers?.length || 0}
            </span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-xs md:text-sm text-muted-foreground">
                Followers
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg md:text-xl">
              {profileUser.following?.length || 0}
            </span>
            <div className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span className="text-xs md:text-sm text-muted-foreground">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full bg-background border-b rounded-none gap-4 px-0">
          <TabsTrigger
            value="created"
            className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
          >
            <BookOpen className="h-5 w-5" />
            Created APIs ({createdApis.length})
          </TabsTrigger>
          <TabsTrigger
            value="starred"
            className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
          >
            <Star className="h-5 w-5" />
            Starred APIs ({starredApis.length})
          </TabsTrigger>
        </TabsList>

        {/* Created APIs Tab */}
        <TabsContent value="created" className="mt-8">
          {createdApis.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdApis.map((api) => (
                <ApiCard key={api._id} {...api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-semibold mb-1">No Created APIs</h3>
              <p className="text-sm text-muted-foreground">
                {profileUser._id === user?._id 
                  ? "You haven't created any APIs yet" 
                  : "This user hasn't created any APIs yet"}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Starred APIs Tab */}
        <TabsContent value="starred" className="mt-8">
          {starredApis.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {starredApis.map((api) => (
                <ApiCard key={api._id} {...api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-semibold mb-1">No Starred APIs</h3>
              <p className="text-sm text-muted-foreground">
                {profileUser._id === user?._id 
                  ? "You haven't starred any APIs yet" 
                  : "This user hasn't starred any APIs yet"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
