import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";

import Container from 'react-bootstrap/Container';

import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Get user from local storage via Redux
  const { user: currentUser } = useSelector((state) => state.auth);
  
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Container id="main-home-panel" className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <Container className="w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className={`text-${themeSecondary}`}>Welcome!</h1>
        <p className={`text-${themeSecondary} fst-italic`}>Select an item to explore</p>
      </Container>
      <Container id="home-panel-group">
        <Link to="/players" className={`home-panel ${themePrimary}`}>
          <div className={`home-panel-image-frame ${themePrimary}`}>
            <div id="home-panel-image-1" className="home-panel-image"></div>
            <h3>Players</h3>
          </div>
          <h3 className={`mobile-label text-${themeSecondary}`}>Players</h3>
        </Link>
        <Link to="/teams" className={`home-panel ${themePrimary}`}>
          <div className={`home-panel-image-frame ${themePrimary}`}>
            <div id="home-panel-image-2" className="home-panel-image"></div>
            <h3>Teams</h3>
          </div>
          <h3 className={`mobile-label text-${themeSecondary}`}>Teams</h3>
        </Link>
          {currentUser ? (
            <>
              <Link to="/account" className={`home-panel ${themePrimary}`}>
                <div className={`home-panel-image-frame ${themePrimary}`}>
                  <div id="home-panel-image-3" className="home-panel-image"></div>
                  <h3>Account</h3>
                </div>
                <h3 className={`mobile-label text-${themeSecondary}`}>Account</h3>
              </Link>
            </>
            ) : (
              <>
                <Link to="/account" className={`home-panel ${themePrimary}`}>
                  <div to="/login" className={`home-panel-image-frame ${themePrimary}`}>
                    <div id="home-panel-image-3" className="home-panel-image"></div>
                    <h3>Login</h3>
                  </div>
                  <h3 className={`mobile-label text-${themeSecondary}`}>Login</h3>
                </Link>
              </>
            )
          }
      </Container>
    </Container>
  );
};

export default Home;