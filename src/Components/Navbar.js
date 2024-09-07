import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div class={styles.navbar}>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>My Activity</li>
          <li>Leadership Board</li>
          <li>Register</li>
          <li>Login</li>
          <li>About Us</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
