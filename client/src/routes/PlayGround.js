import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";

function PlayGround() {
  //* setting default data for the variables used to
  //* store the user data locally.
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [js, setJS] = useState("");
  const [srcDoc, setsrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    </html>
  `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <>
      <div className="pane top-panel">
        <Editor
          language="xml"
          displayname="HTML"
          value={html}
          onChange={setHTML}
        />
        <Editor
          language="css"
          displayname="CSS"
          value={css}
          onChange={setCSS}
        />
        <Editor
          language="javascript"
          displayname="JAVASCRIPT"
          value={js}
          onChange={setJS}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
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
  );
}

export default PlayGround;
