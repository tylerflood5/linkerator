import React from "react";

// import { getLinks } from "../api";

import "./SearchBar.css";

const SearchBar = () => {
 


  return (
    <form>
      <input
        id="searchBar"
        placeholder="search links here.."
        
      />
      <span>
        <button id="searchButton">Search</button>
      </span>
    </form>
  );
};

export default SearchBar;
