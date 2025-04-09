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
  Palette
} from "lucide-react";
import { useState } from "react";

// Organized Faker types by category
const fakerCategories = {
  "Person": {
    icon: <User className="h-4 w-4" />,
    types: [
      "person.bio",
      "person.firstName",
      "person.fullName",
      "person.gender",
      "person.jobArea",
      "person.jobDescriptor",
      "person.jobTitle",
      "person.jobType",
      "person.lastName",
      "person.prefix",
      "person.sex",
      "person.sexType",
      "person.suffix",
      "person.zodiacSign"
    ],
    description: "Generate realistic person data including names, demographics, and professional details."
  },
  "Internet": {
    icon: <Globe className="h-4 w-4" />,
    types: [
      "internet.displayName",
      "internet.domainName",
      "internet.domainSuffix",
      "internet.email",
      "internet.emoji",
      "internet.httpMethod",
      "internet.ip",
      "internet.ipv4",
      "internet.ipv6",
      "internet.jwt",
      "internet.jwtAlgorithm",
      "internet.mac",
      "internet.port",
      "internet.protocol",
      "internet.url",
      "internet.userAgent",
      "internet.username"
    ],
    description: "Create internet-related data including email addresses, usernames, and network information."
  },
  "Location": {
    icon: <MapPin className="h-4 w-4" />,
    types: [
      "location.buildingNumber",
      "location.cardinalDirection",
      "location.city",
      "location.continent",
      "location.country",
      "location.countryCode",
      "location.language",
      "location.latitude",
      "location.longitude",
      "location.nearbyGPSCoordinate",
      "location.ordinalDirection",
      "location.state",
      "location.street",
      "location.streetAddress",
      "location.zipCode"
    ],
    description: "Generate geographic data like addresses, coordinates, and location identifiers."
  },
  "Date": {
    icon: <Calendar className="h-4 w-4" />,
    types: [
      "date.anytime",
      "date.birthdate",
      "date.future",
      "date.month",
      "date.past",
      "date.recent",
      "date.soon",
      "date.weekday"
    ],
    description: "Create date and time values with flexibility for past, present, and future timestamps."
  },
  "Commerce": {
    icon: <Briefcase className="h-4 w-4" />,
    types: [
      "commerce.department",
      "commerce.isbn",
      "commerce.price",
      "commerce.product",
      "commerce.productAdjective",
      "commerce.productDescription",
      "commerce.productMaterial",
      "commerce.productName"
    ],
    description: "Generate product and commerce-related data for e-commerce applications."
  },
  "Company": {
    icon: <Briefcase className="h-4 w-4" />,
    types: [
      "company.buzzAdjective",
      "company.buzzNoun",
      "company.buzzPhrase",
      "company.buzzVerb",
      "company.catchPhrase",
      "company.catchPhraseAdjective",
      "company.catchPhraseDescriptor",
      "company.catchPhraseNoun",
      "company.name",
      "company.suffix"
    ],
    description: "Create company names, catchphrases, and corporate terminology."
  },
  "Finance": {
    icon: <PiggyBank className="h-4 w-4" />,
    types: [
      "finance.accountName",
      "finance.accountNumber",
      "finance.amount",
      "finance.bic",
      "finance.bitcoinAddress",
      "finance.creditCardCVV",
      "finance.creditCardIssuer",
      "finance.creditCardNumber",
      "finance.currency",
      "finance.currencyCode",
      "finance.currencyName",
      "finance.currencyNumericCode",
      "finance.currencySymbol",
      "finance.ethereumAddress",
      "finance.iban",
      "finance.litecoinAddress",
      "finance.maskedNumber",
      "finance.pin",
      "finance.routingNumber",
      "finance.transactionDescription",
      "finance.transactionType"
    ],
    description: "Generate financial data including account numbers, currencies, and payment information."
  },
  "Lorem": {
    icon: <AlignLeft className="h-4 w-4" />,
    types: [
      "lorem.lines",
      "lorem.paragraph",
      "lorem.paragraphs",
      "lorem.sentence",
      "lorem.sentences",
      "lorem.slug",
      "lorem.text",
      "lorem.word",
      "lorem.words"
    ],
    description: "Create placeholder text in various formats and lengths."
  },
  "Image": {
    icon: <Image className="h-4 w-4" />,
    types: [
      "image.avatar",
      "image.avatarGitHub",
      "image.dataUri",
      "image.personPortrait",
      "image.url",
      "image.urlLoremFlickr",
      "image.urlPicsumPhotos"
    ],
    description: "Generate image URLs and avatars for placeholder content."
  },
  "Animal": {
    icon: <Star className="h-4 w-4" />,
    types: [
      "animal.bear",
      "animal.bird",
      "animal.cat",
      "animal.cetacean",
      "animal.cow",
      "animal.crocodilia",
      "animal.dog",
      "animal.fish",
      "animal.horse",
      "animal.insect",
      "animal.lion",
      "animal.petName",
      "animal.rabbit",
      "animal.rodent",
      "animal.snake",
      "animal.type"
    ],
    description: "Create animal names and types for various species."
  },
  "Database": {
    icon: <Database className="h-4 w-4" />,
    types: [
      "database.collation",
      "database.column",
      "database.engine",
      "database.mongodbObjectId",
      "database.type"
    ],
    description: "Generate database-related values including column names and IDs."
  },
  "System": {
    icon: <HardDrive className="h-4 w-4" />,
    types: [
      "system.commonFileExt",
      "system.commonFileName",
      "system.commonFileType",
      "system.cron",
      "system.directoryPath",
      "system.fileExt",
      "system.fileName",
      "system.filePath",
      "system.fileType",
      "system.mimeType",
      "system.networkInterface",
      "system.semver"
    ],
    description: "Create system data including file names, paths, and version numbers."
  },
  "Vehicle": {
    icon: <Car className="h-4 w-4" />,
    types: [
      "vehicle.bicycle",
      "vehicle.color",
      "vehicle.fuel",
      "vehicle.manufacturer",
      "vehicle.model",
      "vehicle.type",
      "vehicle.vehicle",
      "vehicle.vin",
      "vehicle.vrm"
    ],
    description: "Generate vehicle-related data including makes, models, and identifiers."
  },
  "Word": {
    icon: <MessageSquare className="h-4 w-4" />,
    types: [
      "word.adjective",
      "word.adverb",
      "word.conjunction",
      "word.interjection",
      "word.noun",
      "word.preposition",
      "word.sample",
      "word.verb",
      "word.words"
    ],
    description: "Create words by part of speech for natural language generation."
  },
  "Book": {
    icon: <BookOpen className="h-4 w-4" />,
    types: [
      "book.author",
      "book.format",
      "book.genre",
      "book.publisher",
      "book.series",
      "book.title"
    ],
    description: "Generate book-related information including titles and authors."
  },
  "Music": {
    icon: <Music className="h-4 w-4" />,
    types: [
      "music.album",
      "music.artist",
      "music.genre",
      "music.songName"
    ],
    description: "Create music-related data including artists and song titles."
  },
  "Number": {
    icon: <Hash className="h-4 w-4" />,
    types: [
      "number.bigInt",
      "number.binary",
      "number.float",
      "number.hex",
      "number.int",
      "number.octal",
      "number.romanNumeral"
    ],
    description: "Generate numbers in various formats and ranges."
  },
  "Phone": {
    icon: <Phone className="h-4 w-4" />,
    types: [
      "phone.imei",
      "phone.number"
    ],
    description: "Create realistic phone numbers and device identifiers."
  },
  "Color": {
    icon: <Palette className="h-4 w-4" />,
    types: [
      "color.cmyk",
      "color.colorByCSSColorSpace",
      "color.cssSupportedFunction",
      "color.cssSupportedSpace",
      "color.hsl",
      "color.human",
      "color.lab",
      "color.rgb",
      "color.space"
    ],
    description: "Generate color values in various formats including RGB, HSL, and human-readable names."
  },
  "Food": {
    icon: <Utensils className="h-4 w-4" />,
    types: [
      "food.adjective",
      "food.description",
      "food.dish",
      "food.ethnicCategory",
      "food.fruit",
      "food.ingredient",
      "food.meat",
      "food.spice",
      "food.vegetable"
    ],
    description: "Create food-related data including dishes, ingredients, and descriptions."
  },
  "Git": {
    icon: <GitBranch className="h-4 w-4" />,
    types: [
      "git.branch",
      "git.commitDate",
      "git.commitEntry",
      "git.commitMessage",
      "git.commitSha"
    ],
    description: "Generate Git-related information including commit messages and branch names."
  },
  "Hacker": {
    icon: <Terminal className="h-4 w-4" />,
    types: [
      "hacker.abbreviation",
      "hacker.adjective",
      "hacker.ingverb",
      "hacker.noun",
      "hacker.phrase",
      "hacker.verb"
    ],
    description: "Create hacker and tech jargon for realistic developer content."
  },
  "Airline": {
    icon: <Star className="h-4 w-4" />,
    types: [
      "airline.aircraftType",
      "airline.airline",
      "airline.airplane",
      "airline.airport",
      "airline.flightNumber",
      "airline.recordLocator",
      "airline.seat"
    ],
    description: "Generate airline and flight-related information including flight numbers and airports."
  },
  "Science": {
    icon: <Beaker className="h-4 w-4" />,
    types: [
      "science.ChemicalElement",
      "science.unit"
    ],
    description: "Create scientific data including chemical elements and measurement units."
  },
  "Datatype": {
    icon: <Database className="h-4 w-4" />,
    types: [
      "datatype.boolean"
    ],
    description: "Generate basic data types for schema development."
  }
};

