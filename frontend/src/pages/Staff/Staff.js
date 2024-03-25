import React, { useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layouts/Navbar/Navbar"; // Исправлено опечатка в импорте Navbar
import Sidebar from "../../layouts/Sidebar/Sidebar";


const Staff=()=>{
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // если токен отсутствует, перенаправляем на страницу авторизации
    } else {
      axios
        .get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
          }
        })
        .then((response) => {
          console.log("Token is valid");
          setUserData(response.data); 
          const is_admin = response.data.is_admin
          if(is_admin == 0){
            navigate("/home");
          }
        })
        .catch((error) => {
          console.log("Token is invalid");
          localStorage.removeItem("token"); // удаляем токен из локального хранилища
          navigate("/"); // перенаправляем на страницу авторизации
        });
      }
  }, [navigate]);

  const navigateTable=()=>{
    navigate("/staff/table")
  }

  return (
    <div>
      <Navbar name={userData?.name} avatar={userData?.avatar}  title='Сотрудники' path='/staff'/>
      <Sidebar is_admin={userData?.is_admin}/>
      <div style={{position: "relative",  top: '10px'}} className="flex flex-wrap justify-evenly">
        <div onClick={navigateTable} className="w-full md:w-1/2 xl:w-1/4 p-6 bg-blue-200 border-2 border-blue-500 rounded-lg mb-4 cursor-pointer">
          <h2 className="text-lg font-semibold mb-5">Общая информация сотрудников</h2>
          <p className="text-gray-700">Здесь можно разместить общую информацию о сотрудниках.</p>
        </div>
        
        <div className="w-full md:w-1/2 xl:w-1/4 p-6 bg-green-200 border-2 border-green-500 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-5">Личное дело сотрудника</h2>
          <p className="text-gray-700">Этот блок предназначен для информации о персональных данных каждого сотрудника.</p>
        </div>
      {/* Добавьте еще два блока согласно вашим требованиям */}
    </div>
    </div>
  );
};


export default Staff;