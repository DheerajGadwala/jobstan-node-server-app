import express from 'express'
import cors from 'cors'
import UsersController from "./users/users-controller.js";
import session from 'express-session'
import bodyParser from "body-parser";
import mongoose from "mongoose";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
}

const MONGO_URL = "mongodb+srv://rakeshmartin999:YWbvA8YKKSdDcoPQ@cluster0.zsh2vgk.mongodb.net/jobstan?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, options)
const app = express();
app.use(cors({
                 credentials: true,
                 origin: 'http://localhost:3000'
             }))
app.use(session({
                    secret: 'should be an environment variable',
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false }
                }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
UsersController(app)
app.listen(4100)
