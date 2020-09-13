import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import { SearchBar, MainContent, AddLink } from "../components";

import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// need to run the below command if we want to use
// npm install react-bootstrap bootstrap

const App = () => {
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>LINKERATOR!</h1>
      <h2>{message}</h2>
      <div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <AddLink links={links} setLinks={setLinks} />
      <MainContent links={links} setLinks={setLinks} />
    </div>
  );
};

export default App;
