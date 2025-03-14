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
import { BookOpen, Code, Mail, Star, Plus, Share2, Search } from "lucide-react";

const Documentation = () => {
  const fakerTypes = [
    { category: "Name", types: ["name.firstName", "name.lastName", "name.fullName"] },
    { category: "Internet", types: ["internet.email", "internet.userName", "internet.domainName"] },
    { category: "Address", types: ["address.streetAddress", "address.city", "address.zipCode"] },
    { category: "Commerce", types: ["commerce.product", "commerce.price", "commerce.department"] }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-[250px_1fr] gap-8">
      {/* Navigation */}
      <div className="hidden md:block space-y-2">
        <h2 className="text-lg font-semibold mb-4">Contents</h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <a href="#getting-started">Getting Started</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <a href="#datatypes">Faker.js Types</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <a href="#integration">API Integration</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <a href="#features">Core Features</a>
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Getting Started */}
        <Card id="getting-started">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Create Account</h3>
              <p className="text-muted-foreground">
                Sign up using Google, GitHub, or email authentication
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">2. Generate API</h3>
              <p className="text-muted-foreground">
                Use our visual builder to create mock APIs in seconds
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">3. Use API</h3>
              <p className="text-muted-foreground">
                Integrate the provided endpoint into your application
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Faker.js Datatypes */}
        <Card id="datatypes">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Faker.js Datatypes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Available Types</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fakerTypes.map((type) => (
                  <TableRow key={type.category}>
                    <TableCell className="font-medium">{type.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {type.types.map((t) => (
                          <code key={t} className="text-sm bg-muted px-2 py-1 rounded">
                            {t}
                          </code>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 text-sm text-muted-foreground">
              Full reference available on{" "}
              <a href="https://fakerjs.dev/" className="text-primary hover:underline">
                Faker.js documentation
              </a>
            </p>
          </CardContent>
        </Card>

        {/* API Integration */}
        <Card id="integration">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              API Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="axios">
              <TabsList>
                <TabsTrigger value="axios">Axios</TabsTrigger>
                <TabsTrigger value="fetch">Fetch</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="axios">
                <CodeBlock
                  code={`axios.get('https://pseudoapi.com/api/your-api-id')
  .then(response => console.log(response.data))`}
                  language="javascript"
                />
              </TabsContent>

              <TabsContent value="fetch">
                <CodeBlock
                  code={`fetch('https://pseudoapi.com/api/your-api-id')
  .then(response => response.json())
  .then(data => console.log(data))`}
                  language="javascript"
                />
              </TabsContent>

              <TabsContent value="python">
                <CodeBlock
                  code={`import requests
response = requests.get('https://pseudoapi.com/api/your-api-id')
print(response.json())`}
                  language="python"
                />
              </TabsContent>

              <TabsContent value="curl">
                <CodeBlock
                  code={`curl -X GET https://pseudoapi.com/api/your-api-id`}
                  language="bash"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Core Features */}
        <Card id="features">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Core Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Plus className="h-5 w-5" />
                Create API
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Navigate to Dashboard → Create API</li>
                <li>Add fields with Faker.js datatypes</li>
                <li>Set entries count (1-1000)</li>
                <li>Generate and copy endpoint</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Share2 className="h-5 w-5" />
                Share API
              </h3>
              <div className="text-muted-foreground">
                <p>Toggle visibility between Public/Private</p>
                <CodeBlock
                  code="https://pseudoapi.com/api/public/your-api-id"
                  language="text"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Search className="h-5 w-5" />
                Discover APIs
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Search by name, category, or creator</li>
                <li>Filter by stars, date, or popularity</li>
                <li>Preview API structure before use</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="rate-limits">
                <AccordionTrigger>What are the rate limits?</AccordionTrigger>
                <AccordionContent>
                  Free tier: 100 requests/day, Pro: 5000 requests/day
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="data-refresh">
                <AccordionTrigger>How often does data refresh?</AccordionTrigger>
                <AccordionContent>
                  Data regenerates on every API call
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Contact us at{" "}
              <a href="mailto:support@pseudoapi.com" className="text-primary hover:underline">
                support@pseudoapi.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;