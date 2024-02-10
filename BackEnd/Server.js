/* eslint-disable no-undef */
import cookieParser from 'cookie-parser';
import cors from "cors";
import env from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import dataRouter from "./routes/DataRoute.js";
import permissionRouter from "./routes/PermissionRoutes.js";
import RoleRoute from './routes/RoleRoute.js';
import userRouter from "./routes/UserRoutes.js";
const app = express();

env.config();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser())


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log('Connected to MongoDB');
})
.catch((err)=>{
  console.log(`Could not connect to MongoDB: ${err}`);
})

app.use('/permission', permissionRouter)
app.use('/users',cookieParser(), userRouter)
app.use('/roles', RoleRoute)
app.use('/api', dataRouter)

const Port = 4005
app.listen(Port, ()=>{
  console.log(`Server running on port ${Port}`)
})