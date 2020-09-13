import React from "react";

// import { getLinks } from "../api";

import "./SearchBar.css";

const SearchBar = ({ query, setQuery }) => {
  // bunch of stuff here
  // const [links, setLinks] = useState([]);
  console.log(query);

  // useEffect(() => {
  //   getLinks()
  //     .then((response) => {
  //       setLinks(response);
  //     })
  //     .catch((error) => {
  //       setLinks(error.message);
  //     });
  // }, []);

  return (
    <form>
      <input
        id="searchBar"
        placeholder="search links here.."
        value={setQuery}
      />
      <span>
        <button id="searchButton">Search</button>
      </span>
    </form>
  );
};

export default SearchBar;
