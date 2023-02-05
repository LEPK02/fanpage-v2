/*
Form validation
- username: required
- password: required
Dispatch login and direct user to profile page, else throw error
*/

import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import "./Login.css";

const Login = () => {
  // Theme from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  // Login authentication from Redux
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  // Update Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // Formik form validation
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: values => {
      handleLogin(values);
      setValidated(true);
    },
  });
  
  // Auto-redirect using React Router
  let navigate = useNavigate();
  
  // Control form validation styles
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Log in using authService via Redux
  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password })) // login() using authService via Redux
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container fluid className="main-container d-flex justify-content-center align-items-center">
        <Row className="d-flex justify-content-center align-items-center w-100">
          <Col xs={12} md={8} lg={6}>
            <Card
              bg={themePrimary}
              key={themePrimary}
              text={themeSecondary}
              border={themePrimary}
              className={`shadow-${themePrimary}`}
            >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
                  <div className="mb-3">
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      
                      {/* Username field START */}
                      <Form.Group className="mb-3" controlId="formGroupUsername">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!formik.errors.username}
                          isValid={formik.touched.username && !formik.errors.username && validated}
                          disabled={isLoggedIn || loading}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                      </Form.Group>
                      {/* Username field END */}

                      {/* Password field START */}
                      <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className="text-center">Password</Form.Label>
                        {/* InputGroup for field + button */}
                        <InputGroup hasValidation>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.password}
                            isValid={formik.touched.password && !formik.errors.password && validated}
                            aria-label="Password with show addon"
                            aria-describedby="show-password"
                            disabled={isLoggedIn || loading}
                          />
                          {/* Button to show password START */}
                          <Button variant={`outline-${themeSecondary}`} onClick={()=>setShowPassword(!showPassword)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                          </Button>
                          {/* Button to show password END */}
                          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      {/* Password field END */}

                      {/* Forgot password link START */}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a href="#!" className={`text-${isDarkMode ? 'white': themeSecondary}`}>
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      {/* Forgot password link END */}

                      {/* Login button START */}
                      <div className="d-grid">
                        <Button type="submit" disabled={loading} variant={`outline-${themeSecondary}`}>
                          {
                            // Show spinner if loading
                            loading ?
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              variant={themeSecondary}
                            >
                              <span className="visually-hidden">Login loading</span>
                            </Spinner>
                            : <span>Login</span>
                          }
                        </Button>
                      </div>
                      {/* Login button END */}

                      {/* Response message START */}
                      {message && (
                        <>
                          <br />
                          <Form.Group controlId="formGroupFeedback">
                            <Alert variant="danger">
                              {message}
                            </Alert>
                          </Form.Group>
                        </>
                      )}
                      {/* Response message END */}

                    </Form>

                    {/* Link to register page START */}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?&nbsp;
                        <Link to="/register" className={`text-${themeSecondary} fw-bold`}>
                          Register
                        </Link>
                      </p>
                    </div>
                    {/* Link to register page END */}

                  </div>
                </div>
              </Card.Body>                
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default Login;