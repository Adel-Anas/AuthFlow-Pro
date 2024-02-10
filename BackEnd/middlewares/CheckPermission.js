/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const checkPermission = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifyToken = jwt.verify(access_token, process.env.SECRET_KEY);
    req.userId = verifyToken.userId;

    // Retrieve user with populated role
    const user = await User.findById(req.userId).populate({
      path: 'role',
      populate: { path: 'permissions' }
    });

    if (!user || !user.role) {
      return res.status(500).json({ message: 'User role not found' });
    }

    // Extract permission names
    const permissionNames = user.role.permissions.map(permission => permission.name);

    // Check permissions based on request method
    switch (req.method) {
      case 'GET':
        if (permissionNames.includes('GET')) {
          next(); 
        } else {
          return res.status(403).json({ message: "Insufficient permissions for this action" });
        }
        break;
      case 'POST':
        if (permissionNames.includes('POST')) {
          next(); 
        } else {
          return res.status(403).json({ message: "Insufficient permissions for this action" });
        }
        break;
      case 'PUT':
        if (permissionNames.includes('PUT')) {
          next();
        } else {
          return res.status(403).json({ message: "Insufficient permissions for this action" });
        }
        break;
      case 'DELETE':
        if (permissionNames.includes('DELETE')) {
          next();
        } else {
          return res.status(403).json({ message: "Insufficient permissions for this action" });
        }
        break;
      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(`Error checking permission: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkPermission;
