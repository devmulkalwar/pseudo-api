import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clipboard,
  Copy,
  User,
  Terminal,
  Database,
  Tag,
  Code,
  Activity,
  AlertCircle,
  Star,
  Edit,
  Trash2,
  Check,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import CodeBlock from "@/components/CodeBlock";
import useGlobalContext from "@/hooks/useGlobalContext";
import { faker } from "@faker-js/faker";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@clerk/clerk-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ApiCard } from "@/components/api-card";

const generateFakeData = ({ schema, entries }) => {
  faker.seed(123);
  const data = [];
  for (let i = 0; i < entries; i++) {
    const sample = { id: faker.string.uuid() };
    schema.forEach((field) => {
      let typeStr = field.fieldType.startsWith("faker.")
        ? field.fieldType.slice(6)
        : field.fieldType;
      let [namespace, method] = typeStr.split(".");
      if (namespace === "name") namespace = "person";
      if (faker[namespace] && typeof faker[namespace][method] === "function") {
        sample[field.fieldName] = faker[namespace][method]();
      } else {
        sample[field.fieldName] = "N/A";
      }
    });
    data.push(sample);
  }
  return data;
};

const ApiDetails = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const {
    getApiById,
    getUser,
    starApi,
    unstarApi,
    user,
    showToast,
    deleteApi,
    apis, 
  } = useGlobalContext();
  const [apiDetails, setApiDetails] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [relatedApis, setRelatedApis] = useState([]);
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  // Fetch API details and creator info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getApiById(id);
        setApiDetails(apiResponse.data);
        const userResponse = await getUser(apiResponse.data.owner);
        setCreator(userResponse);
      } catch (err) {
        setError(err.message || "Failed to load API details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  // Update related APIs logic with strict filtering
  useEffect(() => {
    if (apiDetails && apis && apis.length > 0) {
      const related = apis.filter(api => 
        api.category === apiDetails.category && // Same category
        api._id !== id && // Not the current API using URL param
        api.isPublic === true // Only public APIs
      ).slice(0, 3); // Limit to 3 related APIs

      setRelatedApis(related);
    }
  }, [apiDetails, apis, id]); // Added id to dependencies

  // Check star status
  useEffect(() => {
    if (apiDetails && user) {
      setIsStarred(apiDetails.starredBy?.includes(user._id));
      setStarCount(apiDetails.starredBy?.length || 0);
    }
  }, [apiDetails, user]);

  const copyEndpoint = () => {
    if (apiDetails && apiDetails.endpoint) {
      navigator.clipboard.writeText(apiDetails.endpoint);
    }
  };

  const toggleStar = async () => {
    try {
      const token = await getToken();
      if (isStarred) {
        await unstarApi(id, token);
        setIsStarred(false);
        setStarCount((prev) => prev - 1);
        showToast("API removed from favorites", "info");
      } else {
        await starApi(id, token);
        setIsStarred(true);
        setStarCount((prev) => prev + 1);
        showToast("API added to favorites", "success");
      }
    } catch (error) {
      showToast("Failed to update star status", "error");
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this API?")) {
        return;
      }

      const token = await getToken();
      await deleteApi(id, token);
      showToast("API deleted successfully", "success");
      navigate("/explore");
    } catch (error) {
      showToast("Failed to delete API", "error");
    }
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(apiDetails.endpoint);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-3 py-4 max-w-6xl space-y-4">
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="grid gap-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-64" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-3 py-4 max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!apiDetails) {
    return (
      <div className="container mx-auto px-3 py-4 max-w-6xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>No API details found</AlertDescription>
        </Alert>
      </div>
    );
  }

  const sampleData = generateFakeData({
    entries: Math.min(apiDetails.entries, 3),
    schema: apiDetails.schema,
  });

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 max-w-6xl">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2">
            <Terminal className="h-6 w-6 text-primary" />
            {apiDetails.name}
          </h1>

          {/* Owner Actions */}
          {user?._id === apiDetails.owner && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit-api/${id}`)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={toggleStar}
            disabled={!user}
          >
            <Star
              className={`h-4 w-4 ${
                isStarred ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
            <span className="text-sm">{starCount}</span>
          </Button>
          {/* Add stats badges */}
          <Badge variant="outline" className="text-xs">
            {apiDetails.entries} entries
          </Badge>
          <Badge
            variant={apiDetails.isPublic ? "secondary" : "outline"}
            className="text-xs"
          >
            {apiDetails.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-3xl">
          {apiDetails.description}
        </p>
      </div>

      {/* Top Info Cards - Rearranged for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Creator Card - Moved to top for mobile */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {creator && (
              <div className="flex flex-row items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={creator.profileImage} />
                  <AvatarFallback>{creator.fullName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{creator.fullName}</h3>
                  <p className="text-xs text-muted-foreground">
                    @{creator.username}
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant={isFollowing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
                className="text-xs flex-1"
                disabled={!user || loading || user?._id === apiDetails.owner}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs flex-1"
              >
                <Link to={`/profile/${creator?.username}`}>View Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoint Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              API Endpoint
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between space-x-2 rounded-md bg-muted p-2">
              <code
                className="font-mono text-xs truncate flex-1"
              >
            {apiDetails.endpoint}
              
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full flex-shrink-0"
                      onClick={handleCopyEndpoint}
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Data Schema Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Data Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="min-w-fit">
                  <Table className="w-full">
                    <TableHeader className="bg-muted">
                      <TableRow>
                        <TableHead className="w-1/2 font-medium">
                          Field Name
                        </TableHead>
                        <TableHead className="font-medium">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiDetails.schema?.map((field, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium py-2">
                            {field.fieldName}
                          </TableCell>
                          <TableCell className="py-2">
                            <Badge
                              variant="secondary"
                              className="font-mono text-xs"
                            >
                              {field.fieldType}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Response */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                Example Response
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CodeBlock
                code={JSON.stringify(sampleData, null, 2)}
                language="json"
                className="max-h-56 sm:max-h-72 overflow-auto text-xs rounded-md"
              />
            </CardContent>
          </Card>

          {/* Related APIs Card - Updated with more details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                Related APIs
              </CardTitle>
              <CardDescription>
                Other APIs in the {apiDetails.category} category
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedApis.length > 0 ? (
                relatedApis.map((api) => (
                  <ApiCard 
                    key={api._id} 
                    {...api} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No related APIs found in this category.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Side info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex justify-between items-center py-1 border-b">
                <span className="text-xs">Total Entries</span>
                <Badge variant="outline" className="text-xs">
                  {apiDetails.entries}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-xs">Created</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(apiDetails.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          {apiDetails.tags?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {apiDetails.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDetails;
