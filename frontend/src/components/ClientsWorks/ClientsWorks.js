import React, { useState } from "react";

const ClientsWorks = ({ onClose }) => {
  

  const handleClose = () => {
    onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  stroke="currentColor"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-lg font-bold mb-4">Заполнить клиента</h1>
          <form  className="space-y-4">
          {/* <label htmlFor="startDate" className="block font-semibold mb-1">Имя</label> */}
        <input
            type="text"
            
            placeholder="Имя"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Телефон</label> */}
        <input
            type="text"
            
            placeholder="Номер"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Организация</label> */}
        <input
            type="text"
            
            placeholder="Организация"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Описание работы</label> */}
        <input
            type="text"
            
            placeholder="Вид работы"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Срок работы</label> */}
        <input
            type="text"
            
            placeholder="Срок работы"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
            Добавить
        </button>
        </form>
     </div>
    </div>
  );
};

export default ClientsWorks;