import React, { useState, useEffect } from "react";

const StreakCalendar = () => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [activityDays, setActivityDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const days = [];
    let day = new Date(startOfMonth);

    while (day <= endOfMonth) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    setCalendarDays(days);
  }, []);

  const toggleActivity = (day) => {
    const dayString = day.toISOString().split("T")[0];

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
          const dayString = day.toISOString().split("T")[0];
          const isActivityDay = activityDays.includes(dayString);

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
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
