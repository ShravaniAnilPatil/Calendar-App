import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const EventModal = ({ selectedDate, onClose }) => {
  const [eventData, setEventData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load events for the selected date from localStorage
    const savedEvents = JSON.parse(localStorage.getItem(format(selectedDate, "yyyy-MM-dd"))) || [];
    setEvents(savedEvents);
  }, [selectedDate]);

  const handleSave = () => {
    if (!eventData.name || !eventData.startTime || !eventData.endTime) {
      alert("Please fill out all required fields!");
      return;
    }

    // Save the new event to localStorage
    const updatedEvents = [...events, eventData];
    localStorage.setItem(format(selectedDate, "yyyy-MM-dd"), JSON.stringify(updatedEvents));

    // Update the state and clear inputs
    setEvents(updatedEvents);
    setEventData({ name: "", startTime: "", endTime: "", description: "" });
    alert("Event saved successfully!");
  };

  const handleDelete = (index) => {
    // Create a new array without the deleted event
    const updatedEvents = events.filter((_, i) => i !== index);

    // Update localStorage and the state
    localStorage.setItem(format(selectedDate, "yyyy-MM-dd"), JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    alert("Event deleted successfully!");
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>📅 Events for {format(selectedDate, "dd MMM yyyy")}</h2>

        {/* Form to add events */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Event Name *</label>
          <input
            type="text"
            placeholder="Enter event name"
            style={styles.input}
            value={eventData.name}
            onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
          />
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Start Time *</label>
            <input
              type="time"
              style={styles.input}
              value={eventData.startTime}
              onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>End Time *</label>
            <input
              type="time"
              style={styles.input}
              value={eventData.endTime}
              onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            rows="4"
            placeholder="Add event description"
            style={styles.textarea}
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.saveButton} onClick={handleSave}>
            Save Event
          </button>
          <button style={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>

        {/* Display events for the selected day */}
        <div style={styles.eventList}>
          <h3>Saved Events:</h3>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} style={styles.eventItem}>
                <strong>{event.name}</strong> | {event.startTime} - {event.endTime}
                <p>{event.description}</p>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No events for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "500px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    resize: "none",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  eventList: {
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
  },
  eventItem: {
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default EventModal;
