import { notEqual } from "assert";
import React, { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesList,
  receiveMoreMovies,
  searchMovies,
} from "../../app/reducers/movies.reducer";
import Loader from "../Loader/Loader";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieListPage.module.scss";

interface MovieListPageProps {}

const MovieListPage: FC<MovieListPageProps> = () => {
  const dispatch = useDispatch();
  const { results, totalPages } = useSelector(
    (state: any) => state?.movies.popular
  );
  const { searchResults, searchTotalPages, query } = useSelector(
    (state: any) => state?.movies.search
  );
  const [page, setPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages]: [boolean, any] = useState(false);
  const [moviesList, setMovieList] = useState([]);

  useEffect(() => {
    if (searchResults) {
      setMovieList(searchResults);

      return;
    }
    if (searchResults?.length === 0) {
      setMovieList([]);

      return;
    }

    setMovieList(results);
  }, [results, searchResults]);

  useEffect(() => {
    dispatch(fetchMoviesList(page));
    dispatch(receiveMoreMovies({ query, page }));
  }, [page]);

  useEffect(() => {
    if (searchTotalPages) {
      setHasMorePages(searchTotalPages > page);
      return;
    }
    setHasMorePages(totalPages > page);
  }, [totalPages, searchTotalPages]);

  const receiveMoreFilms = () => {
    setTimeout(() => setPage(page + 1), 2000);
  };

  return (
    <>
      <InfiniteScroll
        next={receiveMoreFilms}
        hasMore={hasMorePages}
        className={styles.MovieListPage}
        loader={null}
        dataLength={moviesList.length}
      >
        {moviesList.length ? (
          moviesList.map((film: any, index: number) => (
            <MovieItem
              key={index}
              id={film.id}
              img={film.poster_path}
              voteAverage={film.vote_average}
              overview={film.overview}
              date={film.release_date}
              title={film.title}
            />
          ))
        ) : (
          <h1>No movies found</h1>
        )}
      </InfiniteScroll>
    </>
  );
};

export default MovieListPage;
