import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

// Generate sample data using Faker.js based on the API schema and number of entries.
const generateFakeData = ({ schema, entries }) => {
  // Seed Faker for consistent results.
  faker.seed(123);
  const data = [];
  for (let i = 0; i < entries; i++) {
    const sample = { id: faker.string.uuid() };
    schema.forEach((field) => {
      // Remove "faker." prefix if present.
      let typeStr = field.fieldType.startsWith("faker.")
        ? field.fieldType.slice(6)
        : field.fieldType;
      let [namespace, method] = typeStr.split(".");
      // Replace deprecated namespace "name" with "person".
      if (namespace === "name") {
        namespace = "person";
      }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getApiById(id);
        setApiDetails(apiResponse.data);
        const userResponse = await getUser(apiResponse.data.owner);
        setCreator(userResponse.data);
      } catch (err) {
        setError(err.message || "Failed to load API details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, getApiById, getUser]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
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

  // Generate sample data directly without useMemo. Limit to 3 entries for demo.
  const sampleData = generateFakeData({
    entries: Math.min(apiDetails.entries, 3),
    schema: apiDetails.schema,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={creator?.profileImage} alt={creator?.fullName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {creator?.fullName?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold tracking-tight">
                {apiDetails.name}
              </CardTitle>
              <CardDescription className="text-lg">
                {apiDetails.description}
              </CardDescription>
              {creator && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Created by {creator.fullName}
                  </span>
                  <Badge variant="outline">@{creator.username}</Badge>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Metadata Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Endpoint
              </h3>
              <code className="text-sm font-mono break-all">
                {apiDetails.endpoint}
              </code>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Entries
              </h3>
              <p className="text-sm">{apiDetails.entries}</p>
            </div>
            {apiDetails.tags?.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {apiDetails.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Schema Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schema Definition</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-1/3">Field Name</TableHead>
                    <TableHead>Field Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiDetails.schema?.length > 0 ? (
                    apiDetails.schema.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {field.fieldName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {field.fieldType}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground py-4">
                        No schema defined
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Demo Data Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Example Response</h2>
            <CodeBlock
              code={
                sampleData.length > 0
                  ? JSON.stringify(sampleData, null, 2)
                  : "No sample data available"
              }
              language="json"
              className="rounded-lg border bg-muted/50 p-4"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDetails;
