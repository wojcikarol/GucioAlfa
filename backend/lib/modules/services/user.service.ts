import UserModel from '../schemas/user.schema';
import { IUser } from "../models/user.model";

class UserService {
    public async createNewOrUpdate(user: IUser) {
        console.log(user);
        try {
            if (!user._id) {
                const dataModel = new UserModel(user);
                return await dataModel.save();
            } else {
                return await UserModel.findByIdAndUpdate(user._id, { $set: user }, { new: true });
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async getByEmailOrName(name: string) {
        try {
            const result = await UserModel.findOne({ $or: [{ email: name }, { name: name }] });
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych:', error);
            throw new Error('Wystąpił błąd podczas pobierania danych');
        }
    }

    // Method to get the most recent users
    public async getAllNewest() {
        try {
            return await UserModel.find().sort({ createdAt: -1 }).limit(10); // Adjust based on your schema
        } catch (error) {
            console.error('Error while fetching latest users:', error);
            throw new Error('Error while fetching latest users');
        }
    }

    // Method to delete a user by userId
    public async deleteData({ userId }: { userId: string }) {
        try {
            const result = await UserModel.findOneAndDelete({ userId });
            if (result) {
                return result;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error while deleting user:', error);
            throw new Error('Error while deleting user');
        }
    }
}

export default UserService;
