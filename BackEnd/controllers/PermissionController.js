import Permissions from "../models/Permissions.js";

const PermissionController = {
  createPermission: async (req, res) => {
    try {
      const permission = await Permissions.create(req.body);
      res.status(201).send(permission);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getPermissions: async (req, res) => {
    try {
      const permissions = await Permissions.find();
      res.status(200).send(permissions);
    } catch (error) {
      res.status(500).send(error);
    }
  },
}

export default PermissionController;