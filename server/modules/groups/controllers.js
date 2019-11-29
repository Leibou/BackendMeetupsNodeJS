import Group  from './model'
import { Meetup } from '../meetups'

export const createGroup = async (req, res) => {
    const {
        name,
        description,
        category
    } 
    = req.body

    /* Name Validation  */
    if(!name){
        res.status(400).json({error : true, message : 'Le nom est requis'});
    } 
    else if(typeof name!== 'string'){
        res.status(400).json({error : true, message : 'Le nom doit être une chaine de caractères'});
        
    }
    else if (name.length < 5){
        res.status(400).json({error : true, message : 'Le nom doit comporter au moins 5 caractères'});

    }
    /* Description Validation  */
    if(!description){
        res.status(400).json({error : true, message : 'La Description est requise'});
    } 
    else if(typeof description!== 'string'){
        res.status(400).json({error : true, message : 'La Description doit être une chaine de caractères'});
        
    }
    else if (description.length < 10){
        res.status(400).json({error : true, message : 'La Description doit comporter au moins 10 caractères'});

    }

    const group = new Group({name, description})

    try {
        return res.status(200).json({error: false, group : await group.save()});
    } catch (error) {
        res.status(400).json({error : true, message : 'Error while Creating a MeetupGroup'});
        
    }
}


export const createGroupMeetup = async (req, res)=>{

    const {title, description } = req.body
    const {groupId} = req.params;

    if(!title){
        res.status(400).json({error : true, message : 'Le Titre  est requis'});
    } 
    else if(typeof title!== 'string'){
        res.status(400).json({error : true, message : 'Le Titre doit être une chaine de caractères'});
        
    }
    else if (title.length < 5){
        res.status(400).json({error : true, message : 'Le Titre doit comporter au moins 5 caractères'});

    }
    if(!description){
        res.status(400).json({error : true, message : 'Le Description  est requis'});
    } 
    else if(typeof description!== 'string'){
        res.status(400).json({error : true, message : 'La Description doit être une chaine de caractères'});
        
    }
    else if (description.length < 10){
        res.status(400).json({error : true, message : 'La Description doit comporter au moins 10 caractères'});

    }
    if (!groupId) {
        res.status(400).json({error : true, message : 'L\'ID du groupe est nécessaire'});
        
    }

    try {
        const {meetup, group} = await Group.addMeetup(groupId, {title, description});
        return res.status(201).json({error:false, meetup, group });
    } catch (e) {
        res.status(400).json({error : true, message : 'Le Meetup ne peux pas être créer'});
        
    }
};


export const getGroupMeetups =  async (req, res)=>{

    const { groupId } = req.params

    if (!groupId) {
        return res.status(400).json({error : true, message: 'Vous devez spécifier l\'ID du groupe'})
    }
    // Vérification de l'existence du group 
    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(400).json({error : true, message: 'Ce groupe n\'existe pas '});
    } 

    try {
        return res.status(200).json({
            error : false,
            meetup : await Meetup.find({group : groupId}).populate('group', 'name'),
        })
    } catch (e) {
        return res.status(400).json({error : true, message : 'Récuperation des meetups impossibles'})
    }


};