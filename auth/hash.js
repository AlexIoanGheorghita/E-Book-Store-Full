const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.log(err);
    }
    return null;
}

const comparePasswords = async (password, hash) => {
    try {
        const matchedPass = await bcrypt.compare(password, hash);
        return matchedPass;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports = {
    hashPassword,
    comparePasswords
};