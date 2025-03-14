import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, ChevronRight, BookPlus, PlusIcon, PencilIcon, 
  BarChart, Share2, Bookmark, Copy, ExternalLink, Trash,
  Twitter, Github, Globe, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  
  const createdAPIs = [
    { 
      id: 1, 
      name: "User API", 
      description: "Mock user data with authentication and customizable user profiles for testing authentication flows",
      stars: 45,
      type: "REST",
      status: "Active",
      rateLimit: "Premium",
      created: "Jan 15, 2025",
      endpoint: "/api/users"
    },
    { 
      id: 2, 
      name: "E-commerce API", 
      description: "Product listings, inventory management, and order processing for testing e-commerce applications",
      stars: 32,
      type: "GraphQL",
      status: "Active",
      rateLimit: "Free",
      created: "Feb 2, 2025",
      endpoint: "/api/products"
    },
    { 
      id: 3, 
      name: "Blog API", 
      description: "Content management system with authors, categories, and comments for testing blog applications",
      stars: 28,
      type: "REST",
      status: "Deprecated",
      rateLimit: "Free",
      created: "Dec 10, 2024",
      endpoint: "/api/blog"
    },
  ];

  const starredAPIs = [
    { 
      id: 4, 
      name: "Weather API", 
      description: "Global weather data with forecast and historical data for testing weather applications",
      stars: 120,
      type: "REST",
      status: "Active",
      rateLimit: "Premium",
      creator: "@weather_dev",
      created: "Nov 5, 2024",
      endpoint: "/api/weather"
    },
    { 
      id: 5, 
      name: "Payment API", 
      description: "Payment gateway simulation with transaction history and multiple payment methods",
      stars: 98,
      type: "GraphQL",
      status: "Active",
      rateLimit: "Premium",
      creator: "@fintech_pro",
      created: "Jan 22, 2025",
      endpoint: "/api/payments"
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Globe, href: "#", label: "Website" }
  ];

  const filteredCreatedAPIs = createdAPIs.filter(api => 
    api.name.toLowerCase().includes(filterText.toLowerCase()) || 
    api.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredStarredAPIs = starredAPIs.filter(api => 
    api.name.toLowerCase().includes(filterText.toLowerCase()) || 
    api.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const APICard = ({ api, isOwner = false }) => (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden border-t-4 border-t-blue-500 dark:border-t-blue-400">
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-mono">{api.name}</CardTitle>
              <Badge variant={api.status === "Active" ? "default" : "destructive"} className="text-xs">
                {api.status}
              </Badge>
            </div>
            {!isOwner && (
              <div className="text-xs text-muted-foreground mt-1">
                By {api.creator}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="outline" className={`text-xs ${api.type === "GraphQL" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}>
              {api.type}
            </Badge>
            <Badge variant="outline" className={`text-xs ${api.rateLimit === "Premium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}>
              {api.rateLimit}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm line-clamp-2 mt-2">
          {api.description}
        </CardDescription>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute -right-16 top-2 group-hover:right-2 transition-all duration-300 flex items-center space-x-1">
                {isOwner ? (
                  <>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isOwner ? "Edit or Delete API" : "Save API"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mt-2 text-xs text-muted-foreground">
          Created: {api.created}
        </div>
        <div className="mt-1 text-xs font-mono bg-muted p-1 rounded flex items-center justify-between">
          <code className="truncate">{api.endpoint}</code>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy API Endpoint</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.round(api.stars/20) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} 
              />
            ))}
          </div>
          <span className="text-muted-foreground">{api.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share API</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View API Documentation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );

  const SkeletonCard = () => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="h-5 bg-muted rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-full mt-2 animate-pulse"></div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-4 bg-muted rounded w-full mt-2 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-full mt-2 animate-pulse"></div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-1/4 ml-auto animate-pulse"></div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-md"></div>
          <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 relative z-10 shadow-lg">
            <AvatarImage src="/api/placeholder/128/128" />
            <AvatarFallback className="text-4xl font-mono bg-gradient-to-br from-blue-500 to-purple-600 text-white">PA</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-bold font-mono">@pseudoapi_dev</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              {socialLinks.map((link, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <link.icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg transform transition-transform hover:scale-105">
              <p className="text-2xl font-bold">{createdAPIs.length}</p>
              <p className="text-muted-foreground text-sm">Created APIs</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg transform transition-transform hover:scale-105">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-muted-foreground text-sm">Total Stars</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg transform transition-transform hover:scale-105">
              <p className="text-2xl font-bold">{starredAPIs.length}</p>
              <p className="text-muted-foreground text-sm">Starred APIs</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground max-w-prose">
            Building mock APIs for better testing experiences. Passionate about developer tools and API design.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <PlusIcon className="h-4 w-4" />
              Create New API
            </Button>
            <Button variant="outline" className="gap-2">
              <PencilIcon className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="gap-2">
              <BarChart className="h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search APIs..." 
            className="pl-10" 
            value={filterText} 
            onChange={(e) => setFilterText(e.target.value)} 
          />
        </div>
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter APIs by category or type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share Profile</span>
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-muted/50">
          <TabsTrigger value="created" className="gap-2 py-4 data-[state=active]:bg-background">
            <BookPlus className="h-5 w-5" />
            Created APIs ({createdAPIs.length})
          </TabsTrigger>
          <TabsTrigger value="starred" className="gap-2 py-4 data-[state=active]:bg-background">
            <Bookmark className="h-5 w-5" />
            Starred APIs ({starredAPIs.length})
          </TabsTrigger>
        </TabsList>

        {/* Created APIs Content */}
        <TabsContent value="created">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredCreatedAPIs.length === 0 ? (
              <div className="col-span-full text-center py-12 space-y-4 text-muted-foreground">
                <BookPlus className="h-12 w-12 mx-auto" />
                <p>No APIs found matching your search</p>
              </div>
            ) : (
              filteredCreatedAPIs.map((api) => (
                <APICard key={api.id} api={api} isOwner={true} />
              ))
            )}
          </div>
        </TabsContent>

        {/* Starred APIs Content */}
        <TabsContent value="starred">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredStarredAPIs.length === 0 ? (
              <div className="col-span-full text-center py-12 space-y-4 text-muted-foreground">
                <Bookmark className="h-12 w-12 mx-auto" />
                <p>No starred APIs found</p>
              </div>
            ) : (
              filteredStarredAPIs.map((api) => (
                <APICard key={api.id} api={api} isOwner={false} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;