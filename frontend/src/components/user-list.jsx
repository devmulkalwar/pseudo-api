import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export function UserList({ users = [], emptyMessage }) {
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
          <div key={user._id} className="flex items-center">
            <Link 
              to={`/profile/${user._id}`} 
              className="flex items-center gap-3 hover:opacity-80 w-full"
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
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
