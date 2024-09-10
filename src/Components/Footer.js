import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSection}>
          <h2 className={styles.title}>MCED Footer</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Navigation</h3>
          <ul className={styles.navList}>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Information</h3>
          <p>+123456789</p>
          <p>mcedfooter@gmail.com</p>
          <p>804, Green Lane, Pakistan</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Opening Hours</h3>
          <p>Mon - Thu: 8:00 - 21:00</p>
          <p>Fri: 8:00 - 20:00</p>
          <p>Sat: 10:00 - 23:00</p>
          <p>Sun: Closed</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          &copy; 2020 All rights reserved | Block is made with love by Mukster
          Chaudhry
        </p>
        <div className={styles.socialIcons}>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
