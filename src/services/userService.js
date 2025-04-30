const User = require('../models/User');

// Kullanıcı kaydı
const registerUser = async (userData) => {
    try {
        const userExists = await User.findOne({ email: userData.email });
        if (userExists) {
            throw new Error('Bu email adresi zaten kayıtlı');
        }

        const user = await User.create({
            username: userData.username,
            email: userData.email,
            password: userData.password
        });

        return {
            _id: user._id,
            username: user.username,
            email: user.email
        };
    } catch (error) {
        throw error;
    }
};

// Kullanıcı girişi
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Geçersiz şifre');
        }

        return {
            _id: user._id,
            username: user.username,
            email: user.email
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser
}; 