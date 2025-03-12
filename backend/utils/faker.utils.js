import { faker } from "@faker-js/faker";

export const generateFakeData = (schema) => {
  const result = {};
  for (const field in schema) {
    try {
      result[field] = eval(schema[field]); // Dynamically execute Faker.js methods
    } catch (error) {
      result[field] = `Invalid Faker.js method: ${schema[field]}`;
    }
  }
  return result;
};
