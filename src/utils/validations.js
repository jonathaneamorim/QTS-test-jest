import { getUsers } from "@/services/authService.js";

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isStrongPassword(password) {
    // Pelo menos 8 caracteres, com letra, número e caractere especial
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password);
}

export const hasEmailRegistered = async(email) => {
    const users = await getUsers();
    if(users.find(n => n.email === email)) {
        return true;
    } else {
        return false;
    }
}

export const formatEmail = (email) => {
    return (email.toLowerCase()).trim();
}