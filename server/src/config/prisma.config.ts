import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        logger.info("Connected to the database successfully!");
    } catch (error) {
        logger.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

export default prisma

