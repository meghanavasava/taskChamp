import React from "react";

const MyComponent = () => {
  const handleClick = () => {
    console.log("Button was clicked!");
  };

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
