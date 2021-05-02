import React, { useState, useEffect } from "react";
import API from "./../api/api";
import Loading from "./../components/Loading";

import { Route, Redirect } from "react-router-dom";

export const NonAuthRoute = (props) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { component: Component, ...rest } = props;

  useEffect(() => {
    loginCheck();
    return () => {
      setLoading({});
      setIsAuthenticated({});
    };
  }, []);

  async function loginCheck() {
    try {
      await API.get("user/check").then((res) => {
        setIsAuthenticated(true);
        setLoading(false);
      });
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
