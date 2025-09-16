import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do projeto final do Capacita",
      version: "1.0.0",
      description: "Documentação da api do projeto gerada automaticamente com Swagger + Express",
    },
    servers: [
      {
        url: "http://localhost:3001", // URL do servidor
      },
    ],
  },
  apis: [
    "./src/routes/*.js", 
    "./src/controllers/*.js",
  ], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
