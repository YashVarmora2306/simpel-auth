import prisma from "../config/prisma.config"
import generateToken, { } from "../helpers/generateToken";
import { CreateUser, LoginUser } from "../types/user.type"
import bcrypt from "bcryptjs";



const registerUserService = async ({ name, email, password }: CreateUser) => {
    const existedUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existedUser) {
        throw new Error("User with email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }, select: {
            id: true,
            name: true,
            email: true,
        }
    })

    return user
}

const loginUserService = async ({ email, password }: LoginUser) => {

    const userData = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!userData) {
        throw new Error("User does not exist")
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
        throw new Error("Incorrect email or password. Please try again.")
    }

    const token = generateToken(userData.id);
    const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    }

    return {
        token, user
    }
}

export {
    registerUserService,
    loginUserService
}