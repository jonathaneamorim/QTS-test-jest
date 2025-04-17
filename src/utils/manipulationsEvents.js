import { formatEmail, hasEmailRegistered, isValidEmail } from '@/utils/validations';
import { getUsers } from '@/services/authService';
import { checkPassword } from '@/utils/criptopass';

export async function login(formData) {
    const credentials = formData;

    if (!formData.email || !formData.password) throw new Error('Email e Senha obrigatórios!');

    const formatCredentials = {
        email: formatEmail(credentials.email),
        password: credentials.password
    }
    
    if (!isValidEmail(formatCredentials.email)) throw new Error('Insira um email válido!');

    const listUsers = await getUsers();
    const user = listUsers.find(u => u.email === formatCredentials.email);

    if (!user) throw new Error('Email não cadastrado!');
    if (! await checkPassword(formatCredentials.password , user.password)) throw new Error('Senha incorreta!');
    
    return user;
}