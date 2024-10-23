import React, { useState, useEffect } from "react";
import { realDb } from "../firebase";
import { ref, onValue, query, orderByChild, get } from "firebase/database";
import AddPost from "./AddPost";
import PostList from "./PostList";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("userId");

  // Function to fetch the username by userId
  const fetchUsername = async (userId) => {
    try {
      const userRef = ref(realDb, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        return userData.username; // Assuming the username is stored in the "username" field
      }
      return null;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch the username when the component mounts
      fetchUsername(userId).then((fetchedUsername) => {
        if (fetchedUsername) {
          setUsername(fetchedUsername);
        }
      });
    }

    // Fetch posts from the database
    const postsRef = ref(realDb, "posts");
    const postsQuery = query(postsRef, orderByChild("createdAt"));

    const unsubscribe = onValue(postsQuery, (snapshot) => {
      const postsData = snapshot.val();
      const postsArray = postsData
        ? Object.entries(postsData)
            .map(([id, post]) => ({
              id,
              ...post,
            }))
            .reverse()
        : [];
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="feed">
      {userId && username ? (
        <>
          <PostList
            posts={posts}
            user={{ uid: userId, displayName: username }}
          />
          <AddPost />
        </>
      ) : (
        <p>Loading your feed...</p>
      )}
    </div>
  );
};

export default Feed;
