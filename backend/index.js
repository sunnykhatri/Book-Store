import express, { request, response } from "express"
import { PORT, MONGODBURL } from  "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Middleware for handling CORS ploicy
// Option 1: Allow all origins with Default Cors
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http:localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
.connect(MONGODBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`APP is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});