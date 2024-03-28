import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import ruLocale from '@fullcalendar/core/locales/ru'; // Добавлен локаль для русского языка
import { v4 as uuid } from "uuid";

const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };

const CalendarPost = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid()
        }
      ]);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay"
        }}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[dayGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        locales={[ruLocale]}
        slotMinTime="00:00"
        slotMaxTime="24:00"
      />
    </div>
  );
};

export default CalendarPost;





