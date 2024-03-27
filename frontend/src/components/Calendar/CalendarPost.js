import React, { useState, useContext } from "react";
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarPost = () => {
    const [events, setEvents] = useState([
        { 
            title: 'Уборка снега', 
            start: '2024-03-28T20:00:00', 
            end: '2024-03-29T10:00:00'
          },
          {  
            title: 'Уборка снега2', 
            start: '2024-03-28T10:00:00', 
            end: '2024-03-29T20:00:00'
          } //Переставляем месяц и день в формате даты
    ]);

    const calendarRef = useContext(FullCalendar);

    return (
        <div className="w-full max-w-screen-xl mx-auto p-4">
            <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView='dayGridMonth' 
            locale="ru"
            events={events}
            headerToolbar={{
                start: 'title prev,next today',
                center: 'dayGridMonth,timeGridWeek,timeGridDay',
                end: 'listWeek'
            }}
            className="mt-4"
        />
        </div>
    )
}

export default CalendarPost;