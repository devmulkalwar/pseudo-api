import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export function UserList({ users = [], emptyMessage, currentUser, onFollowToggle, type }) {
  const [loadingUsers, setLoadingUsers] = useState({});

  const handleFollowToggle = async (user) => {
    try {
      setLoadingUsers(prev => ({ ...prev, [user._id]: true }));
      await onFollowToggle(user);
    } finally {
      setLoadingUsers(prev => ({ ...prev, [user._id]: false }));
    }
  };

  if (!users.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[400px] pr-4">
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="flex items-center justify-between">
            <Link 
              to={`/profile/${user._id}`} 
              className="flex items-center gap-3 hover:opacity-80"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{user.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-muted-foreground">@{user.username}</span>
              </div>
            </Link>
            {currentUser?._id !== user._id && (
              <Button
                variant={user.isFollowing ? "default" : "outline"}
                size="sm"
                className="w-24"
                onClick={() => handleFollowToggle(user)}
                disabled={loadingUsers[user._id]}
              >
                {loadingUsers[user._id] ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
