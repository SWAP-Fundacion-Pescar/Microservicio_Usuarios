import { NextFunction, Request, Response } from "express";
import NotFoundException from "../Exceptions/NotFoundException";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => 
    {
        if(err instanceof NotFoundException)
            {
                res.status(401).json({error: err.message});                
            }
        console.log(err.stack);
        res.status(500).json({error: "Internal server error"});
    };
export default errorHandler;