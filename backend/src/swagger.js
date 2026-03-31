const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helpdesk API',
            version: '1.0.0',
            description: 'Helpdesk Support Ticket Management API',
        },
    },
    apis: ['./src/routes/*.js'],  // อ่าน comment จาก routes
};

module.exports = swaggerJsdoc(options);