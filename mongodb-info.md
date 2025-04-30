# MongoDB Bağlantı Ayarları

## Mevcut Durum
Uygulama şu anda MongoDB Atlas'a bağlanmaya çalışıyor. Eğer "Failed to fetch" veya "Could not connect to any servers in your MongoDB Atlas cluster" hatası alıyorsanız, IP adresinizin MongoDB Atlas'ta izin verilen listede olmadığı anlamına gelir.

## Çözüm Yöntemleri

### 1. IP Adresinizi MongoDB Atlas'a Eklemek
1. [MongoDB Atlas](https://cloud.mongodb.com)'a giriş yapın
2. Cluster'ınıza tıklayın
3. "Network Access" sekmesine gidin
4. "Add IP Address" butonuna tıklayın
5. "Add Current IP Address" seçeneğini kullanın veya "Allow Access from Anywhere" (0.0.0.0/0) seçeneğini kullanın (sadece geliştirme için)

### 2. Yerel MongoDB Kullanmak
Eğer MongoDB'yi yerel makinenizde kullanmak isterseniz:

1. [MongoDB Community Edition](https://www.mongodb.com/try/download/community)'ı indirip kurun
2. `mongod` servisini başlatın
3. `src/config/db.js` dosyasındaki bağlantı URL'ini değiştirin:
   ```javascript
   // Bu satırı:
   const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://FurkanFerhat:ffc123@cluster0.uvruj7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
   
   // Bu satırla değiştirin ve üstteki satırı yoruma alın:
   const MONGO_URI = 'mongodb://localhost:27017/ucuzapisir';
   ```

## Uygulama Başlatma Adımları
1. Terminal'de şu komutu çalıştırın: `npm run dev`
2. Bu komut hem backend API'yi (5000 portunda) hem de frontend'i (3000 portunda) başlatır
3. Tarayıcıda http://localhost:3000 adresine giderek uygulamayı kullanabilirsiniz
4. Backend API durumunu http://localhost:5000/api/status adresinden kontrol edebilirsiniz

## Bağlantı Kontrol Listesi
- Backend API çalışıyor mu? http://localhost:5000/api/status
- Veritabanı bağlantısı kuruldu mu? API durum endpoint'inde `dbConnected: true` gösteriliyor mu?
- Tarayıcıda CORS hataları var mı? Tarayıcınızın geliştirici konsolunda (F12) kontrol edin 