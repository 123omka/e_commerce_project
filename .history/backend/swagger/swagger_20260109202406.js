import authPaths from "./paths/auth.paths.json" assert { type: "json" };

import authSchemas from "./schemas/auth.schema.json" assert { type: "json" };
import commonSchemas from "./schemas/common.schema.json" assert { type: "json" };

import bearerSecurity from "./security/bearer.security.json" assert { type: "json" };

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
