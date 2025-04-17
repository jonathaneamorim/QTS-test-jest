'use client'

// Importação de arquivos
import styles from '@/app/register/register.module.css';
import { registerUser } from '@/services/authService';
import { formatEmail, formatName, hasEmailRegistered, isStrongPassword, isValidEmail } from '@/utils/validations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
    // Varáveis globais
    const router = useRouter();
    const [error, setError] = useState(null);

    async function addNewUser(event) {
        event.preventDefault(); // Remove o evento de carregamento do evento acionado (Submit)
        setError(null);

        try {
            // Captura todos os dados do formulário a partir do evento
            const formData = new FormData(event.target);

            // Transforma FormData em objeto
            const data = Object.fromEntries(formData.entries());

            const formatData = {
                name: formatName(data.name),
                email: formatEmail(data.email),
                password: data.password
            }
            if(formatData.name === '') throw new Error('Erro: Digite um nome!');
            if(!isValidEmail(formatData.email)) throw new Error('Erro: digite um email válido');
            if(!isStrongPassword(formatData.password)) throw new Error('Erro: A senha deve conter pelo menos 8 caracteres, com letra, número e caractere especial');
            if(await hasEmailRegistered(formatData.email)) throw new Error('Erro: O email inserido já está cadastrado no sistema!');

            const responseRegister = await registerUser(formatData);
            
            if(!responseRegister) {
                alert('Erro de conexão com o servidor!');
                return;
            };

            alert('Cadastro realizado com sucesso!');
            router.push('/login');
        } catch (err) {
            setError(err.message || 'Falha no cadastro. Tente novamente.');
        }
    }

    return (
        <div className={styles.register__block}>
            <h1>Welcome to Social QA</h1>

            {error && <div className={styles.error}>{error}</div>}

            <form className={styles.form} onSubmit={addNewUser} onFocus={() => setError(null)}>
                <div className={styles.form__block__input}>
                    <input name="name" type="text" id="registerName" />
                    <label htmlFor="name">Nome</label>  
                </div>

                <div className={styles.form__block__input}>
                    <input type="email" name="email" id="registerEmail" />
                    <label htmlFor="email">Email</label>
                </div>

                <div className={styles.form__block__input}>
                    <input type="password" name="password" id="registerPassword" />
                    <label htmlFor="password">Senha</label>
                </div>

                <Link href="/login">Já possui cadastro?</Link>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
