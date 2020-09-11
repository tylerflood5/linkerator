import React from "react";
// { useState, useCallback }
// import { addLink } from "../api";

// header, modal, aside?
// need a form to capture link, comment, tags ()
// check to see if createLink is set up to run properly
// if only fed these three paramters

// date will be aut generated
// clickCount will be defaulted to zero

const AddLink = () => {
  // bunch of stuff needed here
  //   const [newLink, setNewLink] = useState([]);

  //   useEffect(() => {
  //     addLink()
  //       .then((response) => {
  //         setNewLink(response);
  //       })
  //       .catch((error) => {
  //         setNewLink(error.message);
  //       });
  //   }, []);

  //   console.log(newLink);

  // const addNewLink = useCallback(
  //   (newlink)

  // )

  return (
    <form className="active">
      <span>
        <input id="captureLink" placeholder="add link" />
        <input id="captureComment" placeholder="add comment" />
        <input id="captureTags" placeholder="add tags" />

        <button id="createLinkButton">Add New Link</button>
      </span>
    </form>
  );
};

export default AddLink;
