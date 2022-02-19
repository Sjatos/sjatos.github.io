import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMoviesDetails } from "../../app/reducers/movies.reducer";
import styles from "./MovieDetailsPage.module.scss";

interface MovieDetailsPageProps {}

const MovieDetailsPage: FC<MovieDetailsPageProps> = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  // const currentMovie = useSelector((state: any) => state.movies.currentMovie);

  useEffect(() => {
    console.log(id);
    dispatch(fetchMoviesDetails(id));
  }, []);

  return (
    <div className={styles.MovieDetailsPage}>
      <h1>Hello</h1>
    </div>
  );
};

export default MovieDetailsPage;
