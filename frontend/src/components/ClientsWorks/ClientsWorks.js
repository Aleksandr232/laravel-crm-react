import React, { useState } from "react";
import axios from "axios";

const ClientsWorks = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [type_work, setType_work] = useState('');
  const [duration, setDuration] = useState('');
  
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('organization', organization);
    formData.append('type_work', type_work);
    formData.append('duration', duration);
    


    axios.post("http://localhost:8000/api/clients", formData, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        alert('Клиент не добавлен');
        console.log(error);
    });
        onClose();
    };

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
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* <label htmlFor="startDate" className="block font-semibold mb-1">Имя</label> */}
        <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Телефон</label> */}
        <input
            type="text"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder="Номер"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Организация</label> */}
        <input
            type="text"
            value={organization}
            onChange={(e)=>setOrganization(e.target.value)}
            placeholder="Организация"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Описание работы</label> */}
        <input
            type="text"
            value={type_work}
            onChange={(e)=>setType_work(e.target.value)}
            placeholder="Вид работы"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {/* <label htmlFor="startDate" className="block font-semibold mb-1">Срок работы</label> */}
        <input
            type="text"
            value={duration}
            onChange={(e)=>setDuration(e.target.value)}
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