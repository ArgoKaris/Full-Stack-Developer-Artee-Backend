import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } 
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found',
            });
        }

        const isvalid = await bcrypt.compare(password, user.password);

        if (!isvalid) {
            return res.status(400).json({
                success: false,
                message: 'invalid password',
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        
        res.json({
            success: true,
            message: 'login successful',
            data: {token},
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
};