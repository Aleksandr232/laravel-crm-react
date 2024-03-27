import React, {useState} from "react";
import axios from "axios";

const CalendarForm=({ onClose })=>{
    
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
        <form className="max-w-md mx-auto">
            <div>
            <input type="time" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
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