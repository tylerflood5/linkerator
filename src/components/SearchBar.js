import React, { useState } from "react";

import { searchLinks } from "../api";

import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  async function handleQuery(event) {
    setQuery(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);

    await searchLinks(query);
  }

  return (
    <form onSubmit={handleSubmit}>
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
