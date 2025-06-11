import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import { 
  BookOpen, 
  Code, 
  Mail, 
  Star, 
  Plus, 
  Share2, 
  Search,
  ChevronRight,
  Database,
  Calendar,
  User,
  Image,
  Globe,
  MapPin,
  AlignLeft,
  Music,
  Hash,
  Phone,
  Beaker,
  HardDrive,
  Car,
  MessageSquare,
  Briefcase,
  PiggyBank,
  Utensils,
  GitBranch,
  Terminal,
  Palette,
  Building
} from "lucide-react";
import { useState } from "react";
import FakerjsTypes from "@/components/FakerjsTypes";
import ApiIntegration from "@/components/ApiIntegration";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";

const Documentation = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:py-8">
      {/* Header - Mobile First */}
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">PseudoAPI Documentation</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Generate realistic mock data with Faker.js types
        </p>
      </div>
      
      {/* Main Content Grid - Stack on mobile, side-by-side on desktop */}
      <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
        {/* Sidebar Navigation - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block space-y-4 sticky top-6 self-start">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
            <Button variant="ghost" className="w-full justify-start">
              <a href="#getting-started">Getting Started</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <a href="#faker-types">Faker.js Types</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <a href="#integration">API Integration</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <a href="#features">Core Features</a>
            </Button>
          </div>
          
          
        </div>
        
        {/* Mobile Navigation Tabs - Shown on mobile only */}
        <div className="lg:hidden mb-6">
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="w-full grid grid-cols-2 gap-2 mb-4">
              <TabsTrigger value="getting-started">Get Started</TabsTrigger>
              <TabsTrigger value="faker-types">Faker Types</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="getting-started">
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Create Account</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Sign up using Google, GitHub, or email
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Generate API</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Use our visual builder to create mock APIs
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                        <Share2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Use API</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Integrate the endpoint into your application
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            
            <TabsContent value="integration">
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <p className="mb-4">Quick integration example:</p>
                  <CodeBlock
                    code={`fetch('https://pseudoapi.com/api/your-api-id')
  .then(response => response.json())
  .then(data => console.log(data))`}
                    language="javascript"
                  />
                  <Button className="w-full mt-4" variant="secondary">
                    <a href="#integration">View More Examples</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features">
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Create API</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Visual builder with 300+ faker types
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                        <Share2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Share API</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Public/Private visibility options
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="secondary">
                    <a href="#features">View All Features</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Main Content Area - Full width on mobile */}
        <div className="space-y-6 sm:space-y-8">
          {/* Getting Started Card */}
          <Card id="getting-started">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Steps Grid - Stack on mobile, 3 columns on desktop */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <h3 className="font-medium">Create Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up using Google, GitHub, or email authentication
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <h3 className="font-medium">Generate API</h3>
                  <p className="text-sm text-muted-foreground">
                    Use our visual builder to create mock APIs with 300+ faker types
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <h3 className="font-medium">Use API</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate the provided endpoint into your applications
                  </p>
                </div>
              </div>
              
            </CardContent>
          </Card>

          {/* Faker Types Section */}
          <FakerjsTypes/>

          {/* API Integration */}
          <ApiIntegration/>

          {/* Core Features */}
          <Features/>

          {/* FAQs */}
          <FAQ/>       
        </div>
      </div>
    </div>
  );
};

export default Documentation;