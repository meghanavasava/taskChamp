import React from "react";
import { ref, set } from "firebase/database";
import { realDb } from "../firebase";

const MyComponent = () => {
  const handleClick = () => {
    const data = {
      message: "Button was clicked!",
      timestamp: new Date().toISOString(),
    };

    const newEntryId = Date.now(); // Or use another method to generate a unique ID

    const dataRef = ref(realDb, "clicks/" + newEntryId);

    set(dataRef, data)
      .then(() => {
        console.log("Data added successfully!");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
