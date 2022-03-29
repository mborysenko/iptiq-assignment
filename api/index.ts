import express from 'express'

import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import { initialize }  from 'express-openapi';
import { serve, setup } from 'swagger-ui-express';
const apiDoc = require('./docs').default;
import * as path from "path";

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.use(
    "/api-documentation",
    serve,
    setup(undefined, {
        swaggerOptions: {
            url: "http://localhost:3444/api-docs",
        },
    })
);

initialize({
    app,
    apiDoc,
    dependencies: {
        client: prisma
    },
    paths: path.resolve(__dirname, './routes/'),
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/
})
export {
    app,
}
