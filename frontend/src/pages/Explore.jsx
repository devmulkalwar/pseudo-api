import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon, StarIcon, UserIcon, GlobeIcon, LockIcon, PlusIcon } from "lucide-react";

const Explore = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Search Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-lg">
          <Input
            placeholder="Search APIs or users..."
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Most Stars</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Used</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New API
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* API List */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="ghost">All</Button>
            <Button variant="ghost">Public</Button>
            <Button variant="ghost">Private</Button>
            <Button variant="ghost">Recently Updated</Button>
          </div>

          <div className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Users API
                        <span className="text-sm font-normal text-muted-foreground">
                          by @john_doe
                        </span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Mock user data with authentication endpoints
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span>1.2k</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                  <code className="rounded bg-muted px-2 py-1">
                    /api/v1/users
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top APIs */}
          <Card>
            <CardHeader>
              <CardTitle>🔥 Trending APIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">E-commerce API</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <StarIcon className="h-4 w-4" />
                      <span>892</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/user${item}.jpg`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      24 APIs created
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;