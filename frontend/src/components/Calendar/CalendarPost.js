import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

const CalendarPost = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([
        { title: 'Уборка снега', date: '2024-03-26' }, // Переставляем месяц и день в формате даты
        { title: 'Событие 2', date: '2022-02-10' } // Переставляем месяц и день в формате даты
    ]);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const saveNote = (note) => {
        const dateWithTime = new Date(selectedDate); // Создаем новый объект Date с выбранной датой
        const hours = dateWithTime.getHours(); // Получаем часы
        const minutes = dateWithTime.getMinutes(); // Получаем минуты
        console.log("Заметка для даты", selectedDate, "в", hours+":"+minutes, ":", note); // Логируем заметку вместе с временем
        setShowModal(false);
    }

    return (
        <div>
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"    
            weekends={false}
            locale="ru"
            events={events} // Отображение событий
            dateClick={handleDateClick} // Добавляем обработчик dateClick
        />
            {/* {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Создать заметку для {selectedDate && selectedDate.toDateString()}</h3>
                        <textarea rows="4" cols="50" placeholder="Введите заметку..." onChange={(e) => saveNote(e.target.value)} />
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default CalendarPost;