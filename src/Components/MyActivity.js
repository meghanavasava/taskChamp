import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";
import styles from "./MyActivity.module.css";
import Footer from "./Footer";

const MyActivity = ({ userId }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.streak}>
          <StreakCalendar userId={userId} />
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default MyActivity;