/*
Navbar
Theme switch
*/

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import BoardUser from "./components/BoardUser";

import { logout } from "./slices/auth";
import { setDarkTheme, setLightTheme } from "./slices/theme";

import EventBus from "./common/EventBus";

import "./App.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import sun from './assets/images/sun.png';

const App = () => {
  // Theme via Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  
  // Get user from local storage via Redux
  const { user: currentUser } = useSelector((state) => state.auth);

  // Update Redux store
  const dispatch = useDispatch();

  const setDark = useCallback(() => {
    dispatch(setDarkTheme());
  }, [dispatch]);
  const setLight = useCallback(() => {
    dispatch(setLightTheme());
  }, [dispatch]);

  // Log out using authService via Redux
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Control display of boards
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    // Show dashboards based on user level
    if (currentUser && currentUser.hasOwnProperty("roles")) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    // If user not found after DOM render, invoke logout (see dahsboard components)
    EventBus.on("logout", () => {
      logOut();
    });

    // Clean up event listener
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  // Show/hide navbar on scroll up/down
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-64px";
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <>
      <Navbar
        id="navbar"
        variant={themePrimary} 
        bg={themePrimary} 
        expand="lg" 
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link as={Link} to={"/"}>
              Bayern Fanpage
            </Nav.Link>
          </Navbar.Brand>
          {/* Swtich theme button START */}
          <Button
              className="bg-transparent border-0"
              onClick={() => {
                (() => {
                  isDarkMode ? setLight() : setDark();
                  document.getElementById("root").style = (isDarkMode ? "background: #f8f9fa" : 'background: #212529;');
                  document.body.style = (isDarkMode ? "background: #f8f9fa" : 'background: #212529;');
                })(isDarkMode);
              }}
            >
              <img id="themeSwitch" className={`${themePrimary}-switch`} src={sun} alt="Sun logo" />
          </Button>
          {/* Swtich theme button END */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="me-auto">
              <NavItem>
                <Nav.Link as={Link} to={"/home"}>
                  Home
                </Nav.Link>
              </NavItem>

              {/* Dashboards START */}
              {showModeratorBoard && (
                <NavItem>
                  <Nav.Link as={Link} to={"/mod"}>
                    Moderator Board
                  </Nav.Link>
                </NavItem>
              )}

              {showAdminBoard && (
                <NavItem>
                  <Nav.Link as={Link} to={"/admin"}>
                    Admin Board
                  </Nav.Link>
                </NavItem>
              )}

              {currentUser && (
                <NavItem>
                  <Nav.Link as={Link} to={"/user"}>
                    User
                  </Nav.Link>
                </NavItem>
              )}
              {/* Dashboards END */}
            </Nav>

            {/* Login & Register or Logout START */}
            {currentUser ? (
              <Nav className="ml-auto">
                <NavItem>
                  <Nav.Link as={Link} to={"/profile"}>
                    {currentUser.username}
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <a href="/login" onClick={logOut}>
                    Logout
                  </a>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <NavItem>
                  <Nav.Link as={Link} to={"/login"}>
                    Login
                  </Nav.Link>
                </NavItem>

                <NavItem>
                  <Nav.Link as={Link} to={"/register"}>
                    Register
                  </Nav.Link>
                </NavItem>
              </Nav>
            )}
            {/* Login & Register or Logout END */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;