import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, User, Star, Users, UserPlus } from "lucide-react";
import { ApiCard } from "@/components/api-card";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserList } from "@/components/user-list";

const Profile = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { user, users, apis, followUser, unfollowUser, showToast, getUsers } = useGlobalContext();
  const [profileUser, setProfileUser] = useState(null);
  const [createdApis, setCreatedApis] = useState([]);
  const [starredApis, setStarredApis] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFollowersDialog, setShowFollowersDialog] = useState(false);
  const [showFollowingDialog, setShowFollowingDialog] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

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

  // Add this useEffect to prepare followers/following lists
  useEffect(() => {
    if (profileUser && users) {
      const followers = users.filter(u => 
        profileUser.followers?.includes(u.clerkUserId)
      ).map(u => ({
        ...u,
        isFollowing: user?.following?.includes(u.clerkUserId)
      }));
      
      const following = users.filter(u => 
        profileUser.following?.includes(u.clerkUserId)
      ).map(u => ({
        ...u,
        isFollowing: user?.following?.includes(u.clerkUserId)
      }));
      
      setFollowersList(followers);
      setFollowingList(following);
    }
  }, [profileUser, users, user]);

  // Add follow/unfollow handler
  const handleFollowToggle = async (targetUser = profileUser) => {
    if (!user) {
      showToast("Please login to follow users", "error");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      
      if (user.following?.includes(targetUser.clerkUserId)) {
        await unfollowUser(targetUser.clerkUserId, token);
      } else {
        await followUser(targetUser.clerkUserId, token);
      }
      
      // Refresh users list and update lists
      await getUsers();
      
      // Update followers and following lists
      const updatedUsers = users.map(u => ({
        ...u,
        isFollowing: user.following?.includes(u.clerkUserId)
      }));
      
      const updatedFollowers = updatedUsers.filter(u => 
        profileUser.followers?.includes(u.clerkUserId)
      );
      
      const updatedFollowing = updatedUsers.filter(u => 
        profileUser.following?.includes(u.clerkUserId)
      );
      
      setFollowersList(updatedFollowers);
      setFollowingList(updatedFollowing);
      
      // Update main following status if the target was the profile user
      if (targetUser.clerkUserId === profileUser.clerkUserId) {
        setIsFollowing(!isFollowing);
      }
      
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
      className={`flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm ${loading ? 'opacity-50' : ''}`}
      onClick={handleFollowToggle}
      disabled={!user || loading}
    >
      {loading ? (
        <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
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
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col gap-4 w-full mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Avatar - smaller on mobile */}
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 mx-auto sm:mx-0">
            <AvatarImage src={profileUser.profileImage} />
            <AvatarFallback>
              {profileUser.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info and Follow Button */}
          <div className="flex flex-col sm:flex-1 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
                  {profileUser.fullName}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center sm:text-left">
                  @{profileUser.username}
                </p>
              </div>
              
              {/* Follow button - aligned right on larger screens */}
              <div className="flex justify-center sm:justify-end mt-2 sm:mt-0">
                {profileUser._id !== user?._id && <FollowButton />}
              </div>
            </div>

            {/* Stats Section - rearranged layout */}
            <div className="flex flex-row justify-around sm:justify-start sm:gap-6 md:gap-8 flex-wrap mt-4 w-full">
              <div className="flex flex-col items-center sm:items-start">
                <span className="font-bold text-base sm:text-lg md:text-xl">
                  {getTotalStars()}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Stars
                  </span>
                </div>
              </div>
              <div 
                className="flex flex-col items-center sm:items-start cursor-pointer"
                onClick={() => setShowFollowersDialog(true)}
              >
                <span className="font-bold text-base sm:text-lg md:text-xl">
                  {profileUser.followers?.length || 0}
                </span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Followers
                  </span>
                </div>
              </div>
              <div 
                className="flex flex-col items-center sm:items-start cursor-pointer"
                onClick={() => setShowFollowingDialog(true)}
              >
                <span className="font-bold text-base sm:text-lg md:text-xl">
                  {profileUser.following?.length || 0}
                </span>
                <div className="flex items-center gap-1">
                  <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <div className="overflow-x-auto pb-1">
          <TabsList className="w-full bg-background border-b rounded-none gap-2 sm:gap-4 px-0 min-w-max">
            <TabsTrigger
              value="created"
              className="pb-3 sm:pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              Created APIs ({createdApis.length})
            </TabsTrigger>
            <TabsTrigger
              value="starred"
              className="pb-3 sm:pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              Starred APIs ({starredApis.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Created APIs Tab */}
        <TabsContent value="created" className="mt-4 sm:mt-8">
          {createdApis.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {createdApis.map((api) => (
                <ApiCard key={api._id} {...api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2 sm:mb-3 opacity-50" />
              <h3 className="text-base sm:text-lg font-semibold mb-1">No Created APIs</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {profileUser._id === user?._id 
                  ? "You haven't created any APIs yet" 
                  : "This user hasn't created any APIs yet"}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Starred APIs Tab */}
        <TabsContent value="starred" className="mt-4 sm:mt-8">
          {starredApis.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {starredApis.map((api) => (
                <ApiCard key={api._id} {...api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <Star className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2 sm:mb-3 opacity-50" />
              <h3 className="text-base sm:text-lg font-semibold mb-1">No Starred APIs</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {profileUser._id === user?._id 
                  ? "You haven't starred any APIs yet" 
                  : "This user hasn't starred any APIs yet"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showFollowersDialog} onOpenChange={setShowFollowersDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <UserList
            users={followersList}
            emptyMessage="No followers yet"
            currentUser={user}
            onFollowToggle={handleFollowToggle}
            type="followers"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showFollowingDialog} onOpenChange={setShowFollowingDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Following</DialogTitle>
          </DialogHeader>
          <UserList
            users={followingList}
            emptyMessage="Not following anyone"
            currentUser={user}
            onFollowToggle={handleFollowToggle}
            type="following"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;