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

export { createAnnounce }