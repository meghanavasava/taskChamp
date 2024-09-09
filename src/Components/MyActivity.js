import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";
import styles from "./MyActivity.module.css";

const MyActivity = ({ userId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar></Navbar>
      </div>
      <div className={styles.streak}>
        <StreakCalendar userId={userId}></StreakCalendar>
      </div>
    </div>
  );
};

export default MyActivity;
