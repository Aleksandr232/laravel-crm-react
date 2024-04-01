import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import ruLocale from '@fullcalendar/core/locales/ru'; // Добавлен локаль для русского языка
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';



const CalendarPostWork = () => {
  const [events, setEvents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [subscribedEvents, setSubscribedEvents] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [infoCount, setInfoCount] = useState("");
  

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
            id:idx.id,
            title: idx.work_des,
            start: idx.day_work,
            end:idx.end_work,
            count:idx.people_count,
            work:idx.count_work_people
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
    const eventId = info.event.id;
    setSelectedEventId(eventId);
    if (subscribedEvents.includes(eventId)) {
        setAlertMessage(`Информация о работе: ${info.event.title}`);
        setInfoMessage('Вы подписаны на это событие.');
        setInfoCount(`Записалось: ${info.event.extendedProps.work} из ${info.event.extendedProps.count} `);
        setSubscribed(true);
    } else {
        setAlertMessage(`Информация о работе: ${info.event.title}`);
        setInfoMessage('Вы не зарегистрированы на это событие.');
        setInfoCount(`Записалось: ${info.event.extendedProps.work} из ${info.event.extendedProps.count} `);
        setSubscribed(false);
    }
    setAlertOpen(true);
  }
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  }
  
  const handleWorkClick = () => {
    const token = localStorage.getItem("token");
    const id = selectedEventId;
  
    axios
      .post(`http://localhost:8000/api/calendar/calendar_work/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setSubscribedEvents([...subscribedEvents, selectedEventId]);
        setAlertOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnsubscribeClick = () => {
    const token = localStorage.getItem("token");
    const id = selectedEventId;

    axios
      .delete(`http://localhost:8000/api/calendar/calendar_work_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setSubscribedEvents(subscribedEvents.filter(event => event !== selectedEventId));
        setSubscribed(false);
      })
      .catch((error) => {
        console.log(error);
      });

    
    setAlertOpen(false);
  };
  
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
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
          {alertMessage}
          <br />
          {infoMessage}
          <br/>
          {infoCount}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            {!subscribed && (
              <Button onClick={handleWorkClick} variant="contained" color="success" style={{ marginTop: '10px' }}>
                Записаться на работу
              </Button>
            )}
            {subscribed && (
              <Button onClick={handleUnsubscribeClick} variant="contained" color="error" style={{ marginTop: '10px' }} >
                Отписаться от работы
              </Button>
            )}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CalendarPostWork;