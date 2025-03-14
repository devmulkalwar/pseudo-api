import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, Star, User, Globe, Lock, Plus, 
  TrendingUp, Trophy, Filter, Tag, Zap, UserPlus,
  ChevronRight, LayoutTemplate, Rocket, FileJson
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Explore = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="mb-8 text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 bg-muted px-6 py-2 rounded-full">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Discover Powerful APIs</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Mock APIs
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse community-built APIs or create your own custom endpoints in minutes
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <Input
            placeholder="Search APIs..."
            className="pl-10 h-11"
          />
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3">
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New API</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* API List */}
        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
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
            </div>

            {/* API Cards Grid */}
            <div className="grid gap-4">
              {/* API Card 1 */}
              <Card className="group hover:shadow-sm transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>User Management API</CardTitle>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <CardDescription className="text-muted-foreground">
                        Complete user authentication and profile management system
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1.5">
                      <Globe className="h-3.5 w-3.5" />
                      Public
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      REST
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>@john_doe</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      /api/v1/users
                    </code>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Zap className="h-4 w-4" />
                      Try Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* API Card 2 */}
              <Card className="group hover:shadow-sm transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>E-commerce API</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Full product catalog with inventory management
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">1.2k</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      Private
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      GraphQL
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback>EC</AvatarFallback>
                      </Avatar>
                      <span>@ecom_dev</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      /api/v1/products
                    </code>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Zap className="h-4 w-4" />
                      Try Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Start Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Create New API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {step}
                    </div>
                    <span className="text-muted-foreground">
                      {step === 1 && "Define API structure"}
                      {step === 2 && "Configure endpoints"}
                      {step === 3 && "Deploy & Share"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Rocket className="h-4 w-4" />
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Trending APIs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending APIs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Payment Gateway", stars: "892" },
                { name: "Social Feed", stars: "765" },
                { name: "Analytics", stars: "689" }
              ].map((api, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="group-hover:text-primary transition-colors">
                      {api.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{api.stars}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contributors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah Lin", count: "24 APIs", initial: "SL" },
                { name: "Mike Chen", count: "19 APIs", initial: "MC" },
                { name: "Emma Wilson", count: "15 APIs", initial: "EW" }
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <Avatar className="h-9 w-9 border-2 border-muted">
                    <AvatarFallback>{user.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.count}</p>
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