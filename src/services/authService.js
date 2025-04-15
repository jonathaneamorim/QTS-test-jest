import { hashPassword } from "@/utils/criptopass";

const API_URL = 'http://localhost:3001/';

export async function getUsers() {
    try {
        const response = await fetch(`${API_URL}user`);
        if(!response.ok) throw new Error('Erro ao capturar usuários!');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function registerUser(credentials) {
    try {
        const response = await fetch(`${API_URL}user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password : await hashPassword(credentials.password)
            })
        });

        if(!response.ok) throw new Error();

        return 'Usuario registrado com sucesso!';

    } catch (error) {
        throw error;
    }
}