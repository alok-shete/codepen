import React from "react";
import { Formik } from "formik";
import { useHistory, Link } from "react-router-dom";
import API from "./../../api/api";
import Logout from "./../../components/Logout";

export default function Create() {
  let history = useHistory();

  return (
    <>
      <div>
        <Formik
          initialValues={{ title: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            } else if (values.length <= 4) {
              errors.title = "Title must be 4 char";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await API.post(`code/add`, values).then((res) => {
                // console.log(res.data);
                history.push(`/project/${res.data._id}`);
              });
            } catch (error) {
              alert("!invalid Title");
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
            <div className="bg-color vh-100">
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
                <div className="container">
                  <Link className="navbar-brand" to="/">
                    Private Codepen
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample03"
                    aria-controls="navbarsExample03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarsExample03"
                  >
                    <ul className="navbar-nav mr-auto"></ul>
                    <div className="my-2 my-md-0">
                      <Logout />
                    </div>
                  </div>
                </div>
              </nav>
              <div className="container">
                <div className="text-center mt-5 mb-3 text-secondary">
                  <h4>Create Private Codepen</h4>
                </div>
                <div className="col-sm-4 mx-auto">
                  <form
                    className="border bg-light shadow p-3 mb-4 bg-white rounded"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group mt-2">
                      <label>Title</label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      <small className="form-text text-danger">
                        {" "}
                        {errors.title && touched.title && errors.title}
                      </small>
                    </div>
                    <div className="text-center mb-2">
                      <button
                        className="btn btn-success btn-sm btn-block"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
