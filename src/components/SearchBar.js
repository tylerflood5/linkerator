import React, { useState } from "react";

// import { getLinks } from "../api";

import "./SearchBar.css";

const SearchBar = ({links, setLinks}) => {
  const [query, setQuery] = useState("");

  async function handleQuery(event) {
    setQuery(event.target.value)
  }


 


  return (
    <form>
      <input
        id="searchBar"
        placeholder="search links here.."
        value={query}
        onChange={handleQuery}
        
      />
      <span>
        <button id="searchButton">Search</button>
      </span>
    </form>
  );
};

export default SearchBar;
