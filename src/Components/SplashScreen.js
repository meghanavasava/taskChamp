import React, { useEffect } from "react";
import styles from "./SplashScreen.module.css";

const SplashScreen = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onTimeout]);

  return (
    <div className={styles.splashScreen}>
      <h1>Welcome to My App</h1>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
