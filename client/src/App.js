/*
Navbar
Theme switch
*/

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import routes from "./routes";
import { SiteMap } from "./components/SiteMap";

import ThemeControl from "./components/ThemeControl";

import { logout } from "./slices/auth";
import { changeBackground, DARK_COLOUR, LIGHT_COLOUR } from "./slices/theme";

import EventBus from "./common/EventBus";

import "./App.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Offcanvas from 'react-bootstrap/Offcanvas';

const App = () => {
  // Theme via Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  isDarkMode ? changeBackground(DARK_COLOUR) : changeBackground(LIGHT_COLOUR);
  
  // Get user from local storage via Redux
  const { user: currentUser } = useSelector((state) => state.auth);

  // Update Redux store
  const dispatch = useDispatch();

  // Log out using AuthService via Redux
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Control display of boards
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  // Control offcanvas menu show/hide
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleOffcanvasMenu = () => {setMenuOpen(!menuOpen)};
  const handleOffcanvasMenuClose = () => setMenuOpen(false);

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

  // Set document height
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `calc(${window.innerHeight}px - 1px)`)
  }
  window.addEventListener('resize', documentHeight);
  documentHeight();

  return (
    <>
      <Navbar
        id="navbar"
        variant={themePrimary}
        bg={themePrimary}
        expand="lg"
        fixed="top"
      >
        <Container fluid id="navbar-container">
          <Navbar.Brand>
            <Nav.Link as={Link} to={"/"}>
              <img
                alt=""
                src="/assets/images/bayern-logo.svg"
                width="32"
                height="32"
                className="d-inline-block align-top"
              />
              <span>&nbsp;Bayern Fanpage</span>
            </Nav.Link>
          </Navbar.Brand>
          <Container id="content-right">
            <div id="main-themecontrol">
              <ThemeControl />
            </div>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-lg"
              onClick={toggleOffcanvasMenu}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
              className={`text-bg-${themePrimary}`}
              restoreFocus={false}
              show={menuOpen}
              onHide={handleOffcanvasMenuClose}
            >
              <div id="offcanvas-shadow">
                <Offcanvas.Header closeButton closeVariant={isDarkMode ? ["white"] : ["black"]}>
                  <NavItem>
                    <ThemeControl />
                  </NavItem>
                </Offcanvas.Header>
              </div>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  {currentUser ? (
                    <>
                      <NavDropdown
                        title={currentUser.username}
                        align="end"
                        menuVariant={themePrimary}
                        renderMenuOnMount={true}
                      >
                        <NavItem>
                          <Nav.Link as={Link} to={"/profile"}>
                            Profile
                          </Nav.Link>
                        </NavItem>

                        <NavItem>
                          <Nav.Link as={Link} to={"/user"}>
                            Dashboard
                          </Nav.Link>
                        </NavItem>

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

                        <NavItem>
                          <Nav.Link as={Link} to={"/login"} onClick={logOut}>
                            Logout
                          </Nav.Link>
                          {/* <a href="/login" onClick={logOut}>
                            Logout
                          </a> */}
                        </NavItem>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <NavItem>
                        <Nav.Link as={Link} to={"/login"} onClick={handleOffcanvasMenuClose}>
                          Login
                        </Nav.Link>
                      </NavItem>

                      <NavItem>
                        <Nav.Link as={Link} to={"/register"} onClick={handleOffcanvasMenuClose}>
                          Register
                        </Nav.Link>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Container>
      </Navbar>
      <SiteMap></SiteMap>
      
      <Routes>
        {
          routes.map(({path, Component}) => (
            <Route exact path={path} element={Component} />
          ))
        }
      </Routes>
    </>
  );
};

export default App;