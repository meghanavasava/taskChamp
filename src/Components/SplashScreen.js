import React, { useEffect } from "react";
import styles from "./SplashScreen.module.css";

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/Registration";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.splashScreen}>
      <h1>Tasky</h1>
      <p>Welcome! We’re here to help you organize your tasks effectively.</p>
    </div>
  );
};

export default SplashScreen;
