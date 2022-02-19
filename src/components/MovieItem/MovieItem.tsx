import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleToFavorites } from "../../app/reducers/movies.reducer";
import styles from "./MovieItem.module.scss";

interface MovieItemProps {
  title: string;
  img: string;
  id: string;
  voteAverage: number;
  overview: string;
  date: string;
}

const imageUrlBase = process.env.REACT_APP_BASE_IMAGE_URL;
const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;

const MovieItem: FC<MovieItemProps> = (props: any) => {
  const { title, img, id, voteAverage, overview, date } = props;

  const dispatch = useDispatch();

  const handleMarkToFavorite = () => {
    dispatch(toggleToFavorites(props));
  };
  return (
    <div className={styles.wrapper}>
      <Link to={`movies/${id}`}>
        <div className={styles.MovieItem}>
          <img
            className={styles.img}
            width={300}
            height={450}
            src={`${imageUrlBase}${img}`}
            // src={`https://cringemdb.com/img/movie-poster-placeholder.png`}
            // src={`${defaultImage}movie-poster-placeholder.png`}
            alt={title}
          ></img>

          <div className={styles.info}>
            <p>{overview}</p>
          </div>
          <div className={styles.footerInfo}>
            <div>
              <div className={styles.text}>
                <h3 className={styles.title}>{title}</h3>
              </div>
              <div className={styles.rating}>&#9733;{voteAverage}</div>
            </div>
            <p className={styles.year}>{new Date(date).getFullYear()}</p>
          </div>
        </div>
      </Link>
      <div className={styles.favorites} onClick={handleMarkToFavorite}>
        &#9733;
      </div>
    </div>
  );
};
export default MovieItem;
