import React from "react";

const SearchBar = () => {
  // bunch of stuff here

  return (
    <form>
      <input id="searchBar" placeholder="search links here.." />
      <span id="searchButton">
        <button>Search</button>
      </span>
    </form>
  );
};

export default SearchBar;
