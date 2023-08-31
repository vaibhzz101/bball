import { Router } from 'express';
import UserController from '../controllers/user.controller';

class UserRoute{

    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
      }    
      private initializeRoutes() {    
        this.router.post(`/welcome`, this.userController.welcome);
      }    

}

export default UserRoute;