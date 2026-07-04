import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardSummary = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const totalTasks = await prisma.task.count({
            where: { userId },
        });

        const completedTasks = await prisma.task.count({
            where: { userId, status: "COMPLETED" },
        });

        const pendingTasks = await prisma.task.count({
            where: { userId, status: "PENDING" },
        });

        res.json({
            success: true,
            message: "Dashboard summary",
            data: {
                totalTasks,
                completedTasks,
                pendingTasks,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};