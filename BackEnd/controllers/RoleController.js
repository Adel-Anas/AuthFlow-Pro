/* eslint-disable no-unused-vars */
import Role from '../models/RoleSchema.js';
import Permissions from '../models/Permissions.js';

const RoleController = {

  
getRole : async (req, res) => {
  try{
    const Roles = await Role.find()
    res.status(200).send(Roles)
  }catch(err){
    console.log(`Error getting role ${err}`);
  }
},

PostRole : async (req, res) => {
  try {
    const { name } = req.body;

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: 'Role with this name already exists' });
    }
    const rolePermissions = await Permissions.find({name: {$in: ["POST", "UPDATE"]}})

    const newRole = new Role({ 
      name,
      permissions : rolePermissions.map((item)=>item._id)
    })

    await newRole.save();

    res.status(201).json(newRole);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }} 

}

export default RoleController;