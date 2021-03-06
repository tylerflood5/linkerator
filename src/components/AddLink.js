import React, { useState } from "react";

import "./AddLink.css";

import { getLinks, addLink } from "../api";

const AddLink = ({ links, setLinks }) => {
  // console.log("rendering addLink here");

  const [newLink, setNewLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");

  const handleLink = (event) => {
    // console.log("links: ", event.target.value);
    setNewLink(event.target.value);
  };

  const handleComment = (event) => {
    // console.log("comments: ", event.target.value);
    setComment(event.target.value);
  };

  const handleTags = (event) => {
    // console.log("tags: ", event.target.value);
    setTags(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(" addLink button clicked");

    const clickCount = 0;

    const date = new Date().getDate(); //To get the Current Date
    const month = new Date().getMonth() + 1; //To get the Current Month
    const year = new Date().getFullYear(); //To get the Current Year
    const dateStamp = year + "-" + month + "-" + date;
    // console.log(newLink, clickCount, comment, dateStamp, tags);

    const createNewLink = await addLink({
      link: newLink,
      clickCount,
      comment,
      date: dateStamp,
      tags: tags,
    });

    await getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error.message);
      });

    await setNewLink("");
    await setComment("");
    await setTags("");
  }

  return (
    <form className="active" onSubmit={handleSubmit}>
      <span id="addLinkForms">
        <input
          className="addInput"
          type="text"
          id="captureLink"
          value={newLink}
          onChange={handleLink}
          placeholder="add link"
        />
        <input
          className="addInput"
          type="text"
          id="captureComment"
          value={comment}
          onChange={handleComment}
          placeholder="add comment"
        />
        <input
          className="addInput"
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
