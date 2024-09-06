import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./Components/MyComponent";
import StreakCalendar from "./Components/StreakCalendar";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Navbar from "./Components/Navbar";

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

  return (
    <div>
      <StreakCalendar userId={userId}></StreakCalendar>
    </div>
  );

  // return (
  //   <div>
  //     <Navbar></Navbar>
  //   </div>
  // );
}

export default App;
