import React, { useState } from "react";
import { format } from "date-fns";

const EventModal = ({ selectedDate, onSave, onClose }) => {
  const [eventData, setEventData] = useState({ name: "", startTime: "", endTime: "", description: "" });

  const handleSave = () => {
    if (!eventData.name || !eventData.startTime || !eventData.endTime) {
      alert("Please fill out all required fields!");
      return;
    }
    onSave(eventData);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2>Events for {format(selectedDate, "dd-MM-yyyy")}</h2>
        <input placeholder="Event Name" onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
        <input type="time" placeholder="Start Time" onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })} />
        <input type="time" placeholder="End Time" onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
        <button onClick={handleSave}>Save Event</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default EventModal;
