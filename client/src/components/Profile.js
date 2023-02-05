import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";

const Profile = () => {
  // Get user from local storage via Redux
  const { user: currentUser } = useSelector((state) => state.auth);

  // Return to login page once logged out
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Container>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </Container>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </Container>
  );
};

export default Profile;