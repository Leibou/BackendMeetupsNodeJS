import Meetup from './model'

export const createMeetup = async (req, resp) => {
    const {title, description} = req.body;
    const newMeetup = new Meetup({
        title, 
        description
    });

    try {
        return resp.status(201).json({meetup : await newMeetup.save() });
    } catch (e) {
        return resp.status(e.status).json({error:true, message : 'Error while Saving a new Meetup'})
    }

};

export const getAllMeetups =  async(req, res)=>{
    try {
        return res.status(200).json({meetups: await Meetup.find({})})
        
    } catch (error) {
        return resp.status(e.status).json({error:true, message : 'Error while Retriving all Meetups'})
        
    }
}




