import React, { useState } from "react";
import { Formik } from "formik";
import { Redirect, Link } from "react-router-dom";
import API from "./../../api/api";

export default function Registration() {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <>
      <div>
        {isRegistration ? <Redirect to="/login" /> : null}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = "Required";
            } else if (values.name.length < 4) {
              errors.name = "name Must be 4 char";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 4) {
              errors.password = "Password Must be 4 char";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await API.post(`user/registration`, values).then((res) => {
                console.log(res.data);
                setIsRegistration(true);
              });
            } catch (error) {
              console.log(error);
              alert("!invalid username password");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="container">
              <div className="text-center mt-5 mb-3 text-secondary">
                <h4>Sign up to Private Codepen</h4>
              </div>
              <div className="col-sm-4 mx-auto">
                <form
                  className="border bg-light shadow p-3 mb-4 bg-white rounded"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group mt-2">
                    <label>Name</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <small className="form-text text-danger">
                      {" "}
                      {errors.name && touched.name && errors.name}
                    </small>
                    <label>Email</label>
                    <input
                      className="form-control form-control-sm"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <small className="form-text text-danger">
                      {" "}
                      {errors.email && touched.email && errors.email}
                    </small>
                    <label>Password</label>
                    <input
                      className="form-control form-control-sm"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <small className="form-text text-danger">
                      {" "}
                      {errors.password && touched.password && errors.password}
                    </small>
                  </div>

                  <div className="text-center mb-2">
                    <button
                      className="btn btn-success btn-sm btn-block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="border bg-light shadow p-3 mb-5 bg-white rounded text-center">
                  Already have account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
