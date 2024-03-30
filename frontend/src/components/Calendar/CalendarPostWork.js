import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import ruLocale from '@fullcalendar/core/locales/ru'; // Добавлен локаль для русского языка
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



const CalendarPostWork = () => {
  const [events, setEvents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = 'http://localhost:8000/api/calendar/work';
  
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        const formattedEvents = [];
        response.data.forEach(event => {
          const data = event.map(idx => ({
            title: idx.work_des,
            start: idx.day_work
          }));
          formattedEvents.push(...data);
        });
        setEvents(formattedEvents);
        console.log(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
  }, []);


  const handleEventClick = (info) => {
    setAlertMessage(`Информация по работе: ${info.event.title}`);
    setAlertOpen(true);
  }

  const handleAlertClose = () => {
    setAlertOpen(false);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
     <FullCalendar
        editable
        selectable
        events={events}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay"
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        locales={[ruLocale]}
        eventClick={handleEventClick}
      />
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CalendarPostWork;