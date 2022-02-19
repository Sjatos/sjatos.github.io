import React from "react";
import logo from "./logo.svg";

import "./App.css";
import MovieListPage from "./components/MovieListPage/MovieListPage";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoritesScreen from "./components/FavoritesScreen/FavoritesScreen";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
      <Loader />
    </BrowserRouter>
  );
}

export default App;
