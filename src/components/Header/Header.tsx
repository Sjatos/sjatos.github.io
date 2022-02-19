import React, { FC, useRef, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaBeer } from "react-icons/fa";
import { BsFillBadgeHdFill } from "react-icons/bs";
import { searchMovies } from "../../app/reducers/movies.reducer";
import { useDispatch } from "react-redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const inputRef: any = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(searchMovies(inputRef?.current?.value));
  };

  return (
    <div className={styles.Header}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TOP MOVIES</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Container className={styles.container}>
                <Link to={"/"}>Home</Link>
                <Link to={"/FavoritesScreen"}>Favorites</Link>
              </Container>
            </Nav>
            <Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  ref={inputRef}
                />
                <Button variant="outline-dark" onClick={handleClick}>
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
function page(query: any, page: any) {
  throw new Error("Function not implemented.");
}
function dispatch(
  arg0: AsyncThunkAction<
    { totalPages: any; results: any; query: string },
    string,
    {}
  >
) {
  throw new Error("Function not implemented.");
}
