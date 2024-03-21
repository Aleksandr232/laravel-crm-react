import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from 'lodash';


const WorkLibrary = () => {
  const [workData, setWorkData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = _.debounce(() => {
    axios.get('http://localhost:8000/api/work/all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        setWorkData(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, 500); // Задержка в 500 мс

useEffect(() => {
    fetchData();
}, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    {workData.map((work, index) => (
      <div key={index} className="p-2 md:p-4 bg-green-200 border-2 border-green-500 rounded-lg mb-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-3">Общая информация объекта:</h2>
        <p className="text-gray-700">Начало работы: {work.start_work}</p>
        <p className="text-gray-700">Тип работы: {work.work_type}</p>
        <p className="text-gray-700">Расходы: {work.expenses} руб</p>
        <p className="text-gray-700">Доходы: {work.income} руб</p>
        <div className="flex justify-center">
          <img src={`http://localhost:8000/work/${work.path}`} alt="Изображение работы" className="w-28 h-28 rounded-lg mb-4" />
        </div>
      </div>
    ))}
  </div>
  );
};

export default WorkLibrary;