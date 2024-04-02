import { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from '@react-spring/web';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import ruLocale from '@fullcalendar/core/locales/ru'; // Добавлен локаль для русского языка
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



const CalendarPost = () => {
  const [events, setEvents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertName, setAlertName] = useState("");
  const [alertCount, setAlertCount] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    // Определяем URL в зависимости от значения is_admin
    const url = 'http://localhost:8000/api/calendar/all';
  
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
      }
    })
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          title: event.work_des,
          start: event.day_work,
          end:event.end_work,
          names: event.name,
          count:event.count_work_people,
          work:event.people_count
        }));
        setEvents(formattedEvents);
        console.log(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
  }, []); 
  
  const handleEventClick = (info) => {
    const eventName = info.event.extendedProps.names ? info.event.extendedProps.names : 'Нет информации о записавшихся';
    const eventCount = info.event.extendedProps.count ? info.event.extendedProps.count : '0';
    const workCount = info.event.extendedProps.work;
    setAlertMessage(`Информация по работе: ${info.event.title}`); 
    setAlertName(`Записавшиеся: ${eventName}`);
    setAlertCount(`Количиство записавших: ${eventCount} из ${workCount}`);
    setAlertSeverity(info.event.extendedProps.names ? "success" : "info");
    setAlertOpen(true);
  };

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
          center:"dayGridMonth dayGridWeek dayGridDay",
          end: "today prev next"
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
          <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
            <br/>
            {alertName}
            <br/>
            {alertCount}
          </Alert>
      </Snackbar>
    </div>
    
  );
};

export default CalendarPost;




