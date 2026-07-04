import { Request, Response } from "express";
import prisma from "../config/prisma";  

export const getTask = async (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "protected route",
        user: req.user,
    });
};

// Membuat task baru
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: req.user!.id,
            },
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }   
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;

        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Menghapus task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
