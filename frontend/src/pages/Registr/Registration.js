import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    
    axios
      .post("http://localhost:8000/api/register", {
        email,
        password,
        name,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token); // сохраняем токен в локальном хранилище
        navigate("/home"); // перенаправляем пользователя на страницу home
      })
      .catch((error) => {
        alert(`Произошла ошибка при регистрации: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Зарегистрироваться
        </h2>
        <div className="space-y-4">
          <input
            onChange={(e) => setName(e.target.value)}
            className="rounded-md block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Имя"
          />
          <input
            autocomplete="email"
            onChange={(e) => setEmail(e.target.value)}
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
          </div>
        </div>
        <button
          onClick={handleLogin}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Зарегистрироваться
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-600">Уже есть аккаунт?</p>
          <Link to="/" className="text-indigo-600 hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
