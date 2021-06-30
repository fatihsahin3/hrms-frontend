import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import ApplicationSummary from "./ApplicationSummary";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { useSelector } from "react-redux";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const history = useHistory();
  const { applicationItems } = useSelector((state) => state.application);

  function handleSignOut(params) {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" name="home" />
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            {applicationItems.length > 0 && <ApplicationSummary />}

            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
