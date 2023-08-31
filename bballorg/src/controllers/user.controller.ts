import { NextFunction, Request, Response } from 'express';
import createUser from '../services/user.service';
class UserController{

public welcome = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {email,name,mobile} = req.body;
    createUser(email,name,mobile)
    res.json({message:"Welcome user"});
}

}

export default UserController;