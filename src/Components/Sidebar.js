import React from "react";
import Search from "./Search";

const Sidebar = ({ currentUser, recentChats, allUsers, onSelectChat }) => {
  const sortedRecentChats = [...recentChats].sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", overflowY: "auto" }}>
      <Search onSelectUser={onSelectChat} />
      
      <h4>Recent Chats</h4>
      {sortedRecentChats.length === 0 ? (
        <p>No recent chats</p>
      ) : (
        <ul>
          {sortedRecentChats.map((chat) => (
            <li key={chat.uid} onClick={() => onSelectChat(chat)}>
              {chat.username}
            </li>
          ))}
        </ul>
      )}

      <h4>All Users</h4>
      {allUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {allUsers.map((user) => (
            <li key={user.uid} onClick={() => onSelectChat(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
