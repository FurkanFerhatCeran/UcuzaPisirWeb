const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Not: MongoDB Atlas kullanıyorsanız, IP adresinizin MongoDB Atlas'ta izin verilen IP'ler listesinde olduğundan emin olun
        // https://www.mongodb.com/docs/atlas/security-whitelist/
        
        // MongoDB Atlas bağlantı URL'i
        const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://FurkanFerhat:ffc123@cluster0.uvruj7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        
        // Alternatif olarak localhost MongoDB kullanmak için bu satırı etkinleştirin
        // const MONGO_URI = 'mongodb://localhost:27017/ucuzapisir';
        
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // İlk bağlantıda hata olursa hemen programı sonlandırmayalım
        return false;
    }
};

module.exports = connectDB; 