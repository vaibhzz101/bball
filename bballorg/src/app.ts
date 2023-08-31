import express from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware'
import SequelizeConnection from "./database/SequelizeConnection";
import { db } from "./database/models";
class App{

    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes:  {
        path?: string;
        router: Router;
      }[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';
    
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
      } 
      
      public listen() {
        this.app.listen(this.port, () => {
          console.log(`🚀 App listening on the port ${this.port}`);
          
        });
      }   
      
      private async initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); 
        await SequelizeConnection.connect(); 
        db.sequelize.sync()     

      }      

      private initializeRoutes(routes: {
        path?: string;
        router: Router;
      }[]) {
        routes.forEach(route => {
          this.app.use('/', route.router);
        });
      }

      private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    
        this.app.use((req, res, next) =>{
          return res.status(400).json({status:"error",message:"This URL is not valid,Please enter valid URL"});
        })
    }      

      
}
export default App;