import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use routes
app.use('/', routes);

export default app;