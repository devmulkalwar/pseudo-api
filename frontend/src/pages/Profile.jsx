import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Plus } from "lucide-react";
import { ApiCard } from "@/components/api-card";
import { BookOpen, User, Star, Users, UserPlus } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import useGlobalContext from "@/hooks/useGlobalContext";

// Dummy data for Created APIs
const createdAPIs = [
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

// Dummy data for Starred APIs
const starredAPIs = [
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

const Profile = () => {
  const { user } = useGlobalContext();
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col gap-4 w-full mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Section - Centered on mobile, left-aligned on desktop */}
          <Avatar className="h-20 w-20 md:h-32 md:w-32 border-2 mx-auto md:mx-0">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>
              <User className="h-8 w-8 md:h-12 md:w-12" />
            </AvatarFallback>
          </Avatar>

          {/* Profile Info Section */}
          <div className="flex flex-col flex-1 w-full ">
            {/* Name, Username & Follow Button */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                  {user.fullName}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground text-center md:text-left">
                  @{user.username}
                </p>
              </div>
              {/* Desktop Follow Button */}
              <Button
                variant="outline"
                className="hidden md:flex px-6 py-2.5 text-base font-semibold"
              >
                Follow
              </Button>
            </div>

            {/* Mobile Follow Button */}
            <div className="md:hidden flex justify-center mt-2">
              <Button
                variant="outline"
                className="inline-flex px-4 py-2 text-sm font-semibold"
              >
                Follow
              </Button>
            </div>

            {/* Stats Section */}
            <div className="flex flex-row justify-around md:justify-start md:gap-8 flex-wrap mt-4">
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg md:text-xl">
                  {user.followers.length}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Stars
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg md:text-xl">
                  {user.followers.length}
                </span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Followers
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg md:text-xl">
                  {user.following.length}
                </span>
                <div className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full bg-background border-b rounded-none gap-4 px-0">
          <TabsTrigger
            value="created"
            className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
          >
            <BookOpen className="h-5 w-5" />
            Created APIs ({createdAPIs.length})
          </TabsTrigger>
          <TabsTrigger
            value="starred"
            className="pb-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
          >
            <Star className="h-5 w-5" />
            Starred APIs ({starredAPIs.length})
          </TabsTrigger>
        </TabsList>

        {/* Created APIs Tab */}
        <TabsContent value="created" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdAPIs.map((api, index) => (
              <ApiCard key={index} {...api} isOwner={true} />
            ))}
          </div>
        </TabsContent>

        {/* Starred APIs Tab */}
        <TabsContent value="starred" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {starredAPIs.map((api, index) => (
              <ApiCard key={index} {...api} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
