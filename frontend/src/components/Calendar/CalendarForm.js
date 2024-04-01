import React, {useState} from "react";
import axios from "axios";

const CalendarForm=({ onClose })=>{
    const [day, setDay] = useState('');
    const [work, setWork] = useState('');
    const [end, setEnd] = useState('');
    const [count, setCount] = useState('');

    const handleSubmit = (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();


        const formData = new FormData();
        formData.append('day_work', day);
        formData.append('work_des', work);
        formData.append('end_work', end);
        formData.append('people_count', count);
    
        axios.post("http://localhost:8000/api/calendar", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
            onClose();
        }; 

    const handleClose = () => {
        onClose();
    };


    

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-md shadow-md">
        <div className="flex justify-end mb-4">
            <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="currentColor" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Выбрать день работы</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div>
                <label htmlFor="startDate" className="block font-semibold mb-1">Дата и время работы</label>
                <input value={day}  onChange={(e)=>setDay(e.target.value)} type="datetime-local" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
            </div>
            <div>
                <label htmlFor="endDate" className="block font-semibold mb-1">Дата оканчание работы</label>
                <input value={end}  onChange={(e)=>setEnd(e.target.value)} type="datetime-local" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
            </div>
            <div>
                <label htmlFor="numberOfPeople" className="block font-semibold mb-1">Количество человек:{count}</label>
                <input 
                    value={count} 
                    onChange={(e) => setCount(e.target.value)} 
                    type="range" 
                    min="1" 
                    max="10" 
                    className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                />
            </div>
            <div>
                <label htmlFor="startDate" className="block font-semibold mb-1">Описание работы</label>
                <input value={work} onChange={(e)=>setWork(e.target.value)}  placeholder="что нужно сделать?" type="text" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
            </div>
            <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
            >
            Добавить
            </button>
        </form>
        </div>
      </div>
      
        
    )
}

export default CalendarForm;