/* eslint-disable no-unused-vars */
import Permissions from "../models/Permissions.js";
import Role from "../models/RoleSchema.js";

const RoleController = {
  getRole: async (req, res) => {
    try {
      const Roles = await Role.find();
      res.status(200).send(Roles);
    } catch (err) {
      console.log(`Error getting role ${err}`);
    }
  },

  PostRole: async (req, res) => {
    try {
      const { name } = req.body;

      const existingRole = await Role.findOne({ name });
      if (existingRole) {
        return res
          .status(400)
          .json({ error: "Role with this name already exists" });
      }
      const rolePermissions = await Permissions.find({
        name: { $in: ["DELETE"] },
      });

      const newRole = new Role({
        name,
        permissions: rolePermissions.map((item) => item._id),
      });

      await newRole.save();

      res.status(201).json(newRole);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },
  updateRole : async (req, res) => {
    try{
      const { id } = req.params;
      const updatedRole = await Role.findByIdAndUpdate(id, {role : req.body}
      );
      res.status(200).send(updatedRole);
    }catch(err){
      res.status(500).send(err.message)
    }
  }
};

export default RoleController;
