import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"
dotenv.config({});
import path from "path";

const app=express();

// const _dirname=path.resolve();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // include if needed
};

app.use(cors(corsOptions));


const PORT=5000;
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(_dirname), "/frontend/dist"));
// app.get('*', (_,res)=>{
//     res.sendFile(path.resolve(_dirname,"frontend", "dist", "index.html"));

// })

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`);
})