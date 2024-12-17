import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  getDay,
} from "date-fns";
import EventModal from "./EventModal";
import { FaPlus } from "react-icons/fa";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const openEventModal = (date) => {
    const today = new Date();
    if (isBefore(date, today)) {
      setErrorMessage("Day has passed. Events cannot be planned for past days.");
    } else {
      setSelectedDate(date);
      setErrorMessage(""); // Clear any previous error messages
      setIsModalOpen(true);
    }
  };

  const saveEvent = (eventData) => {
    setEvents({ ...events, [selectedDate]: [...(events[selectedDate] || []), eventData] });
    setIsModalOpen(false);
  };

  const getEventCount = (date) => {
    return events[date] ? events[date].length : 0;
  };

  // Get the name of the day (e.g., "Mon", "Tue", etc.)
  const getDayName = (date) => {
    const dayIndex = getDay(date); // Get index of the day (0 = Sunday, 1 = Monday, etc.)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.navButton} onClick={goToPreviousMonth}>
          &#8592; Previous
        </button>
        <h1 style={styles.title}>{format(currentMonth, "MMMM yyyy")}</h1>
        <button style={styles.navButton} onClick={goToNextMonth}>
          Next &#8594;
        </button>
      </div>

      {/* Day names */}
      <div style={styles.dayNames}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} style={styles.dayNameCell}>
            <span>{day}</span>
          </div>
        ))}
      </div>

      {/* Days in month */}
      <div style={styles.grid}>
        {daysInMonth.map((day) => (
          <div
            key={day}
            style={{
              ...styles.day,
              ...(isToday(day) && styles.today),
            }}
            onClick={() => openEventModal(day)}
          >
            <span style={styles.dateText}>{format(day, "dd")}</span>
            {getEventCount(day) > 0 && (
              <div style={styles.eventCount}>
                {getEventCount(day)} {getEventCount(day) === 1 ? "Event" : "Events"}
              </div>
            )}
            <div style={styles.addButton}>
              <FaPlus size={20} title="Add Event" />
            </div>
          </div>
        ))}
      </div>

      {/* Display error message if selected day is in the past */}
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      {isModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          onSave={saveEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(to bottom,rgb(92, 88, 162),rgb(100, 106, 179))",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: "#fff",
    color: "#2193b0",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  dayNames: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2193b0",
  },
  dayNameCell: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "15px",
  },
  day: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s, background-color 0.3s",
    position: "relative",
  },
  today: {
    border: "2px solid #2193b0",
    backgroundColor: "#e1f5fe",
  },
  dateText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  },
  eventCount: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "#2193b0",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "600",
  },
  addButton: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    color: "#2193b0",
    cursor: "pointer",
  },
  errorMessage: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
  },

  // Responsive Styles
  "@media (max-width: 768px)": {
    title: {
      fontSize: "24px",
    },
    grid: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    dayNameCell: {
      fontSize: "14px",
    },
    day: {
      padding: "10px",
    },
    dateText: {
      fontSize: "16px",
    },
    navButton: {
      padding: "8px 12px",
      fontSize: "14px",
    },
    errorMessage: {
      fontSize: "14px",
    },
  },
  "@media (max-width: 480px)": {
    grid: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    dayNameCell: {
      fontSize: "12px",
    },
    day: {
      padding: "8px",
    },
    dateText: {
      fontSize: "14px",
    },
    navButton: {
      padding: "6px 10px",
      fontSize: "12px",
    },
  },
};

export default CalendarView;
