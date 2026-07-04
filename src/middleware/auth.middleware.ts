import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

    interface JwtPayload {
        id: number;
        email: string;
    }

    declare global {
        namespace Express {
            interface Request {
                user?: JwtPayload;
            }
        }
    }

    export const authenticate = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as JwtPayload;

            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    };