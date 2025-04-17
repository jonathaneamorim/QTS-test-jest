"use client"

// Realiza as importações
import { useState, useEffect } from 'react';
import styles from '@/app/login/login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/manipulationsEvents';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // Verifica se já está logado ao carregar o componente
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            router.push('/posts');
        }
    }, [router]);

    // Função chamada ao submitar o formulario
    async function handleSubmit(event) {
        event.preventDefault(); // Remove o evento padrão do submit
        setError(null);
        setLoading(true);
        
        try {
            const formData = new FormData(event.target);
            const credentials = Object.fromEntries(formData.entries());

            const user = await login(credentials);

            localStorage.setItem('userData', JSON.stringify({
                name: user.name,
                email: user.email
            }));
            
            alert(`Bem-vindo de volta, ${user.name}!`);
            
            router.push('/posts');
            
        } catch (err) {
            setError(err.message || 'Falha no login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className={styles.login__block}>
        <h1>Welcome to Social QA</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit} onFocus={() => setError(null)}>
            <div className={styles.form__block__input}>
                <input 
                    type="email" 
                    name="email" 
                    id="emailLogin"  
                />
                <label htmlFor="email">Email</label>
            </div>

            <div className={styles.form__block__input}>
                <input 
                    type="password" 
                    name="password" 
                    id="submitLogin" 
                />
                <label htmlFor="password">Senha</label>
            </div>

            <Link href={'/register'}>Ainda não possui cadastro?</Link>

            <button type='submit' disabled={loading}>
                {loading ? 'Carregando...' : 'Enviar'}
            </button>
        </form>
    </div>
    );
}