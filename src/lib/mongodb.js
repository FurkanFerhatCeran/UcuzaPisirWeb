import mongoose from 'mongoose';

// MongoDB bağlantı URL'i
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://FurkanFerhat:ffc123@cluster0.uvruj7m.mongodb.net/ucuzapisir?retryWrites=true&w=majority';

// Geliştirme modunda olup olmadığını kontrol et
const isDevelopment = process.env.NODE_ENV === 'development';

// Global değişkende bağlantıyı önbelleğe al
let cached = global.mongoose;

if (!cached) {
  // Global kapsamda önbellek yoksa oluştur
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

/**
 * MongoDB'ye bağlan ve bağlantıyı önbelleğe al
 * @returns {Promise<Mongoose>} Mongoose bağlantısı
 */
async function connectToMongoDB() {
  try {
    // Bağlantı zaten varsa, onu döndür
    if (cached.conn) {
      return cached.conn;
    }

    // Bağlantı promise'ı varsa (bağlantı devam ediyor), onu döndür
    if (!cached.promise) {
      const options = {
        bufferCommands: false,
      };

      // MongoDB 4.0+ için useNewUrlParser ve useUnifiedTopology gerekli değil
      cached.promise = mongoose.connect(MONGODB_URI, options);
    }

    // Promise'ı bekle ve bağlantıyı önbelleğe al
    cached.conn = await cached.promise;
    console.log(`MongoDB bağlantısı başarılı: ${mongoose.connection.host}`);
    return cached.conn;
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    // Hata durumunda promise'ı sıfırla, böylece tekrar deneyebiliriz
    cached.promise = null;
    throw error;
  }
}

/**
 * MongoDB bağlantısını kes - test için kullanışlı
 */
async function disconnectFromMongoDB() {
  if (cached.conn) {
    if (isDevelopment) {
      console.log('MongoDB bağlantısı kesiliyor...');
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
    }
  }
}

export default connectToMongoDB;
export { disconnectFromMongoDB }; 