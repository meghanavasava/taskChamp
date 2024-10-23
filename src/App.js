import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Feed from "./Components/Feed";
import { getCurrentUser } from "./FirebaseOperations";
import Chat from "./Components/Chat";
import "./Components/stylescommunity.css";
import StreakCalendar from "./Components/StreakCalendar";
import MyActivity from "./Components/MyActivity";
import Footer from "./Components/Footer";
import UserProfile from "./Components/UserProfile";
import LeaderBoard from "./Components/LeaderBoard";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";

function App() {
  const userId = "user_1729172812032";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Registration"
            element={<Registration userId={userId} />}
          />
          <Route path="/MyActivity" element={<MyActivity userId={userId} />} />
          <Route path="/Chat" element={<Chat userId={userId} />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
