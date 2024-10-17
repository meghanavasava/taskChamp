import React from "react";

const Message = ({ message, isSentByCurrentUser }) => {
  return (
    <div
      style={{
        alignSelf: isSentByCurrentUser ? "flex-end" : "flex-start",
        margin: "5px",
      }}
    >
      <div
        style={{
          backgroundColor: isSentByCurrentUser ? "#dcf8c6" : "#fff",
          borderRadius: "8px",
          padding: "10px",
          maxWidth: "70%",
          wordWrap: "break-word",
          border: "1px solid #ccc",
        }}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;
