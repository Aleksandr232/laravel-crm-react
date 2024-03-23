import React, { useState, useEffect } from "react";
import { AddStaffForm, EditStaffForm } from "./ModalEdit_Add";
import axios from "axios";

const TableStaff = () => {
const [staffData, setStaffData] = useState([]);
const [showAddForm, setShowAddForm] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);
const [selectedStaff, setSelectedStaff] = useState(null);
const token = localStorage.getItem("token");

  useEffect(() => {
    
    axios.get('http://localhost:8000/api/staff/all',{
        headers: {
            Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
          }
    })
      .then(response => {
        setStaffData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  

  const handleTableClick = (event, staffMember) => {
    event.preventDefault();
    if (event.button === 0) { // Левая кнопка мыши
      setShowAddForm(true);
    } else if (event.button === 2) { // Правая кнопка мыши
      setSelectedStaff(staffMember);
      setShowEditForm(true);
    }
  };

  
  const delClick = (event, staffMember) => {
    event.preventDefault();
    if (window.confirm("Вы уверены, что хотите удалить этого сотрудника?")) {
      axios.delete(`http://localhost:8000/api/staff/${staffMember.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log(response.data);
        const updatedStaffData = staffData.filter(item => item.id !== staffMember.id);
        setStaffData(updatedStaffData);
      })
      .catch((error) => {
        alert('Сотрудник не удален');
        console.log(error);
      });   
    }
  };

  

  
  
  return (
    <div className="overflow-x-auto">
    {showAddForm &&  <AddStaffForm  onClose={() => setShowAddForm(false)}  />}
    {showEditForm && selectedStaff && <EditStaffForm staff={selectedStaff} onClose={() => setShowEditForm(false)} />}
    <table className="min-w-max w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase cursor-pointer" onClick={(e) => handleTableClick(e)}>Имя</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Телефон</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Адрес</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Документы</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Удостоверение</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Файлы</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {staffData.map((staffMember, id) => (
      <tr key={id} onContextMenu={(e) => handleTableClick(e, staffMember)} onClick={(e) => delClick(e, staffMember)}>
        <td className="px-3 py-4 text-center whitespace-nowrap">{staffMember.name}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{staffMember.phone}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{staffMember.address}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{staffMember.document}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{staffMember.licence}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">
          <a download={staffMember.file} href={`http://localhost:8000/file_staff/${staffMember.path}`}>
            {staffMember.file.slice(0, 10)}
          </a>
        </td>
      </tr>
    ))}
        </tbody>
    </table>
</div>
  );
};

export default TableStaff;

