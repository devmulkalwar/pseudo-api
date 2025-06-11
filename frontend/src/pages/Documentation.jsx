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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Documentation = () => {
  // Add active section state
  const [activeSection, setActiveSection] = useState('getting-started');

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Monitor scroll position to update active section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const NavButton = ({ id, children }) => (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start text-left px-4 font-medium transition-colors",
        activeSection === id ? "bg-muted text-primary" : "hover:bg-muted/60"
      )}
      onClick={() => scrollToSection(id)}
    >
      {children}
    </Button>
  );

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 max-w-full sm:max-w-7xl">
      {/* Header with gradient */}
      <div className="mb-8 sm:mb-12 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate realistic mock data with Faker.js types
        </p>
      </div>
      
      <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-10">
        {/* Desktop Sidebar - Fixed position */}
        <aside className="hidden lg:block">
          <div className="fixed w-[240px] overflow-hidden">
            <ScrollArea className="pb-10">
              <nav className="space-y-1 pr-4">
                <NavButton id="getting-started">Getting Started</NavButton>
                <NavButton id="faker-types">Faker.js Types</NavButton>
                <NavButton id="integration">API Integration</NavButton>
                <NavButton id="features">Core Features</NavButton>
                <NavButton id="faq">FAQ</NavButton>
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full overflow-hidden space-y-6 sm:space-y-8 lg:space-y-10 pb-20">
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