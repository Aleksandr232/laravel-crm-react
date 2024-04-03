import React,{useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../../layouts/Navbar/Navbar"; // Исправлено опечатка в импорте Navbar
import Sidebar from "../../layouts/Sidebar/Sidebar";


const ClientsWork = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [modal, setModal] = useState(false);

    const open = () =>{
      setModal(!modal);
    }

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

    return(
        <div>
            <Navbar is_admin={userData?.is_admin} showPluse={true}  name={userData?.name} avatar={userData?.avatar}   title='Клиенты' path='/clients'/>
            <Sidebar is_admin={userData?.is_admin}/>
        </div>
    )
}

export default  ClientsWork;