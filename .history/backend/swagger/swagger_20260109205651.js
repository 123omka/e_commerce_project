import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// helper to load json
const loadJSON = (relativePath) =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, relativePath), "utf-8")
  );

// load swagger pieces
const authPaths = loadJSON("./paths/auth.paths.json");

const authSchemas = loadJSON("./schemas/auth.schema.json");
const commonSchemas = loadJSON("./schemas/common.schema.json");

const bearerSecurity = loadJSON("./security/bearer.security.json");
//path and 
const productPaths = loadJSON("./paths/product.paths.json");
const productSchemas = loadJSON("./schemas/product.schema.json");


export const swaggerSpec = {
  openapi: "3.0.0",

  info: {
    title: "E-Commerce API",
    version: "1.0.0",
    description: "Complete API documentation for E-Commerce backend"
  },

  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local server"
    }
  ],

  tags: [
    {
      name: "Auth",
      description: "Authentication & User Profile APIs"
    }
  ],

  paths: {
    ...authPaths
  },

  components: {
    securitySchemes: {
      ...bearerSecurity
    },

    schemas: {
      ...authSchemas,
      ...commonSchemas
    }
  }
};
