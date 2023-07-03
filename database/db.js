import mongoose from 'mongoose';


export const Connection= async(URL)=>{
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log('Database Connected successfully');
    }catch(error){
        console.log("Error while connecting with the database",error);
    }
}

export default Connection;