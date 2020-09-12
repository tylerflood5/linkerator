import React, { useState, useEffect } from "react";

import { getSomething, getLinks } from "../api";

import { SearchBar, MainContent, AddLink } from "../components";

// testing 1, 2, 3

const App = () => {
  const [message, setMessage] = useState("");

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
      <div>
        <MainContent  />
      </div>
    </div>
  );
};

export default App;
