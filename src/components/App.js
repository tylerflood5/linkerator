import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

// testing 1, 2, 3

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Linkerator!!</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
