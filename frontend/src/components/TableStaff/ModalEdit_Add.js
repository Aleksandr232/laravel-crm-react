import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';


const AddStaffForm = ({ onClose }) => {
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('c89f884d9f1e65467637', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('staff-added', function(data) {
      // alert(JSON.stringify(data));
      console.log(data.data)
    });
  }, []);

  const token = localStorage.getItem("token");
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [document, setDocument] = useState('');
  const [licence, setLicence] = useState('');
  const [file, setFile] = useState('');
  

  const handleClose = () => {
    onClose();
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('document', document);
    formData.append('licence', licence);
    formData.append('file', file);


    axios.post("http://localhost:8000/api/staff", formData, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        alert('Сотрудник не добавлен');
        console.log(error);
    });
        onClose();
    }; 
  

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow-md">
        <div className="flex justify-end">
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
        <h2 className="text-lg font-bold mb-4">Добавить сотрудника</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Номер"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Адресс"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Документ"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={licence}
            onChange={(e) => setLicence(e.target.value)}
            placeholder="Удостоверение"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" // Если нужно ограничить типы файлов
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

const EditStaffForm = ({ staff, onClose }) => {
    const token = localStorage.getItem("token");
    const [name, setName] = useState(staff.name);
    const [phone, setPhone] = useState(staff.phone);
    const [address, setAddress] = useState(staff.address);
    const [document, setDocument] = useState(staff.document);
    const [licence, setLicence] = useState(staff.licence);
    const [file, setFile] = useState(staff.file);

    

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('document', document);
    formData.append('licence', licence);
    formData.append('file', file);
  
    const id = staff.id;
  
    try {
      const response = await axios.put(`http://localhost:8000/api/staff_update/${id}`, formData, config);
      console.log(response.data);
      onClose();
    } catch (error) {
      alert('Ошибка при обновлении сотрудника');
      console.error(error);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow-md">
      <div className="mx-auto max-w-sm p-4 border border-gray-200 rounded-md">
      <div className="flex justify-end">
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
      <h2 className="text-lg font-bold mb-4">Редактировать сотрудника</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Номер"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Адресс"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Документ"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={licence}
            onChange={(e) => setLicence(e.target.value)}
            placeholder="Удостоверение"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
            
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
            placeholder="Файл"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Сохранить
        </button>
      </form>
    </div>
      </div>
    </div>
  );
};

export { AddStaffForm, EditStaffForm };
