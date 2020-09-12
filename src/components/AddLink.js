import React, { useState, useEffect } from "react";

import { getLinks, addLink } from "../api";

// header, modal, aside?
// need a form to capture link, comment, tags ()
// check to see if createLink is set up to run properly
// if only fed these three paramters

// date will be aut generated
// clickCount will be defaulted to zero

const AddLink = ({links, setLinks}) => {
  // console.log("rendering addLink here");

  const [newLink, setNewLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);


  const handleLink = (event) => {
    console.log("links: ", event.target.value);
    setNewLink(event.target.value);
  };

  const handleComment = (event) => {
    console.log("comments: ", event.target.value);
    setComment(event.target.value);
  };

  const handleTags = (event) => {
    if(event.target.value === "") {
      setTags(["#"])
    } else {
      console.log("tags: ", event.target.value);
      setTags(event.target.value);
    }
    
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("button clicked");
    const clickCount = 0;
    const date = "2015-03-03";

    const createNewLink = await addLink({
      link: newLink,
      clickCount,
      comment,
      date,
      tags: tags,
    });

    
      await getLinks()
        .then((response) => {
          setLinks(response);
        })
        .catch((error) => {
          setLinks(error.message);
        });
   
  }

  return (
    <form className="active" onSubmit={handleSubmit}>
      <span>
        <input
          type="text"
          id="captureLink"
          value={newLink}
          onChange={handleLink}
          placeholder="add link"
        />
        <input
          type="text"
          id="captureComment"
          value={comment}
          onChange={handleComment}
          placeholder="add comment"
        />
        <input
          type="text"
          id="captureTags"
          value={tags}
          onChange={handleTags}
          placeholder="tags: seperate with a space"
        />

        <button type="submit" id="createLinkButton" onClick={handleSubmit}>
          Add New Link
        </button>
      </span>
    </form>
  );
};

export default AddLink;
