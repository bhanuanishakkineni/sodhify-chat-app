import express from 'express';
import dotenv from 'dotenv';
import appRouter from './route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

appRouter(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

