import React, { useState } from "react";
import { realDb } from "../firebase";
import { ref, push, serverTimestamp, get } from "firebase/database";

const AddPost = () => {
  const [newPost, setNewPost] = useState("");
  const userId = localStorage.getItem("userId");

  const fetchUsername = async (userId) => {
    const userRef = ref(realDb, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().username; 
    } else {
      console.log("No user found with this userId.");
      return null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    // Fetch the username of the user
    const username = await fetchUsername(userId);

    if (username) {
      const postsRef = ref(realDb, "posts");
      await push(postsRef, {
        content: newPost,
        userId: userId,
        username: username, // Add the username
        createdAt: serverTimestamp(),
        likes: {},
        comments: {},
      });

      setNewPost("");
    } else {
      console.log("Failed to post: username not found.");
    }
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's happening?"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default AddPost;
