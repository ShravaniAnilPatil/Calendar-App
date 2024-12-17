import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import EventModal from "./EventModal";
import { FaPlus, FaEdit, FaEye } from "react-icons/fa";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const openEventModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const saveEvent = (eventData) => {
    setEvents({ ...events, [selectedDate]: [...(events[selectedDate] || []), eventData] });
    setIsModalOpen(false);
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
            <div style={styles.actions}>
              <FaPlus size={16} title="Add Event" />
              <FaEdit size={16} title="Edit Event" />
              <FaEye size={16} title="View Events" />
            </div>
          </div>
        ))}
      </div>
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
    background: "linear-gradient(to bottom, #6dd5ed, #2193b0)",
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
  },
  today: {
    border: "2px solid #2193b0",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "10px",
    color: "#2193b0",
  },
  dateText: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

export default CalendarView;
