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

const viewAllAnnouncebyOwner = async (req, res) => {
        const ownerQuery = await announce.selectByColWhere(
            '*',
            'owner=$1',
            [req.params.owner]);

        return res.status(200).json({
            status:200,
            data:ownerQuery.rows
        });
};

const viewAnnouncementByState = async (req, res) => {
 const state = await announce.selectByColWhereAnd(
     '*',
     'owner=$1', 'status=$2',
     [req.params.owner, req.query.status]);
  return res.status(200).json({
      status:200,
      data:state.rows
  });
};
 

const  viewAnnouncementById = async (req, res) => {
        const viewSpecific = await announce.selectByColWhere(
            '*',
            'id=$1',
            [req.params.id]);

        return res.status(200).json({
            status:200,
            data:viewSpecific.rows[0]
        });
};

const deleteAnnouncement = async (req, res) => {
    try{
        const delAnnounce = await announce.delete(
            'id=$1',
            [req.params.id]);
        if(delAnnounce.rowCount == 0){
            throw 'the provided announcement id doesnt exist';
        }
        return res.status(200).json({
            status:200,
            data:{
                message:"delete successfully"
            }
        });
        
    }catch(error){
        return res.status(400).json({
            status:400,
            error:error
        });
    }
}

const updateAnnounceStatus = async (req, res) => {
    const {status} = req.body;
    const statusArr = ['pending', 'accepted', 'declined', 'active', 'deactivated'];
    try{
        const checkStatus = statusArr.find(s => s == status);
        if(!checkStatus){
            return res.status(400).json({
                status:400,
                error:'status with that name not valid'
            });
        }
        const updateStatus = await announce.update(
            'status=$1',
            'id=$2',
            [status, req.params.id]);
        if(updateStatus.rowCount == 0){
            throw 'the announcement u want to update its status, doesnt match';
        }
        return res.status(200).json({
            status:200,
            data: {
                id: updateStatus.rows[0].id,
                text: updateStatus.rows[0].status
            }
        });
    } catch(error) {
        return res.status(400).json({
            status:400,
            error:error
        });
    };
    
};

const viewAllAnnounces = async (req, res) => {
    const allAnnounces = await announce.selectAll();
    return res.status(200).json({
        status:200,
        data: allAnnounces.rows
    });
};

export { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementByState, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces}