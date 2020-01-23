import { announces } from '../models'

const createAnnounce = (req, res) => {
    const { text } = req.body;
    const announce = {id:announces.length + 1, owner: req.token.id, status:"pending", text, start_date: new Date(), end_date: new Date()};
    announces.push(announce);
    return res.status(200).json({
        status:'success',
        data: {
            id: announce.id,
            owner: announce.owner,
            status: announce.status,
            text: announce.text,
            start_date: announce.start_date,
            end_date: announce.end_date
        }
    });
};


const updateAnnounce = (req, res) => {
    try{
        const announce = announces.find(a => a.id == parseInt(req.params.id));
        if(!announce){
            throw 'the announcement u want to update doesnt exist';
        }
        announce.text = req.body.text;
        announce.end_date = new Date();
        return res.status(200).json({
            status:'success',
            data: {
                id: announce.id,
                text: announce.text,
                end_date:announce.end_date
            }
        });
    } catch(error) {
        return res.status(400).json({
            status:'error',
            error:error
        });
    };
    
};

const viewAllAnnouncebyOwner = (req, res) => {
    try{
        const announce = announces.filter(a => a.owner == parseInt(req.params.owner));

        const checkOwner = announces.find(a => a.owner == parseInt(req.params.owner));
        if(!checkOwner){
            throw 'the user with that id doesnt exist';
        }

        return res.status(200).json({
            status:'success',
            data:announce
        });

    } catch(error){
        return res.status(400).json({
            status:'error',
            error:error
        });
    }
};
export { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner }