import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { auth, realDb } from "../firebase";
import { ref, onValue, get } from "firebase/database";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChatPartner, setSelectedChatPartner] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const TEST_USER_ID = "user_1727456075662";


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // For testing purposes, always set the current user to the test user
        setCurrentUser({
          uid: TEST_USER_ID,
          username: "Test User"
        });

        // Fetch all users
        const usersRef = ref(realDb, 'users');
        get(usersRef).then((snapshot) => {
          if (snapshot.exists()) {
            const usersData = snapshot.val();
            const usersList = Object.keys(usersData).map(uid => ({
              uid,
              username: usersData[uid].username || `User ${uid.slice(0, 5)}`
            }));
            setAllUsers(usersList.filter(u => u.uid !== TEST_USER_ID));
          }
        });

        // Fetch recent chats
        const recentChatsRef = ref(realDb, `users/${TEST_USER_ID}/recentChats`);
        onValue(recentChatsRef, (snapshot) => {
          const recentChatsData = snapshot.val() || {};
          const formattedRecentChats = Object.values(recentChatsData);
          setRecentChats(formattedRecentChats);
        });
      } else {
        setCurrentUser(null);
        setRecentChats([]);
        setAllUsers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        currentUser={currentUser}
        recentChats={recentChats}
        allUsers={allUsers}
        onSelectChat={setSelectedChatPartner}
      />
      
      {currentUser && selectedChatPartner && (
        <ChatWindow currentUser={currentUser} chatPartner={selectedChatPartner} />
      )}
    </div>
  );
};

export default Chat;