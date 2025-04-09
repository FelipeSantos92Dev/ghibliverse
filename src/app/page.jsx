// pages/index.js
import Head from "next/head";
import FilmList from "../components/FilmList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GhibliVerse - O Universo do Studio Ghibli</title>
        <meta
          name="description"
          content="Explore o mundo mágico dos filmes do Studio Ghibli"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo ao <span className={styles.highlight}>GhibliVerse</span>
        </h1>
        <p className={styles.description}>
          Explore o mundo mágico dos filmes do Studio Ghibli
        </p>

        <FilmList />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante a aula de Programação Front-End</p>
      </footer>
    </div>
  );
}
