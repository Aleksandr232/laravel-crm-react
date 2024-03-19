import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStaffForm = ({ onClose }) => {
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
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/staff", {
        name: name,
        phone: phone,
        address: address,
        document: document,
        licence: licence,
        file: file
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
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
            type="text"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            placeholder="Файл"
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
    const [name, setName] = useState(staff?.name);
    const [phone, setPhone] = useState(staff?.phone);
    const [address, setAddress] = useState(staff?.address);
    const [document, setDocument] = useState(staff?.document);
    const [licence, setLicence] = useState(staff?.licence);
    const [file, setFile] = useState(staff?.file);

    

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const data = {
      name: name,
      phone: phone,
      address: address,
      document: document,
      licence: licence,
      file: file
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/staff/${staff.id}`, data, config);
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
            type="text"
            value={file}
            onChange={(e) => setFile(e.target.value)}
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
