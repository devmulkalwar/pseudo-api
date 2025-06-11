import React, { useState } from "react";
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
  Building,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const fakerCategories = {
  Person: {
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
      "person.zodiacSign",
    ],
    description:
      "Generate realistic person data including names, demographics, and professional details.",
  },
  Internet: {
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
      "internet.username",
    ],
    description:
      "Create internet-related data including email addresses, usernames, and network information.",
  },
  Location: {
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
      "location.zipCode",
    ],
    description:
      "Generate geographic data like addresses, coordinates, and location identifiers.",
  },
  Date: {
    icon: <Calendar className="h-4 w-4" />,
    types: [
      "date.anytime",
      "date.birthdate",
      "date.future",
      "date.month",
      "date.past",
      "date.recent",
      "date.soon",
      "date.weekday",
    ],
    description:
      "Create date and time values with flexibility for past, present, and future timestamps.",
  },
  Commerce: {
    icon: <Briefcase className="h-4 w-4" />,
    types: [
      "commerce.department",
      "commerce.isbn",
      "commerce.price",
      "commerce.product",
      "commerce.productAdjective",
      "commerce.productDescription",
      "commerce.productMaterial",
      "commerce.productName",
    ],
    description:
      "Generate product and commerce-related data for e-commerce applications.",
  },
  Company: {
    icon: <Building className="h-4 w-4" />,
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
      "company.suffix",
    ],
    description:
      "Create company names, catchphrases, and corporate terminology.",
  },
  Finance: {
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
      "finance.transactionType",
    ],
    description:
      "Generate financial data including account numbers, currencies, and payment information.",
  },
  Lorem: {
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
      "lorem.words",
    ],
    description: "Create placeholder text in various formats and lengths.",
  },
  Image: {
    icon: <Image className="h-4 w-4" />,
    types: [
      "image.avatar",
      "image.avatarGitHub",
      "image.dataUri",
      "image.personPortrait",
      "image.url",
      "image.urlLoremFlickr",
      "image.urlPicsumPhotos",
    ],
    description: "Generate image URLs and avatars for placeholder content.",
  },
  Animal: {
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
      "animal.type",
    ],
    description: "Create animal names and types for various species.",
  },
  Database: {
    icon: <Database className="h-4 w-4" />,
    types: [
      "database.collation",
      "database.column",
      "database.engine",
      "database.mongodbObjectId",
      "database.type",
    ],
    description:
      "Generate database-related values including column names and IDs.",
  },
  System: {
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
      "system.semver",
    ],
    description:
      "Create system data including file names, paths, and version numbers.",
  },
  Vehicle: {
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
      "vehicle.vrm",
    ],
    description:
      "Generate vehicle-related data including makes, models, and identifiers.",
  },
  Word: {
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
      "word.words",
    ],
    description:
      "Create words by part of speech for natural language generation.",
  },
  Book: {
    icon: <BookOpen className="h-4 w-4" />,
    types: [
      "book.author",
      "book.format",
      "book.genre",
      "book.publisher",
      "book.series",
      "book.title",
    ],
    description:
      "Generate book-related information including titles and authors.",
  },
  Music: {
    icon: <Music className="h-4 w-4" />,
    types: ["music.album", "music.artist", "music.genre", "music.songName"],
    description: "Create music-related data including artists and song titles.",
  },
  Number: {
    icon: <Hash className="h-4 w-4" />,
    types: [
      "number.bigInt",
      "number.binary",
      "number.float",
      "number.hex",
      "number.int",
      "number.octal",
      "number.romanNumeral",
    ],
    description: "Generate numbers in various formats and ranges.",
  },
  Phone: {
    icon: <Phone className="h-4 w-4" />,
    types: ["phone.imei", "phone.number"],
    description: "Create realistic phone numbers and device identifiers.",
  },
  Color: {
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
      "color.space",
    ],
    description:
      "Generate color values in various formats including RGB, HSL, and human-readable names.",
  },
  Food: {
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
      "food.vegetable",
    ],
    description:
      "Create food-related data including dishes, ingredients, and descriptions.",
  },
  Git: {
    icon: <GitBranch className="h-4 w-4" />,
    types: [
      "git.branch",
      "git.commitDate",
      "git.commitEntry",
      "git.commitMessage",
      "git.commitSha",
    ],
    description:
      "Generate Git-related information including commit messages and branch names.",
  },
  Hacker: {
    icon: <Terminal className="h-4 w-4" />,
    types: [
      "hacker.abbreviation",
      "hacker.adjective",
      "hacker.ingverb",
      "hacker.noun",
      "hacker.phrase",
      "hacker.verb",
    ],
    description:
      "Create hacker and tech jargon for realistic developer content.",
  },
  Airline: {
    icon: <Star className="h-4 w-4" />,
    types: [
      "airline.aircraftType",
      "airline.airline",
      "airline.airplane",
      "airline.airport",
      "airline.flightNumber",
      "airline.recordLocator",
      "airline.seat",
    ],
    description:
      "Generate airline and flight-related information including flight numbers and airports.",
  },
  Science: {
    icon: <Beaker className="h-4 w-4" />,
    types: ["science.ChemicalElement", "science.unit"],
    description:
      "Create scientific data including chemical elements and measurement units.",
  },
  Datatype: {
    icon: <Database className="h-4 w-4" />,
    types: ["datatype.boolean"],
    description: "Generate basic data types for schema development.",
  },
};

// Example values for popular faker types
const exampleValues = {
  "person.fullName": "Sarah Johnson",
  "internet.email": "sarah.johnson@example.net",
  "location.streetAddress": "4218 Maple Avenue",
  "date.future": "2025-09-15T14:32:18.543Z",
  "commerce.product": "Incredible Steel Computer",
  "lorem.paragraph":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "finance.creditCardNumber": "4532 **** **** 8745",
  "image.avatar":
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1118.jpg",
};

const FakerjsTypes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  //   Filter categories based on search term
  const filteredCategories = Object.entries(fakerCategories).filter(
    ([category, data]) => {
      if (!searchTerm) return true;

      const matchCategory = category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchTypes = data.types.some((type) =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return matchCategory || matchTypes;
    }
  );
  return (
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
                <div className="font-mono text-sm text-primary mb-1">
                  {type}
                </div>
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
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category ? null : category
                  )
                }
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
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    expandedCategory === category ? "rotate-90" : ""
                  }`}
                />
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
                {fakerCategories[expandedCategory].types.map((type) => (
                  <code
                    key={type}
                    className="text-xs bg-background px-2 py-1 rounded border"
                  >
                    {type}
                  </code>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FakerjsTypes;
