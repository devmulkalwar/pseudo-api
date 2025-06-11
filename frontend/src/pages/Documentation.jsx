import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import FakerjsTypes from "@/components/FakerjsTypes";
import ApiIntegration from "@/components/ApiIntegration";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";

const Documentation = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 max-w-full sm:max-w-6xl overflow-hidden">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
          PseudoAPI Documentation
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Generate realistic mock data with Faker.js types
        </p>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-[240px_1fr] gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block">
          <ScrollArea className="h-[calc(100vh-8rem)] sticky top-20 pr-4">
            <div className="space-y-2 py-2">
              <h2 className="text-lg font-semibold mb-3">Quick Navigation</h2>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left pl-3"
                  onClick={() => scrollToSection('getting-started')}
                >
                  Getting Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left pl-3"
                  onClick={() => scrollToSection('faker-types')}
                >
                  Faker.js Types
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left pl-3"
                  onClick={() => scrollToSection('integration')}
                >
                  API Integration
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left pl-3"
                  onClick={() => scrollToSection('features')}
                >
                  Core Features
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left pl-3"
                  onClick={() => scrollToSection('faq')}
                >
                  FAQ
                </Button>
              </div>
            </div>
          </ScrollArea>
        </aside>
        
        {/* Mobile Navigation - Updated for better scrolling */}
        <div className="lg:hidden -mx-2 mb-4">
          <ScrollArea className="w-screen">
            <div className="flex space-x-2 py-1 px-2 min-w-max">
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
                onClick={() => scrollToSection('getting-started')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
                onClick={() => scrollToSection('faker-types')}
              >
                Faker Types
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
                onClick={() => scrollToSection('integration')}
              >
                Integration
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
                onClick={() => scrollToSection('features')}
              >
                Features
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
                onClick={() => scrollToSection('faq')}
              >
                FAQ
              </Button>
            </div>
          </ScrollArea>
        </div>
        
        {/* Main Content Area - Improved mobile layout */}
        <main className="space-y-4 sm:space-y-6 md:space-y-8 w-full overflow-x-hidden">
          {/* Getting Started */}
          <Card id="getting-started" className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-muted/50 rounded-lg p-4 sm:p-5 space-y-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-primary font-medium text-sm sm:text-base">1</span>
                </div>
                <h3 className="font-medium text-base sm:text-lg">Create Account</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Sign up using Google, GitHub, or email authentication
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 sm:p-5 space-y-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-primary font-medium text-sm sm:text-base">2</span>
                </div>
                <h3 className="font-medium text-base sm:text-lg">Generate API</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Use our visual builder to create mock APIs
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 sm:p-5 space-y-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-primary font-medium text-sm sm:text-base">3</span>
                </div>
                <h3 className="font-medium text-base sm:text-lg">Use API</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Integrate the endpoint into your application
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Component wrappers with overflow control */}
          <div id="faker-types" className="w-full overflow-x-hidden">
            <FakerjsTypes />
          </div>
          
          <div id="integration" className="w-full overflow-x-hidden">
            <ApiIntegration />
          </div>
          
          <div id="features" className="w-full overflow-x-hidden">
            <Features />
          </div>
          
          <div id="faq" className="w-full overflow-x-hidden">
            <FAQ />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;