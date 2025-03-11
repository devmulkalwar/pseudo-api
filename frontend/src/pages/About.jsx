import React from 'react';
import { ArrowRight, Code, RefreshCw, Shield, Zap, Users, Layers, FileJson, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About PseudoAPI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The developer's toolkit for instant, customizable API endpoints that simplify testing and prototyping.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">What is PseudoAPI?</h2>
            <p className="text-lg mb-4">
              PseudoAPI is a powerful platform that enables developers to instantly create mock API endpoints for testing, development, and prototyping.
            </p>
            <p className="text-lg mb-4">
              We eliminate the tedious process of setting up backend services just to test your front-end applications or demonstrate functionality.
            </p>
            <p className="text-lg">
              Whether you're building a new application, testing UI components, or learning how to integrate with APIs, PseudoAPI provides the tools you need to move quickly and efficiently.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 flex items-center justify-center">
            <Server className="h-48 w-48 text-primary/80" />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Instant API Creation</CardTitle>
              <CardDescription>
                Generate production-ready API endpoints in seconds, not days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create both free and premium API endpoints with our intuitive interface. No coding required to get started.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <RefreshCw className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Dynamic Data</CardTitle>
              <CardDescription>
                Customizable mock data that behaves like real-world APIs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Generate random data, structured responses, and even simulate network conditions and error states.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Secure & Scalable</CardTitle>
              <CardDescription>
                Enterprise-grade infrastructure for reliable testing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our APIs are hosted on secure, scalable infrastructure that can handle anything from a small project to enterprise applications.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who Can Use Section */}
      <section className="mb-20 bg-muted/50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-10 text-center">Who Can Use PseudoAPI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Frontend Developers</h3>
              <p>Build and test your UI components without waiting for backend services to be completed. Focus on what matters: creating great user experiences.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Backend Developers</h3>
              <p>Quickly prototype API structures and test integrations before implementing full services. Design your API contracts with confidence.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">QA Engineers</h3>
              <p>Create stable, consistent testing environments with customizable response scenarios. Simulate edge cases and error conditions with ease.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Students & Educators</h3>
              <p>Learn API integration without complex setup. Perfect for educational environments, coding bootcamps, and self-directed learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="integrate">Integrate</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-4">
            <div className="bg-muted rounded-lg p-6 flex items-center gap-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <div className="bg-primary text-primary-foreground font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center">1</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your API</h3>
                <p className="text-lg">Start by simply clicking "Create New API" from your dashboard. Give it a name and description that helps you identify its purpose.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="configure" className="space-y-4">
            <div className="bg-muted rounded-lg p-6 flex items-center gap-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <div className="bg-primary text-primary-foreground font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center">2</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Define Your Response</h3>
                <p className="text-lg">Use our JSON editor or select from pre-built templates to define exactly what data your API will return. Add randomization rules, delays, or specific response codes.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="integrate" className="space-y-4">
            <div className="bg-muted rounded-lg p-6 flex items-center gap-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <div className="bg-primary text-primary-foreground font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center">3</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Use Your Endpoint</h3>
                <p className="text-lg">Instantly receive a unique API endpoint that you can use in your applications. Copy the URL, add it to your code, and you're ready to go.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Example Endpoint</CardTitle>
              <CardDescription>
                A sample API endpoint created with PseudoAPI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
{`// Request
fetch('https://api.pseudoapi.com/v1/users/random')
  .then(response => response.json())
  .then(data => console.log(data));

// Response
{
  "id": "u-7821",
  "name": "Alex Johnson",
  "email": "alex.johnson@example.com",
  "role": "developer",
  "createdAt": "2023-09-15T08:30:45Z"
}`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Why Choose PseudoAPI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">No Setup Required</h3>
                  <p>Start using PseudoAPI immediately after signing up. No configuration, servers, or complex onboarding.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Save Development Time</h3>
                  <p>What would take days to develop can be created in minutes. Focus your resources on building your core application.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Works with Any Stack</h3>
                  <p>Our RESTful endpoints are compatible with any programming language or framework. Use PseudoAPI with React, Angular, Vue, Node.js, Python, and more.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <FileJson className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Flexible Data Formats</h3>
                <p>Generate responses in JSON, XML, CSV, or plain text. Structure your data however your application needs it.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Secure by Design</h3>
                <p>All endpoints are served over HTTPS. Optional authentication ensures your test data remains private.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Team Collaboration</h3>
                <p>Share endpoints with team members. Collaborate on API designs and ensure everyone is working with the same test data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Join thousands of developers who are accelerating their workflow with PseudoAPI. Create your first endpoint in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-md px-8">
            Sign Up Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-md">
            View Documentation
          </Button>
        </div>
        <p className="text-muted-foreground mt-6">
          No credit card required. Free plan includes 1,000 API calls per month.
        </p>
      </section>
    </div>
  );
};

export default About;