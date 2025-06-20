import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  RocketIcon,
  ServerIcon,
  CodeIcon,
  Share2Icon,
  StarIcon,
  ClipboardIcon,
  CheckIcon,
  BookOpen,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import CodeBlock from "@/components/CodeBlock";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Generate Fake APIs in Seconds
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Create mock REST APIs instantly with realistic data using Faker.js.
          Perfect for prototyping, testing, and demo applications.
        </p>
        <Link to="/explore">
          <Button size="lg" className="gap-2">
            <RocketIcon className="h-4 w-4" />
            Get Started for Free
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-2">
            <ServerIcon className="h-8 w-8 text-primary" />
            <CardTitle>Instant Mock APIs</CardTitle>
            <CardDescription>
              Generate endpoints with custom data structures
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-2">
            <CodeIcon className="h-8 w-8 text-primary" />
            <CardTitle>Realistic Data</CardTitle>
            <CardDescription>
              Names, emails, addresses, and 50+ data types
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-2">
            <Share2Icon className="h-8 w-8 text-primary" />
            <CardTitle>Share & Collaborate</CardTitle>
            <CardDescription>
              Publish APIs and collect community ratings
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Demo Preview */}
      <Card className="w-full">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold">Example API Response</h2>
            <Button variant="outline" className="w-full md:w-auto">
              <CodeIcon className="mr-2 h-4 w-4" />
              Try it Now
            </Button>
          </div>
          <CodeBlock
            code={`[
  {
    "id": "5f9f1b9b0b9b9b0017a1b1b1",
    "name": "Eleanor Parks",
    "email": "eleanor.parks@example.com",
    "phone": "+1 (555) 555-1234"
  },
  {
    "id": "6a7f2c8d1d2e3f0018b2b2b2",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 555-5678"
  }
]`}
          />
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Start Building</CardTitle>
            <CardDescription>
              Create your first mock API in 30 seconds
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/create-api">
                <BookOpen className="h-4 w-4" />
                Create Api
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Explore Public APIs</CardTitle>
            <CardDescription>Discover community-created APIs</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/explore">
                <StarIcon className="h-4 w-4" />
                Explore APIs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Learn how to integrate mock APIs</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/docs">
                <BookOpen className="h-4 w-4" />
                View Docs
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
