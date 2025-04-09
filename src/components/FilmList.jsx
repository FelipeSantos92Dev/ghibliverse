"use client";
// components/FilmList.js - versão atualizada
import { useState, useEffect } from "react";
import api from "../services/api";
import FilmDetail from "./FilmDetail";
import styles from "./filmList.module.css";

export default function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilmId, setSelectedFilmId] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await api.get("/films");

        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setError(
          "Não foi possível carregar os filmes. Tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading)
    return <div className={styles.loading}>Carregando filmes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filmes do Studio Ghibli</h2>
      <div className={styles.grid}>
        {films.map((film) => (
          <div
            key={film.id}
            className={styles.card}
            onClick={() => setSelectedFilmId(film.id)}
          >
            <div className={styles.imageContainer}>
              <img
                src={film.image || "/placeholder.jpg"}
                alt={film.title}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.filmTitle}>{film.title}</h3>
              <p className={styles.director}>
                Diretor: <span>{film.director}</span>
              </p>
              <p className={styles.year}>
                Ano: <span>{film.release_date}</span>
              </p>
              <p className={styles.score}>
                Pontuação: <span>{film.rt_score}%</span>
              </p>
              <p className={styles.description}>
                {film.description.substring(0, 150)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedFilmId && (
        <FilmDetail
          filmId={selectedFilmId}
          onClose={() => setSelectedFilmId(null)}
        />
      )}
    </div>
  );
}
