export const config = {
    port: process.env.PORT || 3100,
    supportedParkingSlotsNum: 17,  // Przykładowo, jeśli mamy 17 miejsc parkingowych
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://kokos:okon123@cluster0.qpa0r.mongodb.net/myParkingDB?authMechanism=SCRAM-SHA-1&authSource=Cluster0',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};
