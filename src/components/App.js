import React, { useState, useEffect } from "react";

import { 
  getSomething,
  getLinks
   } from "../api";

import {
  SearchBar,
  MainContent,
  AddLink
} from "../components";  

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
      <form></form>
      <h2>{message}</h2>
      <h3>
        <MainContent />
      </h3>
    </div>
  );
};

export default App;
