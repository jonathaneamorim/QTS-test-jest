"use client"

// Realiza as importações
import styles from '@/app/login/login.module.css';
import { isValidEmail } from '@/utils/validations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter(); // Injeção de dependencia 
    const URL = 'http://localhost:3001/'; // Rota da API

    async function userLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if(!isValidEmail(data.email)) {
            alert('Insira um email válido!');
            return;
        } else {
            try {
                const response = await fetch(`${URL}user`);
                if(!response.ok) throw new Error();
                const allUsers = await response.json();
                let userFinded = allUsers.find(n => n.email === data.email);
                if(!userFinded) {
                    alert('Este email ainda não está cadastrado!');
                    return;
                } else {
                    if(userFinded.password === data.password) {
            
                        let data_storage = {
                            id: userFinded.id,
                            name: userFinded.name,
                            email: userFinded.email
                        }
            
                        localStorage.setItem('user-data', JSON.stringify(data_storage));
                        
                        alert('Usuário logado com sucesso!');

                        router.push('/posts');

                        return;
                    } else {
                        alert("Senha incorreta!");
                        return;
                    }
                }
            } catch (exception) {
                console.log("Error: ", exception);
            }
        }
    }

    return (
        <div className={styles.login__block}>
            <h1>Welcome to Social QA</h1>
            
            <form className={styles.form} onSubmit={userLogin}>
                <div className={styles.form__block__input}>
                    <input type="email" name="email" id="emailLogin" required />
                    <label htmlFor="email">Email</label>
                </div>

                <div className={styles.form__block__input}>
                    <input type="password" name="password" id="submitLogin" required />
                    <label htmlFor="password">Senha</label>
                </div>

                <Link href={'/register'}>Ainda não possui cadastro?</Link>

                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}