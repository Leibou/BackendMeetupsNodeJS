import mongoose from 'mongoose'


export default ()=>{

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localdev/meetupMe');
            mongoose.connection
            .once('open', ()=>{console.log('MongoDB is running')})
            .on('error', error =>{console.error(error)})
}