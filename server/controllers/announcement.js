import Model from '../models/index.dbquery';
const announce = new Model('announcement');

const createAnnounce = async (req, res) => {
    const { text } = req.body;

    const addAnnounce = await announce.insert('owner, text',
    '$1, $2',
    [req.token.id, text]);
    return res.status(200).json({
        status:200,
        data: {
            id: addAnnounce.rows[0].id,
            owner: addAnnounce.rows[0].owner,
            status: addAnnounce.rows[0].status,
            text: addAnnounce.rows[0].text,
            start_date: addAnnounce.rows[0].start_date,
            end_date: addAnnounce.rows[0].end_date
        }
    });
};


const updateAnnounce = async (req, res) => {
    const {text} = req.body;
    try{
        const upAnnounce = await announce.updateAnd('text=$1', 
        'id=$2', 'owner=$3', 
        [text, req.params.id, req.token.id]);
        if(upAnnounce.rowCount == 0){
            throw 'the announcement you want to update does not exist for that user';
        }
        return res.status(200).json({
            status:200,
            data: {
                id:upAnnounce.rows[0].id,
                owner:upAnnounce.rows[0].owner,
                text:upAnnounce.rows[0].text
            }
        });
    } catch(error) {
        return res.status(400).json({
            status:400,
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

const viewAnnouncementByState = (req, res) => {
 const owners = announces.filter(a => a.owner == parseInt(req.params.id));
 let arr =[];
  for(let key in owners){
      if(owners[key].status == req.query.status){
          arr.push(owners[key]);
      }
  }
  return res.status(200).json({
      status:'success',
      data:arr
  });
}
 

const  viewAnnouncementById = (req, res) => {
    try{
        const announce = announces.find(a => a.id == parseInt(req.params.id));
        if(!announce){
            throw 'the provided announcement id doesnt exist';
        }
        return res.status(200).json({
            status:'success',
            data:announce
        })
    }catch(error){
        return res.status(400).json({
            status:'error',
            error:error
        });
    }
};

const deleteAnnouncement = (req, res) => {
    try{
        const announce = announces.find(a => a.id == parseInt(req.params.id));
        if(!announce){
            throw 'the provided announcement id doesnt exist';
        }
        const index = announces.indexOf(announce);
    announces.splice(index, 1);
        return res.status(200).json({
            status:'success',
            data:announce
        })
        
    }catch(error){
        return res.status(400).json({
            status:'error',
            error:error
        });
    }
}

const updateAnnounceStatus = (req, res) => {
    try{
        const announce = announces.find(a => a.id == parseInt(req.params.id));
        if(!announce){
            throw 'the announcement u want to update doesnt exist';
        }
        announce.status = req.body.status;
        announce.end_date = new Date();
        return res.status(200).json({
            status:'success',
            data: {
                id: announce.id,
                text: announce.status,
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

const viewAllAnnounces = (req, res) => {
    return res.status(200).json({
        status:'success',
        data: announces
    });
};

export { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementByState, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces}