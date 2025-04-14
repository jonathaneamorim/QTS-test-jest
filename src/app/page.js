import Link from "next/link";
import style from '@/app/page.module.css';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Social QA</h1>
      <ul className={style.listlinks}>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/register">Register</Link></li>
      </ul>
    </div>
  );
}
