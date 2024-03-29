/*
Form validation
- username: required, 3 to 20 characters
- email: required
- password: required, 8 to 40 char, min 1 lower, min 1 upper, min 1 special char
- confirm password: required, match password
Dispatch register, else throw error
*/

import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import "./Register.css";
import { PasswordVisible, PasswordInvisible } from './icons/PasswordIcons.js';

const Register = () => {
  // themeSlice from Redux
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  // Register authentication from Redux
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Required")
        .test(
          "len",
          "Must be between 3 and 20 characters",
          (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
        ),
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string()
        .min(8, 'Invalid password')
        .matches(/[0-9]/, 'Must contain at least 1 number')
        .matches(/[a-z]/, 'Must contain at least 1 lowercase character')
        .matches(/[A-Z]/, 'Must contain at least 1 uppercase character')
        .matches(/[^\w]/, 'Must contain at least 1 special character')
        .max(40, "Must contain less than 41 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Required"),
      }),
      onSubmit: values => {
        setValidated(true);
        handleRegister(values);
      },
    });

  // Control form validation styles
  const [successful, setSuccessful] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Register using AuthService via Redux
  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccessful(false);
    setLoading(true);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  };

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
                  <h2 className="fw-bold mb-2 text-uppercase text-center">Register</h2>
                  <div className="mb-3">
                    {!successful && ( // hide register form if successful
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
                            disabled={loading}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        {/* Username field END */}
                        
                        {/* Email field START */}
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label className="text-center">Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.email}
                            isValid={formik.touched.email && !formik.errors.email && validated}
                            disabled={loading}
                          />
                          <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        {/* Email field END */}

                        
                        {/* Password field START */}
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                          <Form.Label>
                            Password&nbsp;
                            {/* Password requirement tooltip START */}
                            <OverlayTrigger
                              placement="top"
                              show={showPasswordRequirements}
                              // trigger={['hover', 'focus', 'click']}
                              overlay={
                                <Tooltip id="password-tooltip" className={themePrimary}>
                                  <u>Password should contain:</u><br />
                                  <ul className='m-0'>
                                    <li>8 to 40 characters</li>
                                    <li>&#8805;1 uppercase</li>
                                    <li>&#8805;1 lowercase</li>
                                    <li>&#8805;1 number</li>
                                    <li>&#8805;1 special character</li>
                                  </ul>
                                </Tooltip>
                              }
                            >
                              <svg id="password-tooltip-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle align-middle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                              </svg>
                            </OverlayTrigger>
                            {/* Password requirement tooltip END */}
                          </Form.Label>
                          {/* Input group for field + button */}
                          <InputGroup hasValidation>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={(e) => {formik.handleBlur(e); setShowPasswordRequirements(false)}}
                              onFocus={() => setShowPasswordRequirements(true)}
                              isInvalid={!!formik.errors.password}
                              isValid={formik.touched.password && !formik.errors.password && validated}
                              aria-label="Password with show addon"
                              aria-describedby="show-password"
                              disabled={loading}
                            />
                            {/* Button to show password START */}
                            <Button variant={`outline-${themeSecondary}`} onClick={()=>setShowPassword(!showPassword)}>
                              {showPassword ? <PasswordInvisible /> : <PasswordVisible />}
                            </Button>
                            {/* Button to show password END */}
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        {/* Password field END */}
                        
                        {/* Confirm password field START */}
                        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                          <Form.Label className="text-center">Confirm Password</Form.Label>
                          {/* Input group for field + button */}
                          <InputGroup hasValidation>
                            <Form.Control
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={formik.values.confirmPassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={!!formik.errors.confirmPassword}
                              isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword && validated}
                              aria-label="Confirm password with show addon"
                              aria-describedby="confirm-password"
                              disabled={loading}
                            />
                            {/* Button to show password START */}
                            <Button variant={`outline-${themeSecondary}`} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? <PasswordInvisible /> : <PasswordVisible />}
                            </Button>
                            {/* Button to show password END */}
                            <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        {/* Confirm password field END */}

                        {/* Register button START */}
                        <div className="d-grid">
                          <Button type="submit" disabled={loading} variant={`outline-${themeSecondary}`}>
                            {
                              loading ?
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                variant={themeSecondary}
                              >
                                <span className="visually-hidden">Register loading</span>
                              </Spinner>
                              : <span>Register</span>
                            }
                          </Button>
                        </div>
                        {/* Register button END */}
                      </Form>
                    )}

                    {/* Response message START */}
                    {message && (
                      <>
                        <br />
                        <Form.Group controlId="formGroupFeedback">
                          <Alert variant={successful ? "success" : "danger"}>
                            {message}
                          </Alert>
                        </Form.Group>
                      </>
                    )}
                    {/* Response message END */}

                    {/* Link to login page START */}
                    <div className="mt-3">
                      
                      {successful ?
                      <p className="mb-0  text-center">
                        Log into your new account&nbsp;
                        <Link to="/login" className={`text-${themeSecondary} fw-bold`}>
                          here
                        </Link>
                      </p>
                      :
                      <p className="mb-0  text-center">
                        Already have an account?&nbsp;
                        <Link to="/login" className={`text-${themeSecondary} fw-bold`}>
                          Log In
                        </Link>
                      </p>
                      }
                    </div>
                    {/* Link to login page END */}
                  </div>
                </div>
              </Card.Body>                
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default Register;