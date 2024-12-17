import React, { useState } from "react";
import HomePage from "./components/HomePage";
import CalendarView from "./components/CalenderView";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      {showCalendar ? <CalendarView /> : <HomePage onStart={() => setShowCalendar(true)} />}
    </div>
  );
}

export default App;
