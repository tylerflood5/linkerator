import React, { useState, useEffect } from "react";

import { 
  getLinks
 } from "../api";


console.log("testing testing testing");




const MainContent = ({ links, setLinks }) => {
  // const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error.message);
      });
  }, []);


  

  // creating an unordered list as the number of links can grow
  // then wrapping each property from the links table in a span to have it on the same row
  // added the key as link.id to get rid of that annoying error

  return (
    <div id="results">
      <ul>
        {links.map((link, index) => (
          <div key={link.id}>
            <span>{link.id} </span> 
            <a href={link.link} target="_blank" className="url" >{link.link}</a>
            <span>{link.comment}</span>
            <span>{link.date}</span>
            <span>{link.name}</span>
            <span>{link.clickCount}</span>
            <button>Delete Link</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
