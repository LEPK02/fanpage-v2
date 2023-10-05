export default function Navigation() {
  return(
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
              <Offcanvas.Header closeButton closeVariant={isDarkMode ? "white" : undefined}>
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
  );
}