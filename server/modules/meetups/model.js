import mongoose, {Schema} from  'mongoose';

const MeetupSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlenght: [5, 'le titre doit comporter au moins 5 caractères'],
    },
    description:{
        type:String,
        required:true,
        minlenght: [10, 'la description doit comporter au moins 10 caractères']
    },
    evendate:{
        type: Date
    }, 
    group:{
        type: Schema.Types.ObjectId,
        ref:'Group'
    }
}, 
{
    timestamps : true
}
);

export default mongoose.model('Meetup', MeetupSchema);