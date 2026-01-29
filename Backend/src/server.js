import express from 'express';
import dotenv from 'dotenv/config';
import appRouter from './route.js';
import path from 'path';
import { connectDB } from "./startup/db.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cors());

appRouter(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    app.use((req, res, next) => {
        // Skip API routes
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

