import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./FavoritesScreen.module.scss";

interface FavoritesScreenProps {}

const FavoritesScreen: FC<FavoritesScreenProps> = () => {
  const favorites = useSelector((state: any) => state?.movies.favorites);

  return (
    <div className={styles.FavoritesScreen}>
      {favorites.length ? (
        favorites.map((film: any) => {
          return <MovieItem {...film} />;
        })
      ) : (
        <h1>You have no favorites</h1>
      )}
    </div>
  );
};

export default FavoritesScreen;
