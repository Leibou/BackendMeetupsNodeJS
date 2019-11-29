import express from 'express'
import database from './config/db'
import middelwares from './config/middelwares'
import {MeetupRoutes, GroupRoutes} from './modules'



const app = express();
const PORT = process.env.PORT || 3000

/* 
Database Access in Server Application
*/
database();
/* Middelwares Body-Parser and Morgan for Logging Requests on this Server */
middelwares(app);
app.use('/api', [MeetupRoutes, GroupRoutes]);


app.listen(PORT, err=>{ 
 
    if (err) {
        console.error(err)
    } else {
        console.log(`Server is running on port : ${PORT}`)
    } 
});

app.get('/', (req, resp)=>{
    resp.send('Here is the home page for Web Appp')
})
app.get('/login',(req, resp)=>{
    resp.send('Login Page')
});

