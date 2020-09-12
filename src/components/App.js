import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import { SearchBar, MainContent, AddLink } from "../components";

// import "bootstrap/dist/css/bootstrap.min.css";
// need to run the below command if we want to use
// npm install react-bootstrap bootstrap

const App = () => {
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Linkerator!!</h1>
      <h2>{message}</h2>
      <div>
        <SearchBar />
      </div>
      <MainContent links={links} setLinks={setLinks} />
      <AddLink links={links} setLinks={setLinks} />
    </div>
  );
};

export default App;
