import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clipboard,
  Copy,
  User,
  Terminal,
  Database,
  Tag,
  Code,
  Activity,
  AlertCircle
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
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { getApiById, getUser } = useGlobalContext();
  const [apiDetails, setApiDetails] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [relatedApis, setRelatedApis] = useState([]);

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

  // Set related APIs (mock data; replace with actual API call)
  useEffect(() => {
    const mockRelatedApis = [
      {
        id: 1,
        name: "E-commerce Products API",
        description: "Fake product data for e-commerce applications",
        tags: ["commerce", "products", "fake-data"],
        endpoint: "/api/v1/ecommerce-products",
      },
      {
        id: 2,
        name: "User Profiles API",
        description: "Mock user profiles with social media data",
        tags: ["users", "social", "profiles"],
        endpoint: "/api/v1/user-profiles",
      },
    ];
    setRelatedApis(mockRelatedApis);
  }, [id]);

  const copyEndpoint = () => {
    if (apiDetails && apiDetails.endpoint) {
      navigator.clipboard.writeText(apiDetails.endpoint);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[150px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
          No API details found
        </div>
      </div>
    );
  }

  const sampleData = generateFakeData({
    entries: Math.min(apiDetails.entries, 3),
    schema: apiDetails.schema,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Terminal className="h-9 w-9 text-primary" />
          {apiDetails.name}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {apiDetails.description}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* API Endpoint Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                API Endpoint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <code className="font-mono text-sm break-all">
                  {apiDetails.endpoint}
                </code>
                <Button
                  onClick={copyEndpoint}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-background"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Schema Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Schema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead className="w-1/2">Field Name</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiDetails.schema?.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {field.fieldName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-mono">
                            {field.fieldType}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Example Response Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Example Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={JSON.stringify(sampleData, null, 2)}
                language="json"
                className="max-h-96 overflow-auto"
              />
            </CardContent>
          </Card>

          {/* Related APIs Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Related APIs
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {relatedApis.map((api) => (
                <Card
                  key={api.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      <Link to={`/apis/${api.id}`} className="hover:underline">
                        {api.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {api.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {api.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <code className="text-xs font-mono text-primary block truncate">
                      {api.endpoint}
                    </code>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Creator Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {creator && (
                <>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={creator.profileImage} />
                      <AvatarFallback>{creator.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{creator.fullName}</h3>
                      <p className="text-sm text-muted-foreground">
                        @{creator.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {creator.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={isFollowing ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsFollowing(!isFollowing)}
                      className="flex-1"
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/profile/${creator.username}`}>View Profile</Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Entries</span>
                <Badge variant="outline">{apiDetails.entries}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Created</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(apiDetails.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          {apiDetails.tags?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {apiDetails.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
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
