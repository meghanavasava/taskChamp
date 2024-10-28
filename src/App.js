import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

// Importing components
import StreakCalendar from "./Components/StreakCalendar";
import MyActivity from "./Components/MyActivity";
import Footer from "./Components/Footer";
import UserProfile from "./Components/UserProfile";
import LeaderBoard from "./Components/LeaderBoard";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs"; // If you want to include this component later
import ChatWindow from "./Components/ChatWindow";
import Chat from "./Components/Chat"
import Feed from "./Components/Feed"


function App() {
  const userId = "user_1729172812032"; // You can change this dynamically as needed

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
          <Route
            path="/UserProfile"
            element={<UserProfile userId={userId} />}
          />
         
          <Route path="/Chat" element={<Chat userId={userId} />} />
          <Route path="/Feed" element={<Feed userId={userId} />} />
          
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
     {/* If you want to include Footer on every page */}
    </div>
  );
}

export default App;
