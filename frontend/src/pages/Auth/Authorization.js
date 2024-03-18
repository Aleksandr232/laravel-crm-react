import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SignGoogle from "../../components/Authorization/SignGoogle";
import SignYandex from "../../components/Authorization/SignYandex";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/api/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token); // сохраняем токен в локальном хранилище
        navigate("/home"); // перенаправляем пользователя на страницу home
      })
      .catch((error) => {
        alert(`Произошла ошибка при авторизации: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Войти
        </h2>
        <div className="space-y-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="email"
            className="rounded-md block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="почта"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="пароль"
            type="password"
            autocomplete="current-password"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
              Запомнить меня
            </label>
            <Link to='/register' className="ml-2 text-sm text-indigo-600">Зарегистрироваться</Link>
          </div>
        </div>
        <button
          onClick={handleLogin}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Войти
        </button>
        <SignGoogle />
        <SignYandex/>
        <div className="text-center">
          <p className="text-sm text-gray-600">Забыли пароль?</p>
          <a href="#" className="text-indigo-600 hover:underline">
            Восстановить
          </a>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
