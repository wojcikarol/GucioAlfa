import PasswordModel from '../schemas/password.schema';
import bcrypt from 'bcrypt';

class PasswordService {
    // Hash a password
    public async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        return hashedPassword;
    }

    // Create or update a user's password
    public async createOrUpdate(data: { userId: string; password: string }) {
        try {
            const result = await PasswordModel.findOneAndUpdate(
                { userId: data.userId }, // Find password by userId
                { $set: { password: data.password } }, // Update password
                { new: true, upsert: true } // Create if it doesn't exist
            );

            return result;
        } catch (error) {
            console.error('Error while creating or updating password:', error);
            throw new Error('Error while creating or updating password');
        }
    }

    // Authorize user password
    public async authorize(userId: string, inputPassword: string): Promise<boolean> {
        try {
            const userPasswordRecord = await PasswordModel.findOne({ userId });
            if (!userPasswordRecord) {
                throw new Error('Password record not found');
            }
    
            // Compare raw input password with hashed password
            const isMatch = await bcrypt.compare(inputPassword, userPasswordRecord.password);
            return isMatch;
        } catch (error) {
            console.error('Error while authorizing password:', error);
            throw new Error('Error while authorizing password');
        }
    }
    
}

export default PasswordService;
