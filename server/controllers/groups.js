import joi from 'joi';
import db from '../database/db';

const createGroups = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const text = `INSERT INTO
            groups(groupname, groupowner)
            VALUES($1, $2)
            returning *`;

    const values = [req.body.groupName, req.user.id];

    const { rows } = await db.query(text, values);

    if (rows.length > 0) {
      return res.status(201).json({
        status: 201,
        data: rows
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: 'group not created'
    });
  }
};
const getAllGroups = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM groups');

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: 200,
    error: 'No group in the database'
  });
};
const updateGroup = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const { rows } = await db.query('SELECT * FROM groups WHERE id=$1', [
      req.params.id
    ]);
    console.log(rows);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'invalid id'
      });
    }

    const rows1 = await db.query(
      'UPDATE groups SET groupname=$1 WHERE id=$2 returning *',
      [req.body.groupName, req.params.id]
    );
    return res.status(200).json({
      status: 200,
      data: [rows1.rows[0]]
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'unexpected happen'
    });
    // console.log(error);
  }
};
const deleteGroup = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const { rows: found = null } = await db.query(
      'SELECT * FROM groups WHERE id=$1',
      [req.params.id]
    );
    if (!found) {
      return res.status(404).json({
        status: 404,
        error: 'invalid id'
      });
    }
    const { groupOwner } = found;
    if ({ groupOwner } === req.user.id) {
      return res.status(401).json({
        status: 401,
        error: 'anauthorized action'
      });
    }

    const rows1 = await db.query('DELETE FROM groups WHERE id=$1 returning *', [
      req.params.id
    ]);
    return res.status(200).json({
      status: 200,
      message: 'group deleted'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'You are not allowed to perform this action '
    });
  }
};
const addGroupMember = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const row = await db.query('SELECT * FROM groups WHERE id=$1', [req.params.id]);
    if (row.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id'
      });
    }
    const checkUserId = await db.query('SELECT * FROM users WHERE id=$1', [
      req.body.userId
    ]);
    if (checkUserId === 0) {
      return res.status(404).json({
        status: 404,
        message: 'the user you want to add is not our user.'
      });
    }
    const text = `INSERT INTO
            members(groupid, groupowner,userid,role)
            VALUES($1, $2,$3,$4)
            returning *`;

    const values = [req.params.id, req.user.id, req.body.userId, req.body.role];

    const { rows } = await db.query(text, values);

    if (rows.length > 0) {
      return res.status(201).json({
        status: 201,
        data: rows
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: 'member not created, the information sent are invalid'
    });
  }
};
const sendMessageToGroup = async (req, res) => {
  try {
    const receiver = await db.query('SELECT * FROM groups WHERE id = $1', [
      req.params.id
    ]);
    if (receiver) {
      console.log(receiver);
      const text = `INSERT INTO
    messages("subject","parentmessageid","message",receiverGroupId ,"sender", "status")
    VALUES($1, $2, $3,$4,$5,$6)
    returning *`;

      const values = [
        req.body.subject,
        req.body.parentMessageId,
        req.body.message,
        req.params.id,
        req.user.id,
        req.body.status
      ];
      const { rows } = await db.query(text, values);

      console.log(rows);
      if (rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message:
        'something is wrong with the information provided ,please verify and try again'
    });
  }
};
const deleteMember = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const { rows } = await db.query(
      'SELECT * FROM members WHERE groupId=$1 AND userId=$2',
      [req.params.groupId, req.params.userId]
    );
    if (!rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id'
      });
    }
    const rows1 = await db.query(
      'DELETE FROM members WHERE groupId=$1 AND userId=$2',
      [req.params.groupId, req.params.userId]
    );
    console.log(rows1);
    return res.status(200).json({
      status: 200,
      message: 'member deleted'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'member not deleted '
    });
  }
};
export {
  createGroups,
  getAllGroups,
  updateGroup,
  deleteGroup,
  addGroupMember,
  sendMessageToGroup,
  deleteMember
};
