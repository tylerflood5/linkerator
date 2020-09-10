import React, { useState, useEffect } from "react";

import { getLinks } from "../api";

const MainContent = () => {
    const [links, setLinks] = useState([]);

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
       <div>
           {links.map(link => (
               <span key = {link.id}>Url: {link.link}</span>
           ))}
       </div>
    )
}

export default MainContent;