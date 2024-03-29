import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import ruLocale from '@fullcalendar/core/locales/ru'; // Добавлен локаль для русского языка




const CalendarPost = () => {
  const [events, setEvents] = useState([]);

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8000/api/calendar/all',{
        headers: {
            Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
          }
    })
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          title: event.work_des,
          start: event.day_work
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        eventClick={(info) =>{
          alert(`Информация по работе: ${info.event.title}`);
        }}
      />
    </div>
  );
};

export default CalendarPost





