const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { registerUser, loginUser } = require('./services/userService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
let dbConnected = false;
connectDB().then(connected => {
    dbConnected = connected;
});

// API Durum endpoint'i
app.get('/api/status', (req, res) => {
    res.json({
        status: 'API is running',
        dbConnected: dbConnected
    });
});

// Routes
app.post('/api/users/register', async (req, res) => {
    try {
        if (!dbConnected) {
            return res.status(500).json({ message: 'Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.' });
        }

        const userData = req.body;
        const user = await registerUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        if (!dbConnected) {
            return res.status(500).json({ message: 'Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.' });
        }

        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 