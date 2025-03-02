import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clipboard, Edit, Trash, Star, Plus, Settings } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <Avatar className="h-32 w-32 border-4 border-foreground/10">
          <AvatarImage src="/user-avatar.jpg" />
          <AvatarFallback className="text-4xl">SD</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <h1 className="text-2xl font-light">@sarah_dev</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button className="rounded-full" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <span className="block font-bold">12</span>
              <span className="text-muted-foreground">APIs</span>
            </div>
            <div className="text-center">
              <span className="block font-bold">1.2k</span>
              <span className="text-muted-foreground">Stars</span>
            </div>
            <div className="text-center">
              <span className="block font-bold">24</span>
              <span className="text-muted-foreground">Starred</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Sarah Developer</h2>
            <p className="text-muted-foreground">
              Full-stack developer • Building mock APIs for better testing experiences
            </p>
            <p className="text-sm text-muted-foreground">sarah@example.com</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger 
            value="created" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-6"
          >
            <Settings className="h-4 w-4 mr-2" />
            Created APIs
          </TabsTrigger>
          <TabsTrigger 
            value="starred" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-6"
          >
            <Star className="h-4 w-4 mr-2" />
            Starred APIs
          </TabsTrigger>
        </TabsList>

        {/* Content Grid */}
        <TabsContent value="created">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="group relative aspect-square hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardContent className="flex flex-col justify-between h-full p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-background mix-blend-difference">
                      API v{item}
                    </CardTitle>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="gap-2 text-background border-background/30 hover:bg-background/10">
                      <Clipboard className="h-4 w-4" />
                      Copy URL
                    </Button>
                    <span className="text-sm text-background/80">2024-03-15</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred">
          {/* Similar grid structure for starred APIs */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;