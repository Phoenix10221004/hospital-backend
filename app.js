import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import mysql from 'mysql'
import routes from './routes/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


dotenv.config()
const app = express()

app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());


app.use('/api', routes);
app.use(express.static(path.join(__dirname,'uploads')))
app.use('/uploads',express.static('uploads'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server is up", PORT));

