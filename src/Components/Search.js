import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { realDb } from "../firebase";

const Search = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(realDb, "users");
    onValue(usersRef, (snapshot) => {
      const allUsers = [];
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const uid = childSnapshot.key; // Get the UID from the key
        allUsers.push({ uid, ...userData }); // Spread the rest of the user data
      });
      setUsers(allUsers);
      console.log(allUsers); // Check users' structure
    });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.uid} onClick={() => onSelectUser(user)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
