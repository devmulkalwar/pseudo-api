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
  SelectValue,
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
  Zap,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiCard } from "@/components/api-card";
import { UserCard } from "@/components/user-card";
import { Link } from "react-router-dom";
import useGlobalContext from "@/hooks/useGlobalContext";

const Explore = () => {
  const{users}= useGlobalContext();
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
      starCount: 10,
      tags: ["GraphQL", "JSON", "Enterprise"],
    },
  ];

  // Dummy Users data
  const userCardsData = [
    {
      _id: "67e3cf70c1529f59b82a62c4",
      clerkUserId: "user_2uqjVSdXh9HuBU1dOlELMTSrZZR",
      fullName: "Dev Mulkalwar",
      username: "dev_mulkalwar",
      profileImage:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydXFqVlE1Y3BFbUdTVWNwODJBSzlRSnkzS2sifQ",
      role: "user",
      starredApis: [1, 2, 3, 4, 5], // 5 starred APIs
      followers: [1, 2, 3], // 3 followers
      following: [1, 2],
      createdApis: [1, 2, 3, 4], // 4 created APIs
      preferences: {
        darkMode: false,
        language: "en",
      },
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            Discover Powerful APIs
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Explore Mock APIs
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Browse community-built APIs or connect with developers in our
          ecosystem.
        </p>
      </div>

      {/* Search & Filters Section */}
      <div className="flex flex-col gap-4 mb-12">
        {/* Top Row - Toggle & Create Button */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-2 p-1 sm:w-auto">
            <Button
              variant={searchMode === "apis" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-4 rounded-lg gap-2 flex-1 sm:flex-none flex items-center"
              onClick={() => setSearchMode("apis")}
            >
              <Zap className="h-4 w-4" />
              APIs
            </Button>
            <Button
              variant={searchMode === "users" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-4 rounded-lg gap-2 flex-1 sm:flex-none flex items-center"
              onClick={() => setSearchMode("users")}
            >
              <User className="h-4 w-4" />
              Users
            </Button>
          </div>

          <Link to="/create-api">
            <Button
              className="h-9 px-4 rounded-lg gap-2 flex-1 sm:flex-none flex items-center"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:block">Create API</span>
            </Button>
          </Link>
        </div>

        {/* Bottom Row - Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/80" />
            <Input
              placeholder={
                searchMode === "apis" ? "Search APIs..." : "Search users..."
              }
              className="pl-12 h-11 text-base shadow-sm"
            />
          </div>

          {searchMode === "apis" && (
            <Select>
              <SelectTrigger className="w-full sm:w-[200px] h-11">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by" />
                </div>
              </SelectTrigger>
              <SelectContent className="min-w-[200px]">
                <SelectItem value="all">All APIs</SelectItem>
                <SelectItem value="rest">REST</SelectItem>
                <SelectItem value="graphql">GraphQL</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Main Content */}
      {searchMode === "apis" ? (
        <div className="space-y-8">
          <Tabs defaultValue="all">
            <TabsList className="w-full bg-background border-b rounded-none gap-4 px-0">
              <TabsTrigger
                value="all"
                className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
              >
                <LayoutTemplate className="h-5 w-5" />
                All APIs
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
              >
                <TrendingUp className="h-5 w-5" />
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
              >
                <FileJson className="h-5 w-5" />
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {apiCardsData.map((api, index) => (
                  <ApiCard
                    key={index}
                    {...api}
                    className="hover:scale-[1.02] transition-transform duration-200"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-8">
              <div className="py-16 text-center space-y-4 bg-muted/30 rounded-2xl border border-dashed">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold text-muted-foreground">
                  No trending APIs right now
                </h3>
                <p className="text-muted-foreground/80">
                  Check back later for popular APIs
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-8">
              <div className="py-16 text-center space-y-4 bg-muted/30 rounded-2xl border border-dashed">
                <FileJson className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold text-muted-foreground">
                  No recent additions
                </h3>
                <p className="text-muted-foreground/80">
                  New APIs will appear here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              className="hover:scale-[1.02] transition-transform duration-200"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
