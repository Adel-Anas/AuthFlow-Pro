/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import UserController from '../controllers/UserControllers.js';
import Role from '../models/RoleSchema';
import User from '../models/UserSchema';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/RoleSchema');
jest.mock('../models/UserSchema');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('RegisterUser', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          role: 'Visitor',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockedUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: 'hashedPassword',
        role: { name: req.body.role },
      });

      User.findOne.mockResolvedValue(null);
      Role.findOne.mockResolvedValue({ name: 'Visitor' });
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.prototype.save.mockResolvedValue(mockedUser);

      await UserController.RegisterUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return 400 if user already exists', async () => {
      const req = {
        body: {
          email: 'test@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue({ email: req.body.email });

      await UserController.RegisterUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username or email already exists' });
    });

    it('should return 500 if default role not found', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          role: 'Visitor',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue(null);
      Role.findOne.mockResolvedValue(null);

      await UserController.RegisterUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Default role not found' });
    });

    it('should return 500 if error occurs', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          role: 'Visitor',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      User.findOne.mockRejectedValue('Error');

      await UserController.RegisterUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  // Add similar tests for other controller functions
});
