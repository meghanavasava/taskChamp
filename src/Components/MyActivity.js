import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";

const MyActivity = ({ userId }) => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <Navbar></Navbar>
        </div>
        <div class="col-md-10">
          <StreakCalendar userId={userId}></StreakCalendar>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
