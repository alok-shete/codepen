import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Moment from "react-moment";

import API from "./../../api/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    getAllProjects();
    return () => {
      setProjects({});
      setLoading({});
    };
  }, []);

  async function getAllProjects() {
    try {
      await API.get("project/").then((res) => {
        console.log(res.data);
        setProjects(res.data);
        setLoading(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function Logout() {
    try {
      await API.get("user/logout/").then((res) => {
        history.push(`/login`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-color vh-100">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
          <div className="container">
            <a className="navbar-brand" href="#h">
              Expand at sm
            </a>
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
                  className="btn btn-outline-danger"
                  onClick={() => Logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="rounded-lg mt-5 mb-5 ml-2 mr-2 bg-dark p-3 text-light row">
            <div className="col-sm">
              <h3>Create new Project</h3>
            </div>
            <div className="col-sm-2">
              <Link to="/create">
                <button className="btn btn-outline-success">create </button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg mt-5 mb-3 ml-2 mr-2 bg-dark p-2 text-light row">
            <div className="col-sm">
              <h5>Project's</h5>
            </div>
          </div>

          {loading ? (
            <>
              {projects.map((project) => (
                <Link key={project._id} to={`project/${project._id}`}>
                  <div className="rounded-lg mt-2 mb-2 ml-2 mr-2 bg-dark p-2 text-light row">
                    <div className="col-sm">
                      <span>{project.title}</span>
                    </div>
                    <div className="col-sm text-right">
                      <span>
                        Updated At :{" "}
                        <Moment format="YYYY-MM-DD HH:mm:SS">
                          {project.updatedAt}
                        </Moment>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
