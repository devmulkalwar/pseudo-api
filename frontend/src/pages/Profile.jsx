import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Plus, ChevronRight, Bookmark, BookPlusIcon, PlusIcon, BookPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const createdAPIs = [
    { id: 1, name: "User API", description: "Mock user data with authentication", stars: 45 },
    { id: 2, name: "E-commerce API", description: "Product listings and orders", stars: 32 },
    { id: 3, name: "Blog API", description: "Content management system", stars: 28 },
  ];

  const starredAPIs = [
    { id: 4, name: "Weather API", description: "Global weather data", stars: 120 },
    { id: 5, name: "Payment API", description: "Payment gateway simulation", stars: 98 },
  ];

  return (
    <div className="flex-grow m-auto flex flex-col justify-center items-center p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Avatar className="h-32 w-32 border-4 border-muted">
          <AvatarImage src="/user-avatar.jpg" />
          <AvatarFallback className="text-4xl font-medium">PA</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold">@pseudoapi_dev</h1>
          
          {/* Stats Row */}
          <div className="flex justify-center md:justify-start gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{createdAPIs.length}</p>
              <p className="text-muted-foreground">Created APIs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-muted-foreground">Total Stars</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{starredAPIs.length}</p>
              <p className="text-muted-foreground">Starred APIs</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground max-w-prose">
            Building mock APIs for better testing experiences
          </p>

          <div className="flex justify-center md:justify-start gap-2 mt-4">
            <Button variant="outline" className="gap-2">
              <PlusIcon className="h-5 w-5" />
              New API
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full flex rounded-lg bg-muted p-1 h-auto">
          <TabsTrigger 
            value="created" 
            className="flex-1 gap-2 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <BookPlus className="h-4 w-4" />
            <span className="text-sm">Created APIs</span>
            <span className="ml-1 text-muted-foreground">({createdAPIs.length})</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="starred" 
            className="flex-1 gap-2 py-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
             <Star className="h-4 w-4" />
            <span className="text-sm">Starred APIs</span>
            <span className="ml-1 text-muted-foreground">({starredAPIs.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Content Sections */}
        <div className="mt-6 w-full">
          <TabsContent value="created">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {createdAPIs.length === 0 ? (
                <div className="col-span-full text-center py-12 space-y-4 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto" />
                  <p>No APIs created yet</p>
                </div>
              ) : (
                createdAPIs.map((api) => (
                  <Card key={api.id} className="hover:shadow-md transition-shadow group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{api.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {api.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{api.stars}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="starred">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {starredAPIs.length === 0 ? (
                <div className="col-span-full text-center py-12 space-y-4 text-muted-foreground">
                  <Bookmark className="h-12 w-12 mx-auto" />
                  <p>No starred APIs yet</p>
                </div>
              ) : (
                starredAPIs.map((api) => (
                  <Card key={api.id} className="hover:shadow-md transition-shadow group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{api.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {api.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{api.stars}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;