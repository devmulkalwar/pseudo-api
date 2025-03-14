// Import faker
import { faker } from "@faker-js/faker";

// Faker types array
export const fakerTypes = [
  // Airline
  "airline.aircraftType",
  "airline.airline",
  "airline.airplane",
  "airline.airport",
  "airline.flightNumber",
  "airline.recordLocator",
  "airline.seat",

  // Animal
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

  // Book
  "book.author",
  "book.format",
  "book.genre",
  "book.publisher",
  "book.series",
  "book.title",

  // Color
  "color.cmyk",
  "color.colorByCSSColorSpace",
  "color.cssSupportedFunction",
  "color.cssSupportedSpace",
  "color.hsl",
  "color.human",
  "color.lab",
  "color.rgb",
  "color.space",

  // Commerce
  "commerce.department",
  "commerce.isbn",
  "commerce.price",
  "commerce.product",
  "commerce.productAdjective",
  "commerce.productDescription",
  "commerce.productMaterial",
  "commerce.productName",

  // Company
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

  // Database
  "database.collation",
  "database.column",
  "database.engine",
  "database.mongodbObjectId",
  "database.type",

  // Datatype
  "datatype.boolean",

  // Date
  "date.anytime",
  "date.birthdate",
  "date.future",
  "date.month",
  "date.past",
  "date.recent",
  "date.soon",
  "date.weekday",

  // Finance
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

  //Food
  "food.adjective",
  "food.description",
  "food.dish",
  "food.ethnicCategory",
  "food.fruit",
  "food.ingredient",
  "food.meat",
  "food.spice",
  "food.vegetable",

  //Git
  "git.branch",
  "git.commitDate",
  "git.commitEntry",
  "git.commitMessage",
  "git.commitSha",

  //Hacker
  "hacker.abbreviation",
  "hacker.adjective",
  "hacker.ingverb",
  "hacker.noun",
  "hacker.phrase",
  "hacker.verb",

  //Image
  "image.avatar",
  "image.avatarGitHub",
  "image.dataUri",
  "image.personPortrait",
  "image.url",
  "image.urlLoremFlickr",
  "image.urlPicsumPhotos",

  //Internet
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

  //location
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

  //Lorem
  "lorem.lines",
  "lorem.paragraph",
  "lorem.paragraphs",
  "lorem.sentence",
  "lorem.sentences",
  "lorem.slug",
  "lorem.text",
  "lorem.word",
  "lorem.words",

  //Music
  "music.album",
  "music.artist",
  "music.genre",
  "music.songName",
 
  //Number
  "number.bigInt",
  "number.binary",
  "number.float",
  "number.hex",
  "number.int",
  "number.octal",
  "number.romanNumeral",

  //Person
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

  //Phone
  "phone.imei",
  "phone.number",

  //Science
  "science.ChemicalElement",
  "science.unit",

  //System
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

  //Vehicle
  "vehicle.bicycle",
  "vehicle.color",
  "vehicle.fuel",
  "vehicle.manufacturer",
  "vehicle.model",
  "vehicle.type",
  "vehicle.vehicle",
  "vehicle.vin",
  "vehicle.vrm",

  //Word
  "word.adjective",
  "word.adverb",
  "word.conjunction",
  "word.interjection",
  "word.noun",
  "word.preposition",
  "word.sample",
  "word.verb",
  "word.words"
];
