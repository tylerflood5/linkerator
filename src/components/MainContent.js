import React, { useEffect } from "react";
import "./MainContent.css";

import { getLinks, deleteLink } from "../api";

const MainContent = ({ links, setLinks, query, queryLinks, setQueryLinks }) => {
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

  // useEffect(() => {
  //   searchLinks(query)
  //     .then((response) => {
  //       setQueryLinks(response);
  //     })
  //     .catch((error) => {
  //       setQueryLinks(error.message);
  //     });
  // }, []);

  async function deleteEvent(event) {
    event.preventDefault();
    console.log("delete button clicked");

    await deleteLink(event.target.value);

    await getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error.message);
      });
  }

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
              <button value={link.id} onClick={deleteEvent}>
                Delete Link
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

// return (
//   <div id="linkResults">
//     {queryLinks === [] ? (
//       <ul id="list">
//         {links.map((link, index) => (
//           <div key={link.id} id="linkDiv">
//             <div>
//               <a href={link.link} target="_blank" className="url">
//                 {link.link}
//               </a>
//             </div>
//             <div>{link.comment}</div>
//             <div>{link.name}</div>
//             <div>{link.date}</div>
//             <div id="specs">
//               <span>ID: {link.id}</span>
//               <span>Count: {link.clickCount}</span>
//               <button value={link.id} onClick={deleteEvent}>
//                 Delete Link
//               </button>
//             </div>
//           </div>
//         ))}
//       </ul>
//     )
//     : (
//       <ul id="list">
//         {queryLinks.map((link, index) => (
//           <div key={link.id} id="linkDiv">
//             <div>
//               <a href={link.link} target="_blank" className="url">
//                 {link.link}
//               </a>
//             </div>
//             <div>{link.comment}</div>
//             <div>{link.name}</div>
//             <div>{link.date}</div>
//             <div id="specs">
//               <span>ID: {link.id}</span>
//               <span>Count: {link.clickCount}</span>
//               <button value={link.id} onClick={deleteEvent}>
//                 Delete Link
//               </button>
//             </div>
//           </div>
//         ))}
//       </ul>
//     )}
//   </div>
// );
// };

export default MainContent;
