import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RocketIcon, ServerIcon, CodeIcon, Share2Icon, StarIcon, ClipboardIcon, CheckIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";

// Code Block Component with Copy Button
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter language="json" style={dracula} className="rounded-lg">
        {code}
      </SyntaxHighlighter>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardIcon className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Generate Fake APIs in Seconds
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Create mock REST APIs instantly with realistic data using Faker.js. Perfect for prototyping, 
          testing, and demo applications.
        </p>
        <Button size="lg" className="gap-2">
          <RocketIcon className="h-4 w-4" />
          Get Started for Free
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <ServerIcon className="h-8 w-8 text-primary" />
            <CardTitle>Instant Mock APIs</CardTitle>
            <CardDescription>Generate endpoints with custom data structures</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CodeIcon className="h-8 w-8 text-primary" />
            <CardTitle>Realistic Data</CardTitle>
            <CardDescription>Names, emails, addresses, and 50+ data types</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Share2Icon className="h-8 w-8 text-primary" />
            <CardTitle>Share & Collaborate</CardTitle>
            <CardDescription>Publish APIs and collect community ratings</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Demo Preview */}
      <div className="rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Example API Response</h2>
          <Button variant="outline">
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
      </div>

      {/* CTA Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Start Building</CardTitle>
            <CardDescription>Create your first mock API in 30 seconds</CardDescription>
            <Button variant="outline" className="mt-4 gap-2">Create API</Button>
          </CardHeader>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Explore Public APIs</CardTitle>
            <CardDescription>Discover community-created APIs</CardDescription>
            <Button variant="outline" className="mt-4 gap-2">
              <StarIcon className="h-4 w-4" />
              Browse Popular
            </Button>
          </CardHeader>
        </Card>

        <Card className="bg-primary/5 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Learn how to integrate mock APIs</CardDescription>
           
            <Button as={Link} to="/docs" variant="outline" className="mt-4">
              View Docs
            </Button>
           
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Home;