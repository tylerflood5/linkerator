import React, { useState, useEffect } from "react";
import "./MainContent.css";

import { getLinks } from "../api";

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
    <div id="linkResults">
      <ul id="list">
        {links.map((link, index) => (
          <div key={link.id} id="linkDiv">
            <div>
              <a href={link.link} target="_blank" className="url">
                {link.link}
              </a>
            </div>
            <div>{link.comment}</div>
            <div>{link.name}</div>
            <div>{link.date}</div>
            <div id="specs">
              <span>ID: {link.id}</span>
              <span>Count: {link.clickCount}</span>
              <button>Delete Link</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
