import { useEffect, useState, useMemo } from "react";
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
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiCard } from "@/components/api-card";
import { UserCard } from "@/components/user-card";
import { Link } from "react-router-dom";
import useGlobalContext from "@/hooks/useGlobalContext";

const API_CATEGORIES = [
  { value: "commerce", label: "Commerce" },
  { value: "person", label: "Person" },
  { value: "animal", label: "Animal" },
  { value: "location", label: "Location" },
  { value: "finance", label: "Finance" },
  { value: "company", label: "Company" },
  { value: "internet", label: "Internet" },
  { value: "vehicle", label: "Vehicle" },
  { value: "other", label: "Other" },
];

const Explore = () => {
  const { users, apis } = useGlobalContext();
  const [searchMode, setSearchMode] = useState("apis");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filtered APIs
  const filteredApis = useMemo(() => {
    if (!Array.isArray(apis)) return [];

    return apis.filter((api) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        api.name?.toLowerCase().includes(searchLower) ||
        api.description?.toLowerCase().includes(searchLower) ||
        api.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        api.endpoint?.toLowerCase().includes(searchLower);

      const matchesCategory =
        categoryFilter === "all" || api.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [apis, searchQuery, categoryFilter]);

  // Sorted APIs for different tabs
  const trendingApis = useMemo(() => {
    return [...filteredApis].sort(
      (a, b) => (b.starredBy?.length || 0) - (a.starredBy?.length || 0)
    );
  }, [filteredApis]);

  const recentApis = useMemo(() => {
    return [...filteredApis].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredApis]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.username?.toLowerCase().includes(searchLower) ||
        user.fullName?.toLowerCase().includes(searchLower) ||
        user.bio?.toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="mb-8 md:mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 sm:px-6 py-2 rounded-full border border-primary/20">
          <Rocket className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-primary">
            Discover Powerful APIs
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Explore Mock APIs
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Browse community-built APIs or connect with developers in our
          ecosystem.
        </p>
      </div>

      {/* Search & Filters Section */}
      <div className="flex flex-col gap-4 mb-8 md:mb-12">
        {/* Top Row - Mode toggle, search & create button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={searchMode === "apis" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-3 sm:px-4 rounded-lg gap-1 sm:gap-2 flex items-center"
              onClick={() => setSearchMode("apis")}
            >
              <Zap className="h-4 w-4" />
              APIs
            </Button>
            <Button
              variant={searchMode === "users" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-3 sm:px-4 rounded-lg gap-1 sm:gap-2 flex items-center"
              onClick={() => setSearchMode("users")}
            >
              <User className="h-4 w-4" />
              Users
            </Button>
          </div>

          {/* Responsive search & create button */}
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground/80" />
              <Input
                placeholder={
                  searchMode === "apis" ? "Search APIs..." : "Search users..."
                }
                className="pl-10 sm:pl-12 h-9 sm:h-11 text-sm sm:text-base shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/create-api">
              <Button
                className="h-9 px-3 sm:px-4 rounded-lg gap-1 sm:gap-2 flex items-center whitespace-nowrap"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:block">Create API</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Add Category Filter */}
        {searchMode === "apis" && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">Category:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] sm:w-[180px] h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {API_CATEGORIES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {categoryFilter !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCategoryFilter("all")}
                className="h-8 px-2"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Clear
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      {searchMode === "apis" ? (
        <div className="space-y-6 sm:space-y-8">
          <Tabs defaultValue="all">
            <div className="overflow-x-auto pb-1">
              <TabsList className="w-full bg-background border-b rounded-none gap-2 sm:gap-4 px-0 min-w-max">
                <TabsTrigger
                  value="all"
                  className="pb-3 sm:pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <LayoutTemplate className="h-4 sm:h-5 w-4 sm:w-5" />
                  All APIs
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="pb-3 sm:pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5" />
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="pb-3 sm:pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <FileJson className="h-4 sm:h-5 w-4 sm:w-5" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6 sm:mt-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredApis.length > 0 ? (
                  filteredApis.map((api, index) => (
                    <ApiCard
                      key={index}
                      {...api}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 sm:py-16 text-center space-y-3 sm:space-y-4 bg-muted/30 rounded-xl sm:rounded-2xl border border-dashed">
                    <FileJson className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
                      No APIs found
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground/80">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-6 sm:mt-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {trendingApis.length > 0 ? (
                  trendingApis.map((api, index) => (
                    <ApiCard
                      key={index}
                      {...api}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 sm:py-16 text-center space-y-3 sm:space-y-4 bg-muted/30 rounded-xl sm:rounded-2xl border border-dashed">
                    <TrendingUp className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
                      No trending APIs right now
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground/80">
                      Check back later for popular APIs.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-6 sm:mt-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentApis.length > 0 ? (
                  recentApis.map((api, index) => (
                    <ApiCard
                      key={index}
                      {...api}
                      className="hover:scale-105 transition-transform duration-200"
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 sm:py-16 text-center space-y-3 sm:space-y-4 bg-muted/30 rounded-xl sm:rounded-2xl border border-dashed">
                    <FileJson className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
                      No recent additions
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground/80">
                      New APIs will appear here soon.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <UserCard
                key={index}
                user={user}
                className="hover:scale-105 transition-transform duration-200"
              />
            ))
          ) : (
            <div className="col-span-full py-8 sm:py-16 text-center space-y-3 sm:space-y-4 bg-muted/30 rounded-xl sm:rounded-2xl border border-dashed">
              <User className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
                No users found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground/80">
                Try adjusting your search query.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;