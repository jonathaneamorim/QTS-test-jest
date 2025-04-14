import Router from "next/router";

export default function Posts() {

    const router = new Router();
    const URL = 'http://localhost:3000/';

    let data;

    async function getPosts() {
        const response = await fetch(`${URL}post`);
        if(!response.ok) throw new Error();
        return await response.json();
    }

    document.addEventListener('DOMContentLoaded', ()=> {
        let data = localStorage.getItem('data');
        if(!data) {
            router.push('/login');
        } else {
            data = getPosts();
        }
    })

    return (
        <div>
            <header>
                <h2>Social QA - Postagens</h2>

                <div>
                    <button>Inserir nova postagem +</button>
                </div>
            </header>


            <div>
                {
                    data.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <span>Likes: {post.likes}</span>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}