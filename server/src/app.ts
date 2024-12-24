import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import errorHandler from "./middlewares/errorHandler.middleware";
import logger from "./utils/logger";


const app = express()

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined", {
        stream: {
            write: message => logger.info(message.trim())
        }
    }));
}
app.use(express.urlencoded({ extended: true }))


app.use("/user", userRoutes)

app.use(errorHandler)

export default app;