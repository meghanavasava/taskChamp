import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";
import styles from "./MyActivity.module.css";

const MyActivity = ({ userId }) => {
  return (
    <div class={styles.container}>
      <div class={styles.row}>
        <div class={styles.navbar}>
          <Navbar></Navbar>
        </div>
        <div class={styles.streak}>
          <StreakCalendar userId={userId}></StreakCalendar>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
