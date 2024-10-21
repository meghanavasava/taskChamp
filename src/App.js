import React, { useEffect } from "react";
import React, { useEffect ,useState} from "react";
import {BrowserRouter,Router ,Route, Routes} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Feed from './Components/Feed';
// import "./Components/chatComponents/styles.scss"
import { getCurrentUser } from './FirebaseOperations';

import Chat from "./Components/Chat";
import "./Components/stylescommunity.css";


// import Home from "./Components/chatComponents/Home"
import StreakCalendar from "./Components/StreakCalendar";
import MyActivity from "./Components/MyActivity";
import Footer from "./Components/Footer";
import UserProfile from "./Components/UserProfile";

import LeaderBoard from "./Components/LeaderBoard";

import Registration from "./Components/Registration";

import Login from "./Components/Login";


// import { UserList } from './Components/UserList';

//import { createOrGetChat } from './Components/ChatUtils';
=======
import AboutUs from "./Components/AboutUs";


function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  // return (
  //   <div>
  //     <MyComponent></MyComponent>
  //   </div>
  // );

  
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const user = getCurrentUser(); // Retrieve the current user
  //   if (user) {
  //     setUserId(user.uid); // Assuming `uid` is the user ID
  //   }
  // }, []);
  // const [chatId, setChatId] = useState(null); // For storing the active chat ID
  // const [selectedUser, setSelectedUser] = useState(null); // For storing the selected user
  // const currentUser = { id: userId, username: "ExampleUser" }; // Mock current user
  const userId = "user_1729172812032";




  //  return (
  //    <div>
  //    <MyActivity userId={userId}></MyActivity>
  //  </div>
  //  );

  //return (
  //<div>
  //<UserProfile userId={userId}></UserProfile>
 
  // return (
  //   <div>
  //   <LeaderBoard />

  //   </div>
  // );
  

  
  // return (
  //   <div>
  //     <Registration></Registration>
      
  //   <Login userId={userId}></Login>

  //   </div>
  // );



  // return (
    // <div>
      // <Registration></Registration>
    // </div>
  // );


  return (
    <div>   
    <BrowserRouter>
    <div>

      {/* Uncomment and modify these returns based on your need */}
      {/* <MyActivity userId={userId}></MyActivity> */}

      {/* <UserProfile userId={userId}></UserProfile> */}

      {/* Render UserList if no chatId is selected, else show the Chat component */}
      {/* {!chatId ? (
        <UserList onUserSelect={handleUserSelect} />
      ) : (
        <Chat chatId={chatId} currentUser={currentUser} />
      )} */}
      {/* <Home/> */}
      {/* <Chat></Chat> */}

      {/* <Login></Login> */}
    
    <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/Registration" element={<Registration userId={ userId}/>}></Route>
      <Route path="/MyActivity" element={<MyActivity userId={userId} />} />
      <Route path="/Chat" element={<Chat userId={userId} />} />    
      <Route path="/feed" element={<Feed />} />
      <Route path="/MyActivity" element={<MyActivity userId={userId} />} />      
    </Routes>
    </BrowserRouter>
      <Route path="/Chat" element={<Chat userId={userId} />} />       
    </Routes>
    </BrowserRouter> 
      <AboutUs></AboutUs>

    </div>
 
  );
}

export default App;





