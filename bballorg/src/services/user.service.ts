import {db} from '../database/models';



const  createUser = async (email:String,name:String,mobile:String)=>{
   await db.UserDetails.create({email,name,mobile});
return 'success';
}


export default createUser;