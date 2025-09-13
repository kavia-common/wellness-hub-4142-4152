const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wellness Hub API',
      version: '1.0.0',
      description: 'Express API for a modern wellness application. Provides resources and tracking features.',
    },
    servers: [{ url: 'http://localhost:3001' }],
    tags: [
      { name: 'System', description: 'System and health endpoints' },
      { name: 'Wellness', description: 'Wellness resources and tracking' },
    ],
  },
  // Include routes where Swagger docs live
  apis: ['./src/routes/*.js', './src/services/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
