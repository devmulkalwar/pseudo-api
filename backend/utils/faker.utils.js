import { faker } from "@faker-js/faker";

export const generateFakeData = ({ entries, schema }) => {
  const data = [];

  for (let i = 0; i < entries; i++) {
    const entry = {};
    for (const field of schema) {
      entry[field.fieldName] = getFakerValue(field.fieldType);
    }
    data.push(entry);
  }

  return data;
};

// 🔥 Helper function to resolve Faker.js methods dynamically
const getFakerValue = (methodPath) => {
  try {
    const pathParts = methodPath.split(".");

    if (pathParts[0] !== "faker") return `Invalid Faker.js method: ${methodPath}`;

    let fakerMethod = faker;
    for (let i = 1; i < pathParts.length; i++) {
      fakerMethod = fakerMethod[pathParts[i]];
      if (!fakerMethod) return `Invalid Faker.js method: ${methodPath}`;
    }

    return typeof fakerMethod === "function" ? fakerMethod() : fakerMethod;
  } catch (error) {
    return `Error processing Faker.js method: ${methodPath}`;
  }
};
