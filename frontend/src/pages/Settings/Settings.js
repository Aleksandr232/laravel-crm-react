import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';
import axios from "axios";

import Navbar from "../../layouts/Navbar/Navbar"; // Исправлено опечатка в импорте Navbar
import Sidebar from "../../layouts/Sidebar/Sidebar";
import { GiSkeletonInside } from "react-icons/gi";


const Settings=()=>{
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [company, setCompany] = useState('');
    const [ogrnip, setOgrnip] = useState('');
    const [inn, setInn] = useState('');
    const [address, setAddress] = useState('');
    const [payment_account, setPaymentAccount] = useState('');
    const [correspondent_account, setCorrespondentAccount] = useState('');
    const [bank, setBank] = useState('');
    const [cod_bik, setCodBik] = useState('');

    const fadeIn = useSpring({ 
        opacity: userData ? 1 : 0, 
        from: { opacity: 0 },
        config: { duration: 800 } 
      });

      const handleSubmit = (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();

        const id = userData?.id;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('company', company);
        formData.append('ogrnip', ogrnip);
        formData.append('inn', inn);
        formData.append('address', address);
        formData.append('payment_account', payment_account);
        formData.append('correspondent_account', correspondent_account);
        formData.append('bank', bank);
        formData.append('cod_bik', cod_bik);

        /* const avatar = userData?.avatar;
        const is_admin = userData?.is_admin; */
    
        axios.post(`http://localhost:8000/api/user/settings/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then((response) => {
            console.log(response.data);
            
        })
        .catch((error) => {
            console.log(error);
        });
    
        }; 

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
              setName(response.data.name);
              setPhone(response.data.phone);
              setEmail(response.data.email);
              setPassword(response.data.password);
              setCompany(response.data.company);
              setOgrnip(response.data.ogrnip);
              setInn(response.data.inn);
              setAddress(response.data.address);
              setPaymentAccount(response.data.payment_account);
              setCorrespondentAccount(response.data.correspondent_account);
              setBank(response.data.bank ? response.data.bank : "введите банк");
              setCodBik(response.data.cod_bik);
            })
            .catch((error) => {
              console.log("Token is invalid");
              localStorage.removeItem("token"); // удаляем токен из локального хранилища
              navigate("/"); // перенаправляем на страницу авторизации
            });
          }
      }, []);

      const avatar = userData?.avatar;
      const is_admin = userData?.is_admin;

    return(
        <div>
            <Navbar is_admin={userData?.is_admin}  name={userData?.name} avatar={userData?.avatar} title='Настройка пользователя'  path='/settings' />
            <Sidebar is_admin={userData?.is_admin} />
            <div>
            <animated.div style={fadeIn}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 absolute left-20">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Мой профиль</h3>
              <p className="mt-1 text-sm text-gray-600">
                Информация о профиле
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 relative right-24">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Фото</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {avatar ? (
                      <img src={avatar} alt="Картинка"  className="w-full h-full object-cover" />
                    ) : (
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                      </span>
                      {/* <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Изменить
                      </button> */}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Фото на обложке</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Загрузить файл</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">или перетащите</p>

                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                    <div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Имя</label>
                        <input id="name-input" value={name} onChange={(e)=>setName(e.target.value)}   name="name" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email-input">Почта</label>
                        <input id="email-input" value={email} onChange={(e)=>setEmail(e.target.value)}  name="email" type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone-input">Телефон</label>
                        <input id="phone-input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="номер телефона" name="phone" type="phone" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password-input">Пароль</label>
                    <input 
                        id="password-input" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        autocomplete="current-password" 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                    <input 
                    type="checkbox" 
                    onChange={() => setShowPassword(!showPassword)}
                        />
                        <label>Посмотреть пароль</label>
                    </div>
                        {is_admin === 1 && (<div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Название ИП/ООО</label>
                            <input id="name-input" value={company} onChange={(e)=>setCompany(e.target.value)} name="company" placeholder="назавние компнии" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">ОГРНИП</label>
                            <input id="ogrnip-input" value={ogrnip} onChange={(e)=>setOgrnip(e.target.value)} name="ogrnip" placeholder="введите ОГРНИП" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">ИНН/КПП </label>
                            <input id="name-input" value={inn} onChange={(e)=>setInn(e.target.value)} name="inn" placeholder="введите ИНН/КПП " type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Адрес</label>
                            <input id="name-input" value={address} onChange={(e)=>setAddress(e.target.value)} name="address" placeholder="введите адресс" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Расчетный счет</label>
                            <input id="name-input" value={payment_account} onChange={(e)=>setPaymentAccount(e.target.value)} name="payment_account" placeholder="введите расчетный счет " type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Корреспондентский счет</label>
                            <input id="name-input" name="correspondent_account" value={correspondent_account} onChange={(e)=>setCorrespondentAccount(e.target.value)} placeholder="введите корреспондентский счет" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Наименование и адрес обслуживающего банка </label>
                            <input id="name-input" name="bank" value={bank} onChange={(e)=>setBank(e.target.value)} placeholder="введите банк и адресс" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name-input">Код БИК</label>
                            <input id="name-input" value={cod_bik} onChange={(e)=>setCodBik(e.target.value)} name="cod_bik" placeholder="введите Код БИК" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        </div>)}
                </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                   Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </animated.div>  
      </div>
    </div>
    )
}

export default Settings;

