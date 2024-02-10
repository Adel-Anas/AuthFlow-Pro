/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import Role from '../models/RoleSchema.js';
import User from '../models/UserSchema.js';

env.config();

const RegisterUser = async (req, res) => {
  try{
    const {username, email, password, role} = req.body;
    const existingUser = await User.findOne({ email: email });
    if(existingUser){
      return res.status(400).json({message: "Username or email already exists"});
    }
    const userRole = await Role.findOne({name: "Super Admin"});
    if (!userRole) {
      return res.status(500).json({ message: 'Default role not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole
    });

    await newUser.save();
    res.status(201).json(newUser.username, newUser.email, newUser.role);
  } catch(err){
    console.log(`Error creating User: ${err}`);
    res.status(500).send({message : "Internal Server Error"});
  }
};

const LoginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
    res.cookie("access_token", token)
    res.status(200).send({message : "User Logged In with Access Token"});
  } catch (error) {
    console.log(`Error logging user: ${error} `);
    res.status(500).send({message : "Internal Server Error"});
  }
};

const Logout = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).send({message : "User Logged Out"});
};

const updateUserRole = async (req, res) => {
  const { id, name } = req.params;
  try {
    const updatedRole = await Role.findOne({name});
    await User.findByIdAndUpdate(id, {role: updatedRole});
    res.status(200).send({message : "Role updated successfully"});
  } catch (error) {
    console.log(`Error :  ${error}`);
  }
};

const checkLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ loggedIn: false });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ loggedIn: false });
    }

    return res.status(200).json({ loggedIn: true });
  } catch (error) {
    console.log(`Error checking user authentication: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(`Error getting users: ${error}`);
  }
}

export default { RegisterUser, LoginUser, Logout, updateUserRole, checkLoggedIn, getUsers };
