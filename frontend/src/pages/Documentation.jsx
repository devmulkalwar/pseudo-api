import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Copy, 
  Github, 
  ChevronDown, 
  ChevronRight,
  AlertTriangle,
  Info,
  Lightbulb,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Sample data structure for documentation
const sections = [
  { id: 'introduction', title: 'Introduction', subsections: ['Overview', 'Features'] },
  { id: 'getting-started', title: 'Getting Started', subsections: ['Installation', 'Setup', 'Authentication'] },
  { id: 'api-endpoints', title: 'API Endpoints', subsections: ['Users', 'Products', 'Orders', 'Analytics'] },
  { id: 'request-response', title: 'Request & Response Format', subsections: ['Headers', 'Parameters', 'JSON Structures'] },
  { id: 'error-handling', title: 'Error Handling', subsections: ['Common Errors', 'Troubleshooting'] },
  { id: 'faqs', title: 'FAQs', subsections: [] }
];

const Documentation = () => {
  const { sectionId = 'introduction', subsectionId = 'overview' } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: sectionId === section.id }), {})
  );

  // Toggle section expansion
  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy code to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show a toast notification here (using your preferred toast library)
  };

  // Find current section and subsection
  const currentSection = sections.find(s => s.id === sectionId) || sections[0];
  const sectionTitle = currentSection ? currentSection.title : 'Introduction';
  const subsectionTitle = subsectionId.charAt(0).toUpperCase() + subsectionId.slice(1);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Sticky Header with Search and Breadcrumbs */}
      <div className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">
              Learn how to integrate and use PseudoAPI in your projects
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumb className="mb-2">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/documentation">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/documentation/${sectionId}`}>{sectionTitle}</BreadcrumbLink>
          </BreadcrumbItem>
          {subsectionId && (
            <BreadcrumbItem>
              <BreadcrumbLink>{subsectionTitle}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Inner Content Scrollable Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            {/* Documentation Content */}
            <div className="space-y-8">
              {/* Section Title */}
              <div>
                <h2 className="text-3xl font-bold">{sectionTitle}</h2>
                <p className="text-muted-foreground mt-2">
                  {subsectionTitle === 'Overview' 
                    ? 'Get started with PseudoAPI and learn the basics'
                    : `Learn about ${sectionTitle} - ${subsectionTitle}`}
                </p>
              </div>

              {/* Example Content Based on Section */}
              {sectionId === 'api-endpoints' && (
                <Card>
                  <CardHeader>
                    <Badge className="mb-2 w-fit">GET</Badge>
                    <CardTitle>Fetch User Data</CardTitle>
                    <CardDescription>
                      Retrieve information about a user by ID or username
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Endpoint Details */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Endpoint</h4>
                      <div className="bg-muted rounded-md p-3 font-mono text-sm flex justify-between items-center">
                        <code>GET /api/v1/users/:id</code>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard('GET /api/v1/users/:id')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Parameters */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Parameters</h4>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-3 gap-4 p-4 border-b">
                          <div className="font-medium">Parameter</div>
                          <div className="font-medium">Type</div>
                          <div className="font-medium">Description</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 border-b">
                          <div className="font-mono text-sm">id</div>
                          <div>string</div>
                          <div>The unique identifier of the user</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div className="font-mono text-sm">fields</div>
                          <div>string (optional)</div>
                          <div>Comma-separated list of fields to include</div>
                        </div>
                      </div>
                    </div>

                    {/* Example Request */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Example Request</h4>
                      <Tabs defaultValue="curl">
                        <TabsList className="mb-2">
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="js">JavaScript</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curl" className="relative">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(`curl -X GET https://api.pseudoapi.com/v1/users/12345 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
{`curl -X GET https://api.pseudoapi.com/v1/users/12345 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                          </pre>
                        </TabsContent>
                        <TabsContent value="js" className="relative">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(`fetch('https://api.pseudoapi.com/v1/users/12345', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
{`fetch('https://api.pseudoapi.com/v1/users/12345', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                          </pre>
                        </TabsContent>
                        <TabsContent value="python" className="relative">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.pseudoapi.com/v1/users/12345', headers=headers)
data = response.json()
print(data)`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.pseudoapi.com/v1/users/12345', headers=headers)
data = response.json()
print(data)`}
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Example Response */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Example Response</h4>
                      <div className="relative">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(`{
  "id": "12345",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "created_at": "2023-01-15T08:30:00Z",
  "updated_at": "2023-03-22T14:45:30Z",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "status": "active"
}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
{`{
  "id": "12345",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "created_at": "2023-01-15T08:30:00Z",
  "updated_at": "2023-03-22T14:45:30Z",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "status": "active"
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Notes and Alerts */}
                    <Alert variant="default">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Note</AlertTitle>
                      <AlertDescription>
                        All timestamps are returned in ISO 8601 format and UTC timezone.
                      </AlertDescription>
                    </Alert>

                    <Alert variant="warning">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Authorization Required</AlertTitle>
                      <AlertDescription>
                        This endpoint requires a valid API key with appropriate permissions.
                      </AlertDescription>
                    </Alert>

                    <Alert variant="default" className="bg-muted/50">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Pro Tip</AlertTitle>
                      <AlertDescription>
                        Use the <code className="font-mono bg-muted/70 px-1 rounded">fields</code> parameter to reduce response size and improve performance.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {sectionId === 'introduction' && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome to PseudoAPI</CardTitle>
                      <CardDescription>
                        A powerful, flexible API solution for modern applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        PseudoAPI provides a comprehensive set of REST endpoints to handle common application needs including user management, content delivery, analytics, and more.
                      </p>
                      <p>
                        Our API is designed with developers in mind, offering consistent patterns, thorough documentation, and helpful tools to make integration as seamless as possible.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Easy Integration</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                              Simple authentication and consistent response formats make integration quick and reliable.
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Powerful Features</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                              From basic CRUD operations to complex data analysis, PseudoAPI handles it all.
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Developer-First</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                              Comprehensive documentation, SDKs, and helpful error messages make development smooth.
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">Scalable</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                              From startups to enterprise, our infrastructure scales to meet your needs.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between items-center mt-8 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Was this page helpful?</span>
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-1" /> No
                      </Button>
                    </div>

                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" /> Edit on GitHub
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Documentation;