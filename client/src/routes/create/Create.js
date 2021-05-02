import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import API from "./../../api/api";

export default function Create() {
  let history = useHistory();
  return (
    <>
      <div>
        <h1>Anywhere in your app!</h1>
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
                console.log(res.data);
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && errors.title}

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
