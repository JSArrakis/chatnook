import express from 'express';
import routes from './routes';

const app = express();

// Use routes
app.use('/', routes);

export default app;