import React, { useState } from "react";

const WorkLibrary = () => {
  return (
    <div style={{position: "relative",  top: '10px'}} className="flex flex-wrap justify-evenly">
        <div className="w-full md:w-1/2 xl:w-1/4 p-6 bg-green-200 border-2 border-green-500 rounded-lg mb-4 cursor-pointer">
          <h2 className="text-lg font-semibold mb-5">Общая информация сотрудников</h2>
          <p className="text-gray-700">Здесь можно разместить общую информацию о сотрудниках.</p>
        </div>
        
        <div className="w-full md:w-1/2 xl:w-1/4 p-6 bg-green-200 border-2 border-green-500 rounded-lg mb-4 cursor-pointer">
          <h2 className="text-lg font-semibold mb-5">Личное дело сотрудника</h2>
          <p className="text-gray-700">Этот блок предназначен для информации о персональных данных каждого сотрудника.</p>
        </div>
      {/* Добавьте еще два блока согласно вашим требованиям */}
    </div>
  );
};

export default WorkLibrary;