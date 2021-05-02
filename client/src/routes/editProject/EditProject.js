import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateCss, updateJs, updateHtml } from "../../store/actions";

import Editor from "../../components/Editor";

import PageNotFound from "../../components/PageNotFound";
import Logout from "./../../components/Logout";

export default function EditProject() {
  let { id } = useParams();
  const disptch = useDispatch();

  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  let htmlData = useSelector((state) => state.html);
  let cssData = useSelector((state) => state.css);
  let jsData = useSelector((state) => state.js);

  useEffect(() => {
    getCode();
  }, []);

  async function getCode() {
    try {
      await API.get(`code/${id}`).then((res) => {
        console.log(res.data);
        console.log(res.data[0].title);
        setTitle(res.data[0].title);
        disptch(updateHtml(res.data[0].html));
        disptch(updateCss(res.data[0].css));
        disptch(updateJs(res.data[0].js));
      });
    } catch (error) {
      setError(true);
      console.log(error.response);
    }
  }

  function setHTML(value) {
    disptch(updateHtml(value));
  }

  function setCSS(value) {
    disptch(updateCss(value));
  }

  function setJS(value) {
    disptch(updateJs(value));
  }

  async function updateProject() {
    console.log("updating");
    try {
      await API.post(`code/update`, {
        _id: id,
        title: title,
        html: htmlData,
        css: cssData,
        js: jsData,
      }).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      {error ? (
        <PageNotFound />
      ) : (
        <>
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

              <div className="collapse navbar-collapse" id="navbarsExample03">
                <ul className="navbar-nav mr-auto"></ul>
                <div className="my-2 my-md-0">
                  <button
                    type="button"
                    className="btn btn-success mr-3"
                    onClick={() => updateProject()}
                  >
                    Save
                  </button>
                  <Logout />
                </div>
              </div>
            </div>
          </nav>
          <div className="top-panel">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Editor
                    language="xml"
                    displayname="HTML"
                    value={htmlData}
                    onChange={setHTML}
                  />
                </div>
                <div className="col-sm">
                  <Editor
                    language="css"
                    displayname="CSS"
                    value={cssData}
                    onChange={setCSS}
                  />
                </div>
                <div className="col-sm">
                  <Editor
                    language="javascript"
                    displayname="JAVASCRIPT"
                    value={jsData}
                    onChange={setJS}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pane">
            <iframe
              srcDoc={`
          <html>
              <body>${htmlData}</body>
              <style>${cssData}</style>
              <script>${jsData}</script>
          </html>
          `}
              title="output"
              //* to only run scripts and nothing other
              //* than that.
              sandbox="allow-scripts"
              //* no borders.
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </>
  );
}
