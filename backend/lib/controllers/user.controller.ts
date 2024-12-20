import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import { checkUserIdParam } from '../middlewares/checkUserIdParam';
import mongoose from 'mongoose';
class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`,  this.removeHashSession);
        this.router.get(`${this.path}/all`,this.getAllUsers); 
        this.router.delete(`${this.path}/:userId`, checkUserIdParam, this.deleteUser);
        this.router.patch(`${this.path}/status/:userName`, this.toggleUserStatus);

        
      }
      private getAllUsers = async (req: Request, res: Response) => {
        try {
          const users = await this.userService.getAllNewest();
          res.status(200).json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Failed to fetch users' });
        }
      };
      private deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
    
        try {
            const result = await this.userService.deleteData({ userId });
            res.status(200).json({ message: 'User deleted', result });
        } catch (error) {
            console.error('Error deleting user:', error);
            if (error.message === "User not found") {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(500).json({ error: 'Failed to delete user' });
        }
    };
    
    private toggleUserStatus = async (req: Request, res: Response) => {
        const { userName } = req.params;
        const { active } = req.body;
    
        try {
            // Find the user by name
            const user = await this.userService.createNewOrUpdate({ name: userName, active });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error toggling user status:', error);
            res.status(500).json({ error: 'Failed to update user status' });
        }
    };
    
    

 


    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;
    
        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({ error: 'Unauthorized' });
            }
    
            // Use raw password for comparison
            const isPasswordValid = await this.passwordService.authorize(user.id, password);
    
            if (!isPasswordValid) {
                return response.status(401).json({ error: 'Unauthorized' });
            }
    
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({ error: 'Unauthorized' });
        }
    };
    

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }

    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params;

        try {
            const result = await this.tokenService.remove(userId);
            console.log('aaa', result)
            response.status(200).json(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };
}

export default UserController;
