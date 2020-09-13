import React, { useState } from "react";

import { searchLinks } from "../api";

import "./SearchBar.css";

const SearchBar = ({ query, setQuery, queryLinks, setQueryLinks }) => {
  async function handleQuery(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    alert("feature reverted due to bugs, we are very close");
    // console.log(event.target.value);

    setQueryLinks(await searchLinks(query));
    // console.log(queryLinks);
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
