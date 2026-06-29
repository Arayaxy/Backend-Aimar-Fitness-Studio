const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();


const clasesRutas = require('./routes/clases.route.js')
const authRutas = require('./routes/auth.route.js')
const reservas = require('./routes/reservas.route.js')

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Aimar Fitness Studio API',
            version: '1.0.0',
            description: 'Documentación básica de la API del backend.'
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const whiteList = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://frontend-aimar-fitness-studio-qxjh-git-develop-proyectsarayax.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean).map((origin) => origin.replace(/\/$/, ''))

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true)
        }

        const normalizedOrigin = origin.replace(/\/$/, '')
        const isAllowedOrigin = whiteList.includes(normalizedOrigin)
            || /^https:\/\/frontend-aimar-fitness-studio.*\.vercel\.app$/.test(normalizedOrigin)

        if (isAllowedOrigin) {
            return callback(null, true)
        }

        return callback(new Error('no permitidas CORS'))
    }
}))

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)))

app.use('/api', clasesRutas)
app.use('/api', authRutas)
app.use('/api', reservas)

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
