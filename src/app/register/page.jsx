'use client'

// Importação de arquivos
import styles from '@/app/register/register.module.css';
import { hasEmailRegistered, isValidEmail } from '@/utils/validations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
    // Varáveis globais
    const router = useRouter();
    const URL_API = 'http://localhost:3001/';

    async function addNewUser(event) {
        
        event.preventDefault(); // Remove o evento de carregamento do evento acionado (Submit)

            // Captura todos os dados do formulário a partir do evento
            const formData = new FormData(event.target);

            // Transforma FormData em objeto
            const data = Object.fromEntries(formData.entries());

            if(!isValidEmail(data.email)) {
                alert('Insira um email válido!');
                return false;
            } else if(await hasEmailRegistered(data.email)) {
                alert('O email inserido já existe no sistema!');
                return false;
            } else {
                const response = await fetch(`${URL_API}user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: (data.email.trim()).toLowerCase(),
                    }),
                });
                if (!response.ok) {
                    alert('Erro interno: ' + response.statusText);
                    return;
                } else {
                    alert('Usuário registrado com sucesso!');
                    router.push('/login');
                    return;
                }
            }
    }

    return (
        <div className={styles.register__block}>
            <h1>Welcome to Social QA</h1>
            <form className={styles.form} onSubmit={addNewUser}>
                <div className={styles.form__block__input}>
                    <input name="name" type="text" id="registerName" required />
                    <label htmlFor="name">Nome</label>  
                </div>

                <div className={styles.form__block__input}>
                    <input type="email" name="email" id="registerEmail" required />
                    <label htmlFor="email">Email</label>
                </div>

                <div className={styles.form__block__input}>
                    <input type="password" name="password" id="registerPassword" required />
                    <label htmlFor="password">Senha</label>
                </div>

                <Link href="/login">Já possui cadastro?</Link>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
