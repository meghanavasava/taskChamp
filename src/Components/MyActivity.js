import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";
import styles from "./MyActivity.module.css";
import Footer from "./Footer";

const MyActivity = ({ userId }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Navbar></Navbar>
        </div>
        <div className={styles.streak}>
          <StreakCalendar userId={userId}></StreakCalendar>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyActivity;
