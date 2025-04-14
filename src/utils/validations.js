// import { getUsers } from "./api.js";

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isStrongPassword(password) {
    // Pelo menos 8 caracteres, com letra, número e caractere especial
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password);
}

const hasEmailRegistered = async(email) => {
    const users = await getUsers();
    if(users.find(n => n.email === email)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {isValidEmail, isStrongPassword};