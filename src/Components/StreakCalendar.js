import React, { useState, useEffect } from "react";
import moment from "moment";

const StreakCalendar = () => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [activityDays, setActivityDays] = useState([]);

  const specialDates = {
    "2024-09-05": "🎉",
    "2024-09-10": "🌟",
    "2024-09-15": (
      <img
        src="logo.svg"
        alt="Special"
        style={{ width: "20px", height: "20px" }}
      />
    ),
  };

  useEffect(() => {
    const today = moment();
    const startOfMonth = today.startOf("month").startOf("week");
    const endOfMonth = today.endOf("month").endOf("week");

    const days = [];
    let day = startOfMonth;

    while (day <= endOfMonth) {
      days.push(day.clone());
      day = day.add(1, "day");
    }

    setCalendarDays(days);
  }, []);

  // Function to toggle activity on a day
  const toggleActivity = (day) => {
    const dayString = day.format("YYYY-MM-DD");

    if (activityDays.includes(dayString)) {
      setActivityDays(activityDays.filter((d) => d !== dayString));
    } else {
      setActivityDays([...activityDays, dayString]);
    }
  };

  return (
    <div>
      <h2>Streak Calendar</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {calendarDays.map((day, index) => {
          const dayString = day.format("YYYY-MM-DD");
          const isActivityDay = activityDays.includes(dayString);

          // Check if the day has a special emoji or image
          const displayContent = specialDates[dayString] || day.format("D");

          return (
            <div
              key={index}
              style={{
                padding: "10px",
                backgroundColor: isActivityDay ? "green" : "lightgray",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleActivity(day)}
            >
              {displayContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
