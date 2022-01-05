import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import useContexts from "../hooks/useContexts.js";
import Zoom from 'react-reveal/Zoom';

const Profile = () => {
  const { displayName, email, logout } = useContexts();
  return (
    <Container style={{ maxWidth: "50rem", marginBottom: "15px", backgroundColor: "darkblue" }}>
      <Card className="border-2 shadow ">

        <Card.Header as={"h4"} className="text-center border-0 mt-1">
          Personal history
        </Card.Header>

        <Card.Body className="card-body">
          <Zoom left>
            <div className="d-flex flex-column align-items-center text-center">

              <div className="mt-3">
                <h4>{displayName}</h4>
                <p className="text-secondary mb-5">{email}</p>
              </div>
              <Button onClick={logout} className="px-4 logout-btn btn-main">
                Logout
              </Button>
            </div>
          </Zoom >
        </Card.Body>


      </Card>
    </Container >
  );
};

export default Profile;
