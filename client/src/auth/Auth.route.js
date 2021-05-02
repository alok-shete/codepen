import React, { useState, useEffect } from "react";
import API from "./../api/api";
import Loading from "./../components/Loading";

import { Route, Redirect } from "react-router-dom";

export const AuthRoute = (props) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState();

  const { component: Component, ...rest } = props;

  useEffect(() => {
    loginCheck();
    return () => {
      setLoading({});
      setIsAuthenticated({});
      setData({});
    };
  }, []);

  async function loginCheck() {
    try {
      await API.get("user/check").then((res) => {
        console.log(res);
        setIsAuthenticated(true);
        setLoading(false);
        setData(res.data);
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
          <Component {...props} data={data} />
        ) : loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
