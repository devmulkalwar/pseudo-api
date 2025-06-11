import React from "react";
import {
  ArrowRight,
  Code,
  RefreshCw,
  Shield,
  Zap,
  Users,
  Layers,
  FileJson,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { LogoIcon } from "@/components/ui/logo";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
      {/* Hero Section - Updated spacing and responsive design */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          About PseudoAPI
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The developer's toolkit for instant, customizable API endpoints that
          simplify testing and prototyping.
        </p>
      </div>

      {/* Introduction Section - Improved layout and shadow */}
      <section className="mb-16 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              What is PseudoAPI?
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
              <p>
                PseudoAPI is a powerful platform that enables developers to
                instantly create mock API endpoints for testing, development,
                and prototyping.
              </p>
              <p>
                We eliminate the tedious process of setting up backend services
                just to test your front-end applications or demonstrate
                functionality.
              </p>
              <p>
                Whether you're building a new application, testing UI
                components, or learning how to integrate with APIs, PseudoAPI
                provides the tools you need to move quickly and efficiently.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background rounded-2xl p-8 shadow-lg">
            <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto">
              <LogoIcon />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section - Enhanced cards */}
      <section className="mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Instant API Creation</CardTitle>
              <CardDescription>
                Generate production-ready API endpoints in seconds, not days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create both free and premium API endpoints with our intuitive
                interface. No coding required to get started.
              </p>
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
              <p>
                Generate random data, structured responses, and even simulate
                network conditions and error states.
              </p>
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
              <p>
                Our APIs are hosted on secure, scalable infrastructure that can
                handle anything from a small project to enterprise applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who Can Use Section - Improved contrast and spacing */}
      <section className="mb-16 sm:mb-24 bg-gradient-to-br from-muted/80 to-muted rounded-2xl p-6 sm:p-10 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Who Can Use PseudoAPI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Frontend Developers
              </h3>
              <p>
                Build and test your UI components without waiting for backend
                services to be completed. Focus on what matters: creating great
                user experiences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Backend Developers</h3>
              <p>
                Quickly prototype API structures and test integrations before
                implementing full services. Design your API contracts with
                confidence.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">QA Engineers</h3>
              <p>
                Create stable, consistent testing environments with customizable
                response scenarios. Simulate edge cases and error conditions
                with ease.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Students & Educators
              </h3>
              <p>
                Learn API integration without complex setup. Perfect for
                educational environments, coding bootcamps, and self-directed
                learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Improved responsiveness */}
      <section className="mb-12 md:mb-16 lg:mb-24">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            How It Works
          </h2>
        </div>

        <Tabs defaultValue="create" className="w-full">
          {/* Tabs Navigation - Responsive layout */}
          <TabsList className="flex gap-2 mb-6 md:mb-10 max-w-4xl mx-auto p-1 rounded-lg">
            <TabsTrigger
              value="create"
              className="py-3 px-4 text-base md:text-lg font-medium flex-1"
            >
              Create
            </TabsTrigger>
            <TabsTrigger
              value="configure"
              className="py-3 px-4 text-base md:text-lg font-medium flex-1"
            >
              Configure
            </TabsTrigger>
            <TabsTrigger
              value="integrate"
              className="py-3 px-4 text-base md:text-lg font-medium flex-1"
            >
              Integrate
            </TabsTrigger>
          </TabsList>

          {/* Steps Content - Improved mobile layout */}
          <TabsContent value="create">
            <div className="bg-muted rounded-xl p-4 sm:p-6 flex flex-col xs:flex-row items-start gap-4 sm:gap-6 shadow-sm border border-border">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <div className="bg-primary text-primary-foreground font-bold text-lg sm:text-xl h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center">
                    1
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                  Create Your API
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Start by simply clicking <strong>"Create New API"</strong> from
                  your dashboard. Give it a name and description that helps you
                  identify its purpose.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configure">
            <div className="bg-muted rounded-xl p-4 sm:p-6 flex flex-col xs:flex-row items-start gap-4 sm:gap-6 shadow-sm border border-border">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <div className="bg-primary text-primary-foreground font-bold text-lg sm:text-xl h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center">
                    2
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                  Define Your Response
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Use our JSON editor or select from pre-built templates to
                  define exactly what data your API will return. Add
                  randomization rules, delays, or specific response codes.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrate">
            <div className="bg-muted rounded-xl p-4 sm:p-6 flex flex-col xs:flex-row items-start gap-4 sm:gap-6 shadow-sm border border-border">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <div className="bg-primary text-primary-foreground font-bold text-lg sm:text-xl h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center">
                    3
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                  Use Your Endpoint
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Instantly receive a unique API endpoint that you can use in
                  your applications. Copy the URL, add it to your code, and
                  you're ready to go.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </section>
      {/* Why Choose Us Section - Improved grid and icons */}
      <section className="mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Why Choose PseudoAPI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    No Setup Required
                  </h3>
                  <p>
                    Start using PseudoAPI immediately after signing up. No
                    configuration, servers, or complex onboarding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Save Development Time
                  </h3>
                  <p>
                    What would take days to develop can be created in minutes.
                    Focus your resources on building your core application.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Works with Any Stack
                  </h3>
                  <p>
                    Our RESTful endpoints are compatible with any programming
                    language or framework. Use PseudoAPI with React, Angular,
                    Vue, Node.js, Python, and more.
                  </p>
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
                <h3 className="text-xl font-semibold mb-1">
                  Custom Schema Design
                </h3>
                <p>
                  Design your API schema with our visual builder. Choose from
                  over 300+ faker types to generate realistic data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Secure by Design</h3>
                <p>
                  All endpoints are served over HTTPS. Optional authentication
                  ensures your test data remains private.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Team Collaboration
                </h3>
                <p>
                  Share endpoints with team members. Collaborate on API designs
                  and ensure everyone is working with the same test data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced gradient and button layout */}
      <section className="bg-gradient-to-br from-primary/15 via-primary/5 to-background rounded-2xl p-8 sm:p-12 text-center shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Get Started Today
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
          Join thousands of developers who are accelerating their workflow with
          PseudoAPI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base font-medium px-8"
              >
                Sign Up Free
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              className="w-full sm:w-auto text-base font-medium px-8"
              asChild
            >
              <Link to="/create-api">Create New API</Link>
            </Button>
          </SignedIn>
          <Link to="/docs">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base font-medium px-8"
            >
              Documentation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
