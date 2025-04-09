"use client";

// components/FilmDetail.js
import { useState, useEffect } from "react";
import api from "@/services/api";
import styles from "./filmDetail.module.css";

export default function FilmDetail({ filmId, onClose }) {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/films/${filmId}`);
        setFilm(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setError("Não foi possível carregar os detalhes deste filme.");
        setLoading(false);
      }
    };

    if (filmId) {
      fetchFilmDetails();
    }
  }, [filmId]);

  if (!filmId) return null;
  if (loading)
    return <div className={styles.loading}>Carregando detalhes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src={film.image || "/placeholder.jpg"}
              alt={film.title}
              className={styles.image}
            />
          </div>

          <div className={styles.details}>
            <h2 className={styles.title}>{film.title}</h2>
            <h3 className={styles.originalTitle}>{film.original_title}</h3>

            <div className={styles.meta}>
              <p className={styles.info}>
                <strong>Diretor:</strong> {film.director}
              </p>
              <p className={styles.info}>
                <strong>Produtor:</strong> {film.producer}
              </p>
              <p className={styles.info}>
                <strong>Ano:</strong> {film.release_date}
              </p>
              <p className={styles.info}>
                <strong>Duração:</strong> {film.running_time} minutos
              </p>
              <p className={styles.info}>
                <strong>Pontuação:</strong>{" "}
                <span className={styles.score}>{film.rt_score}%</span>
              </p>
            </div>

            <div className={styles.description}>
              <h4>Sinopse</h4>
              <p>{film.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
