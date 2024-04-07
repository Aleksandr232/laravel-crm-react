import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';

import ModalAdd from '../../components/WorkLiabry/ModalAdd';
import CalendarForm from '../../components/Calendar/CalendarForm';
import ClientsWorks from '../../components/ClientsWorks/ClientsWorks';

import { GiMountainClimbing } from "react-icons/gi";

const Navbar = ({name, avatar, title, path, showPluse, is_admin}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCalendar, setShowModalCalendar] = useState(false);
  const [showModalClients, setShowModalClients] = useState(false);
  const fadeIn = useSpring({ 
    opacity: is_admin ? 1 : 0, 
    from: { marginLeft: -500, opacity: 0 },
    to: { marginLeft: 0, opacity: 1 },
    config: { duration: 1000 } 
  });

  const fadeIcon = useSpring({  
    opacity: avatar ? 1 : 0,
    from: { marginLeft: -500, opacity: 0 },
    to: { marginLeft: 0, opacity: 1 },
    config: { duration: 1000 }
    
  });

  const handleUserIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = () => {
    if (window.location.href === "http://localhost:3000/work") {
      setShowModal(true);
    }else if(window.location.href === "http://localhost:3000/calendar"){
      setShowModalCalendar(true);
    }else if(window.location.href === "http://localhost:3000/clients"){
      setShowModalClients(true);
    }
  };

  

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
        }
      });
      localStorage.removeItem("token"); // удаляем токен из локального хранилища
      navigate("/");
    } catch (error) {
      // Обработка ошибок при выходе
    }
  };

  return (
   
    <>
    {is_admin === 1 && showModal && <ModalAdd onClose={() => setShowModal(false)}/>}
    {is_admin === 1 && showModalCalendar && <CalendarForm onClose={() => setShowModalCalendar(false)}/>}
    {is_admin === 1 && showModalClients && <ClientsWorks onClose={() => setShowModalClients(false)} />}
    <nav className="bg-indigo-600 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            
            <a href={path} className="text-white text-lg font-bold">{title}</a>
            <animated.div style={fadeIn}>
            {showPluse && (
              is_admin === 1  && <div className='cursor-pointer relative left-1'>
                <svg onClick={openModal}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 1 1 18 0Z" />
                </svg>
              </div>
            )}
            </animated.div>
            
            
            

          </div>
          <div className="items-center relative flex">
          <div className="flex items-center">
                <div className="flex items-center space-x-16">
                  <div className="ml-4"> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clip-rule="evenodd" />
                  </svg>
                  </div>
                  <div className="ml-4"> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                  </svg>
                  </div>
                </div>
              </div>
              <animated.div style={fadeIcon}>
              <button
                onClick={handleUserIconClick}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden relative left-6">
                
                    {avatar ? (
                      <img src={avatar} alt="Картинка" title={name} className="w-full h-full object-cover" />
                    ) : (
                      <GiMountainClimbing title={name} className="w-full h-full object-cover" />
                    )}
                  
                </div>
              </button>
              </animated.div>
            {menuOpen && (
              <div className="absolute top-full right-0 border bg-white z-10">
                <Link to="/settings"  className="block px-4 py-2 flex justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Настройки
                </Link>
                <Link  onClick={handleLogout} className="block px-4 py-2 flex justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Выйти
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;

