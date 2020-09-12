import React, { useState, useEffect } from "react";

import { getLinks } from "../api";


const SearchBar = () => {
  // bunch of stuff here
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error.message);
      });
  }, []);

  return (
    <form>
      <input id="searchBar" placeholder="search links here.." />
      <select></select>
      <span id="searchButton">
        <button>Search</button>
      </span>
    </form>
  );
};

export default SearchBar;
