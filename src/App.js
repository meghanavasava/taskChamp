import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import StreakCalendar from "./Components/StreakCalendar";
import MyActivity from "./Components/MyActivity";
import Footer from "./Components/Footer";
import UserProfile from "./Components/UserProfile";

import LeaderBoard from "./Components/LeaderBoard";

import Registration from "./Components/Registration";
import Login from "./Components/Login";





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

  const userId = "user_1725465375818";

  //  return (
  //    <div>
  //    <MyActivity userId={userId}></MyActivity>
  //  </div>
  //  );


  //return (
    //<div>
      //<UserProfile userId={userId}></UserProfile>
      
    //</div>
  //);

   //return (
    //<div>
       //<UserProfile userId={userId}></UserProfile>
      //<LeaderBoard />

      
//=======
  // return (
  //   <div>
  //     <UserProfile userId={userId}></UserProfile>
  //   </div>
  // );

 
  return (
    <div>
    <Login></Login>

    </div>
  );
}

export default App;
