import PasswordModel  from '../schemas/password.schema';
import bcrypt from 'bcrypt';

class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
        if (!result) {
            const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
            return await dataModel.save();
        }
        return result;
    }

    public async authorize(userId: string, password: string): Promise<boolean> {
        try {
            // Znajdź użytkownika po userId
            const user = await PasswordModel.findOne({ userId: userId });
            if (!user) return false; // Jeśli użytkownika nie ma, autoryzacja nieudana
    
            // Porównaj hasło podane przez użytkownika z zahashowanym hasłem w bazie
            const isPasswordValid = await bcrypt.compare(password, user.password);
            return isPasswordValid; // Zwróć true, jeśli hasło jest poprawne
        } catch (error) {
            console.error('Wystąpił błąd podczas autoryzacji:', error);
            throw new Error('Błąd podczas autoryzacji');
        }
    }
    

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword)
        return hashedPassword;
    }

}

export default PasswordService;
