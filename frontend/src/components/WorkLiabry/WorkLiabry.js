import React, { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web';
import axios from "axios";
import _ from 'lodash';


const WorkLibrary = () => {
  const [workData, setWorkData] = useState([]);
  const token = localStorage.getItem("token");

  const fadeIn = useSpring({ 
    opacity: workData ? 1 : 0, 
    from: { marginTop: -500, opacity: 0 },
    to: { marginTop: 0, opacity: 1 },
    config: { duration: 2000 } 
  });

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

const delClick = (event, work) => {
  const token = localStorage.getItem("token");
  event.preventDefault();

    axios.delete(`http://localhost:8000/api/work/${work.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response.data);
      const updatedWorkData = workData.filter(item => item.id !== work.id);
      setWorkData(updatedWorkData);
    })
    .catch((error) => {
      alert('информация не удалена');
      console.log(error);
    });   
  }


useEffect(() => {
    fetchData();
}, []);

  return (
    <div style={{position:"absolute", left:'100px', top:'100px'}} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 justify-end mx-auto">
    <animated.div style={fadeIn}>
  { workData.map((work, index) => (
    <div key={index} className="p-4 md:p-6 bg-blue-100 border-2 border-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center md:mr-4 md:max-w-xs relative">
      <button className="absolute top-0 right-0 mr-2 mt-2" onClick={(e) => delClick(e, work)}>✕</button>
      <h2 className="text-xl font-semibold mb-3 text-center">Общая информация объекта:</h2>
      <div className="text-gray-700 text-center mb-3">
        <p>Начало работы: {work.start_work}</p>
        <p>Тип работы: {work.work_type}</p>
        <p>Расходы: {work.expenses} руб</p>
        <p>Доходы: {work.income} руб</p>
      </div>
      <div className="flex justify-center">
        <img src={`http://localhost:8000/work/${work.path}`} alt="Изображение работы" className="w-32 h-32 rounded-lg mb-4" />
      </div>
    </div>
   ))}
   </animated.div>
</div>
  );
};

export default WorkLibrary;