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

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error.message)
      })
  }, []);

  return (
    <div className="App">
      <h1>Linkerator!!</h1>
      <form></form>
      <h2>{message}</h2>
      <h3>
        {
          links.map(link => (
            <>
          <span>{link.link}</span>
           <span>{link.clickCount}</span>
            <span>{link.comment}</span>
             <span>{link.date}</span>
             </>
          ))
        }
      </h3>
    </div>
  );
};

export default App;
