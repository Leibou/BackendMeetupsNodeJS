import mongoose, {Schema} from 'mongoose'

const GroupSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        minlength : [5, 'Le nom du groupe doit comporter au moins 5 caractères']
    },
    description : {
        type:String,
        required: true,
        minlength : [10, 'La description doit comporter au moins 10 caractères']
    },
    category:{
        type: String,
    },
    meetups :[{
        type : Schema.Types.ObjectId,
        ref : 'Meetup',
    }]
},
 {timestamps : true}
 )

 /* 
*  Creation et ajout d'un meetup dans un groupe
 */
 GroupSchema.statics.addMeetup = async function(id, args){
     const Meetup = mongoose.model('Meetup');
     const meetup = await new Meetup({...args, group : id});

    //  On récupère le groupe grâce à l'Id fournis dans l'URL
    // Ensuite on effectue un push du Meetup dans l'attribut meetup de groupe
     const group = await this.findByIdAndUpdate(id, {$push:{meetups : meetup.id}});
     
     
     return  {
         meetup : await meetup.save(),
         group
     };


 };

export default mongoose.model('Group', GroupSchema);