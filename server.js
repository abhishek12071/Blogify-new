import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './routes/route.js';
import path from 'path';

const __dirname=path.resolve();

dotenv.config();
const app=express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Router);

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static("client/build"));
// }
app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })
})

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log("Server is running on port: 8000"));

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI ||`mongodb://${USERNAME}:${PASSWORD}@ac-v4dwcnh-shard-00-00.0eqmbzk.mongodb.net:27017,ac-v4dwcnh-shard-00-01.0eqmbzk.mongodb.net:27017,ac-v4dwcnh-shard-00-02.0eqmbzk.mongodb.net:27017/?ssl=true&replicaSet=atlas-hb0634-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);