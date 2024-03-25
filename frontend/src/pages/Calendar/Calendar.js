import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../layouts/Navbar/Navbar"; // Исправлено опечатка в импорте Navbar
import Sidebar from "../../layouts/Sidebar/Sidebar";
import CalendarPost from "../../components/Calendar/CalendarPost";

const Calendar=()=>{
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
    }, []);

    return(
        <div>
            <Navbar name={userData?.name} avatar={userData?.avatar} title='Календарь'  path='/calendar' />
            <Sidebar is_admin={userData?.is_admin} />
            <CalendarPost/>
        </div>
    )

}

export default Calendar;