// Example values for popular faker types
const exampleValues = {
  "person.fullName": "Sarah Johnson",
  "internet.email": "sarah.johnson@example.net",
  "location.streetAddress": "4218 Maple Avenue",
  "date.future": "2025-09-15T14:32:18.543Z",
  "commerce.product": "Incredible Steel Computer",
  "lorem.paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "finance.creditCardNumber": "4532 **** **** 8745",
  "image.avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1118.jpg"
};

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Filter categories based on search term
  const filteredCategories = Object.entries(fakerCategories).filter(([category, data]) => {
    if (!searchTerm) return true;
    
    const matchCategory = category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTypes = data.types.some(type => 
      type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return matchCategory || matchTypes;
  });
  
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
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-2">Top Categories</h2>
            {Object.entries(fakerCategories).slice(0, 6).map(([category, data]) => (
              <Button key={category} variant="ghost" className="w-full justify-start">
                <a href={`#category-${category.toLowerCase()}`} className="flex items-center">
                  {data.icon}
                  <span className="ml-2">{category}</span>
                </a>
              </Button>
            ))}
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
            
            <TabsContent value="faker-types">
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <p className="mb-4">Top Faker.js types by category:</p>
                  <div className="space-y-2">
                    {Object.entries(fakerCategories).slice(0, 5).map(([category, data]) => (
                      <Button 
                        key={category} 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                      >
                        <div className="flex items-center">
                          {data.icon}
                          <span className="ml-2">{category}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedCategory === category ? 'rotate-90' : ''}`} />
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="secondary">
                    <a href="#faker-types">View All Types</a>
                  </Button>
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
              
              <div className="p-4 border rounded-md bg-amber-50/50 border-amber-200">
                <h4 className="font-medium text-amber-800 mb-1">Pro Tip</h4>
                <p className="text-sm text-amber-700">
                  Use the "Save Template" feature to quickly recreate your frequently used data structures
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Faker Types Section */}
          <div id="faker-types" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Faker.js Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Search - Full width on all screens */}
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search Faker.js types..."
                    className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Examples Grid - 1 column mobile, 2 columns tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(exampleValues).map(([type, value]) => (
                    <div key={type} className="border rounded-md p-3 bg-muted/30">
                      <div className="font-mono text-sm text-primary mb-1">{type}</div>
                      <div className="text-sm truncate">{value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Categories Grid - 1 column mobile, 2 columns tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {filteredCategories.map(([category, data]) => (
                    <Button
                      key={category}
                      id={`category-${category.toLowerCase()}`}
                      variant="outline"
                      className="h-auto py-3 px-4 justify-between"
                      onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                    >
                      <div className="flex items-center">
                        {data.icon}
                        <div className="ml-3 text-left">
                          <div className="font-medium">{category}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {data.types.length} types
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${expandedCategory === category ? 'rotate-90' : ''}`} />
                    </Button>
                  ))}
                </div>
                
                {/* Expanded Category */}
                {expandedCategory && (
                  <div className="border rounded-md p-4 mt-4 bg-muted/30">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      {fakerCategories[expandedCategory].icon}
                      <span className="ml-2">{expandedCategory}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {fakerCategories[expandedCategory].description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {fakerCategories[expandedCategory].types.map(type => (
                        <code key={type} className="text-xs bg-background px-2 py-1 rounded border">
                          {type}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* API Integration */}
          <Card id="integration">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="axios" className="w-full">
                <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="axios">Axios</TabsTrigger>
                  <TabsTrigger value="fetch">Fetch</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="axios" className="mt-4">
                  <CodeBlock
                    code={`// Install axios: npm install axios
import axios from 'axios';

// Make request to your PseudoAPI endpoint
axios.get('https://pseudoapi.com/api/your-api-id')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });`}
                    language="javascript"
                  />
                </TabsContent>

                <TabsContent value="fetch" className="mt-4">
                  <CodeBlock
                    code={`// Using native fetch API
fetch('https://pseudoapi.com/api/your-api-id')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });`}
                    language="javascript"
                  />
                </TabsContent>

                <TabsContent value="python" className="mt-4">
                  <CodeBlock
                    code={`# Using requests library
import requests

# Make request to your PseudoAPI endpoint
response = requests.get('https://pseudoapi.com/api/your-api-id')

# Check if request was successful
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
                    language="python"
                  />
                </TabsContent>

                <TabsContent value="curl" className="mt-4">
                  <CodeBlock
                    code={`# Simple GET request
curl -X GET https://pseudoapi.com/api/your-api-id

# Get request with pretty-printed JSON output
curl -X GET https://pseudoapi.com/api/your-api-id | json_pp`}
                    language="bash"
                  />
                </TabsContent>
              </Tabs>
              
              <div className="p-4 border rounded-md bg-muted">
                <h4 className="font-medium mb-2">Response Format</h4>
                <CodeBlock
                  code={`{
  "id": "cji8393jd",
  "createdAt": "2025-04-07T12:34:56.789Z",
  "data": [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@example.net",
      "address": "4218 Maple Avenue",
      "phone": "555-123-4567"
    },
    {
      "id": "2",
      "name": "Michael Rodriguez",
      "email": "m.rodriguez@example.org",
      "address": "729 Pine Street",
      "phone": "555-987-6543"
    }
    // ... more entries based on your configuration
  ]
}`}
                  language="json"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-green-50/50 border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Query Parameters</h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li><code>limit</code>: Number of results (1-1000)</li>
                    <li><code>seed</code>: Consistent data generation</li>
                    <li><code>locale</code>: Language/region format</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md bg-blue-50/50 border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">API Endpoints</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li><code>GET /api/{'{id}'}</code>: Fetch data</li>
                    <li><code>GET /api/public/{'{id}'}</code>: Public data</li>
                    <li><code>GET /api/schema/{'{id}'}</code>: View schema</li>
                  </ul>
                </div>
              </div>
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
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Create API</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Visual builder with 300+ faker types
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Customize field names and types
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Set entries count (1-1000)
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Save templates for reuse
                    </li>
                  </ul>
                </div>
                
                {/* Feature 2 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Share API</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Public/Private visibility options
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Generate shareable links
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Collaborative team access
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Version history tracking
                    </li>
                  </ul>
                </div>
                
                {/* Feature 3 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Discover APIs</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Browse public API library
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Filter by category or popularity
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Fork existing APIs as templates
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Preview data before using
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 border rounded-md bg-muted">
                <h4 className="font-medium mb-2">Advanced Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h5 className="font-medium">Custom Schema</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Define complex nested data structures
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h5 className="font-medium">Custom Seed</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Generate consistent data between requests
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h5 className="font-medium">Localization</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Create region-specific mock data
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <HardDrive className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h5 className="font-medium">Data Export</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Download as JSON, CSV, or SQL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rate-limits">
                  <AccordionTrigger>What are the rate limits?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Free tier: 100 requests/day<br />
                      Pro tier: 5,000 requests/day<br />
                      Enterprise tier: Custom limits available
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="data-refresh">
                  <AccordionTrigger>How often does data refresh?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      By default, data regenerates on every API call. If you need consistent data between calls, use the <code>seed</code> parameter with a consistent value.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="custom-types">
                  <AccordionTrigger>Can I create custom data types?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, Pro and Enterprise users can create custom data types with JavaScript functions. These can be saved to your account and reused across multiple APIs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="data-relationships">
                  <AccordionTrigger>Can I create relationships between data?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can create parent-child relationships between data models using references. This allows for complex data structures like users with orders or products with categories.
                    </p>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Email Support</span>
                  <span className="text-xs text-muted-foreground mt-1">support@pseudoapi.com</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Live Chat</span>
                  <span className="text-xs text-muted-foreground mt-1">Weekdays 9AM-5PM EST</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Knowledge Base</span>
                  <span className="text-xs text-muted-foreground mt-1">Tutorials & Examples</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;