import { NextFunction, Request, Response } from "express";
import NotFoundException from "../Exceptions/NotFoundException";
import ValidationException from "../Exceptions/ValidationException";
import { MongooseError } from "mongoose";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => 
    {
        if(err instanceof NotFoundException)
            {
                res.status(404).json({error: err.message});                
            }
        if(err instanceof ValidationException)
            {
                res.status(401).json({error: err.message});
            }       
        if(err instanceof MongooseError)
            {
                res.status(500).json("Database Error");
            }
        console.log(err.stack);
        res.status(500).json({error: "Internal server error"});
    };
export default errorHandler;