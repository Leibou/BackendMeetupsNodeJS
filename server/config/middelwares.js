import bodyParser from 'body-parser';
import morgan from 'morgan';

export default app =>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ useNewUrlParser: true }))
    app.use(morgan('dev'))
}