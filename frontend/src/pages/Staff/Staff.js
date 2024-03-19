import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layouts/Navbar/Navbar"; // Исправлено опечатка в импорте Navbar
import Sidebar from "../../layouts/Sidebar/Sidebar";
import TableStaff from "../../components/TableStaff/TableStaff";

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
        })
        .catch((error) => {
          console.log("Token is invalid");
          localStorage.removeItem("token"); // удаляем токен из локального хранилища
          navigate("/"); // перенаправляем на страницу авторизации
        });
      }
  }, [navigate]);

  return (
    <div>
      <Navbar name={userData?.name} avatar={userData?.avatar}  title='Сотрудники' path='/staff'/>
      <Sidebar/>
      <TableStaff/>
    </div>
  );
};


export default Staff;