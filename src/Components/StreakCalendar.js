import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const StreakCalendar = (userId) => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [activityDays, setActivityDays] = useState([]);

  const specialDates = {
    "05-09-2024": "🎉",
    "10-09-2024": "🌟",
    "15-09-2024": (
      <img
        src="logo.svg"
        alt="Special"
        style={{ width: "20px", height: "20px" }}
      />
    ),
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const days = [];
    let day = new Date(startOfMonth);

    const firstDayOfWeek = startOfMonth.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    while (day <= endOfMonth) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    setCalendarDays(days);
  }, []);

  const toggleActivity = (day) => {
    const dayString = formatDateToDDMMYYYY(day);

    if (activityDays.includes(dayString)) {
      setActivityDays(activityDays.filter((d) => d !== dayString));
    } else {
      setActivityDays([...activityDays, dayString]);
    }
  };

  const getTaskListOfDay = (day) => {
    const formattedDate = formatDateToDDMMYYYY(day);
    console.log("Task list for:", formattedDate);
    <TaskList userId={userId} dateTask={formattedDate}></TaskList>;
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
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Sun</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Mon</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Tue</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Wed</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Thu</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Fri</div>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Sat</div>

        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} style={{ padding: "10px" }} />;
          }

          const dayString = formatDateToDDMMYYYY(day);
          const isActivityDay = activityDays.includes(dayString);
          const displayContent = specialDates[dayString] || day.getDate();

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
              onClick={() => getTaskListOfDay(day)}
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
