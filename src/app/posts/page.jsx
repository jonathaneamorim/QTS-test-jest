"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/components/modalNewPost/modal';

export default function Posts() {
    const router = useRouter();
    const URL = 'http://localhost:3001/';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);

    async function getPosts() {
        try {
            const response = await fetch(`${URL}post`);
            if(!response.ok) throw new Error('Failed to fetch posts.');
            return await response.json();
        } catch (err) {

        }
    }

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            const localData = localStorage.getItem('userData');
            if(!localData) {
                router.push('/login');
            } else {
                try {
                    const postsData = await getPosts();
                    setData(postsData);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        checkAuthAndFetchData();
    }, [router]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <div>
            <header>
                <h2>Social QA - Postagens</h2>
                <p>{ userData?.name }</p>

                <div> 
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Abrir Modal
                </button>
                </div>
            </header>


            <div>
            {data ? (
                    data.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <span>Likes: {post.likes}</span>
                        </div>
                    ))
                ) : (
                    <p>Nenhum post encontrado</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Título da Modal</h2>
                <p className="mb-4">Este é o conteúdo da modal. Você pode colocar qualquer coisa aqui.</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Fechar
                </button>
            </Modal>

        </div>
    );
}