import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import Container from 'react-bootstrap/Container';

const Home = () => {
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
    <Container>
      <h3>{content}</h3>
    </Container>
  );
};

export default Home;