import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  TrendingUp,
  Filter,
  LayoutTemplate,
  Rocket,
  FileJson,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiCard } from "@/components/api-card";

const Explore = () => {
  // State for toggling search mode: 'apis' or 'users'
  const [searchMode, setSearchMode] = useState("apis");

  // Dummy API data
  const apiCardsData = [
    {
      name: "Weather API",
      description: "Global weather data provider",
      endpoint: "/api/weather",
      entries: 1500,
      isPublic: true,
      owner: {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        profileImageUrl: "/avatar.jpg",
      },
      tags: ["REST", "Open Source", "JSON", "Free Tier"],
    },
    {
      name: "News API",
      description: "Real-time news updates",
      endpoint: "/api/news",
      entries: 2000,
      isPublic: true,
      owner: {
        firstName: "Jane",
        lastName: "Smith",
        username: "janesmith",
        profileImageUrl: "/avatar2.jpg",
      },
      starCount: 5,
      tags: ["REST", "XML", "Premium"],
    },
    {
      name: "Finance API",
      description: "Stock market and financial data",
      endpoint: "/api/finance",
      entries: 1200,
      isPublic: false,
      owner: {
        firstName: "Alice",
        lastName: "Brown",
        username: "alicebrown",
        profileImageUrl: "/avatar3.jpg",
      },
      starCount:10,
      tags: ["GraphQL", "JSON", "Enterprise"],
    },
  ];

  // Dummy Users data
  const userCardsData = [
    {
      firstName: "Michael",
      lastName: "Scott",
      username: "mscott",
      profileImageUrl: "/avatar4.jpg",
    },
    {
      firstName: "Pam",
      lastName: "Beesly",
      username: "pambeesly",
      profileImageUrl: "/avatar5.jpg",
    },
    {
      firstName: "Jim",
      lastName: "Halpert",
      username: "jhalpert",
      profileImageUrl: "/avatar6.jpg",
    },
  ];

  // Simple UserCard component for demonstration
  const UserCard = ({ user }) => {
    return (
      <Card className="max-w-sm shadow-lg">
        <CardHeader className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-bold">
              {user.firstName} {user.lastName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 bg-muted px-6 py-2 rounded-full">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Discover Powerful APIs</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Explore Mock APIs</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse community-built APIs or search for users in our community.
        </p>
      </div>

      {/* Search Mode Toggle & Filters */}
      <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 w-full md:max-w-xl">
          {/* Toggle buttons */}
          <div className="flex gap-4">
            <Button
              variant={searchMode === "apis" ? "default" : "outline"}
              onClick={() => setSearchMode("apis")}
            >
              APIs
            </Button>
            <Button
              variant={searchMode === "users" ? "default" : "outline"}
              onClick={() => setSearchMode("users")}
            >
              Users
            </Button>
          </div>
          <div className="relative">
            <Input
              placeholder={searchMode === "apis" ? "Search APIs..." : "Search Users..."}
              className="pl-10 h-11"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {searchMode === "apis" && (
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All APIs</SelectItem>
                <SelectItem value="rest">REST</SelectItem>
                <SelectItem value="graphql">GraphQL</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New {searchMode === "apis" ? "API" : "User"}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {searchMode === "apis" ? (
        <div className="grid gap-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-4 border-b">
              <TabsTrigger value="all" className="gap-1">
                <LayoutTemplate className="h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="trending" className="gap-1">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="gap-1">
                <FileJson className="h-4 w-4" />
                Recent
              </TabsTrigger>
            </TabsList>

            {/* All APIs Tab */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {apiCardsData.map((api, index) => (
                  <ApiCard
                    key={index}
                    name={api.name}
                    description={api.description}
                    endpoint={api.endpoint}
                    entries={api.entries}
                    isPublic={api.isPublic}
                    owner={{
                      firstName: api.owner.firstName,
                      lastName: api.owner.lastName,
                      username: api.owner.username,
                      profileImageUrl: api.owner.profileImageUrl,
                    }}
                    starCount={api.starCount}
                    tags={api.tags}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Trending APIs Tab */}
            <TabsContent value="trending">
              <div className="py-8 text-center text-muted-foreground">
                No trending APIs available.
              </div>
            </TabsContent>

            {/* Recent APIs Tab */}
            <TabsContent value="recent">
              <div className="py-8 text-center text-muted-foreground">
                No recent APIs available.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCardsData.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
