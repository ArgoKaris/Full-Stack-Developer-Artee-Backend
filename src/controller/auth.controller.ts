import {Request, Response} from 'express';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await prisma.user.findUnique({ where: { email } });
    
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
    }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email,
                password: hashedPassword,
            },
        });

        res.json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    }

        catch (error) {
            res.status(500).json({
                success: false,
                message: 'server error',
            });
        }
    };
        
// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );  

    res.json({
      success: true,
      message: "Login success",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};