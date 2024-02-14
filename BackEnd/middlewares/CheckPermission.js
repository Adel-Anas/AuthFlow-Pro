/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifyToken = jwt.verify(token, process.env.Secret_KEY);
    // THIS LINE IS TO RETRIEVE THE USER ID FROM THE DECODED TOKEN
    req.userId = verifyToken.userId;

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
        if (!permissionNames.includes('GET')) {
          return res.json({ permission: false, message: 'You do not have permission to access this data'});
        } 
        next(); 
        break;
      case 'POST':
        if (!permissionNames.includes('POST')) {
          return res.json({ permission: false});
        }
        next(); 
        break;
      case 'PUT':
        if (permissionNames.includes('PUT')) {
          next();
        } else {
          return res.json({ permission: false});
        }
        break;
      case 'DELETE':
        if (permissionNames.includes('DELETE')) {
          next();
        } else {
          return res.json({ permission: false});
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
