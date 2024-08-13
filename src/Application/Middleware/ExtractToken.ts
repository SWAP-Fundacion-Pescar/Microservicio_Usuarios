import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface JwtPayload {
    id: string; 
}

function decodeToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.decode(token) as JwtPayload | null;
        return decoded;
    } catch (error) {
        return null;
    }
}

export function extractToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
            req.body.decoded = decoded; 
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } 
    next();
}
