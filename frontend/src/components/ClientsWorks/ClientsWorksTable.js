import React,{useState, useEffect} from "react";
import axios from "axios";

const ClientsWorksTable=()=>{
    const [data, setData] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    const openModal = (clients) => {
        setSelectedClient(clients);
      };
    
      const closeModal = () => {
        setSelectedClient(null);
      };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:8000/api/clients/all',{
            headers: {
                Authorization: `Bearer ${token}` // Исправлено передача токена в заголовке запроса
              }
        })
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    return(
        <div className="overflow-x-auto">
    <table className="min-w-max w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Имя</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Телефон</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Организация</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Тип работы</th>
                <th className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase">Срок работы</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {data.map((clients, id) => (
        <tr key={id} onClick={() => openModal(clients)}>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.name}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.phone}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.organization}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.type_work}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.duration}</td>
      </tr>
    ))}
        </tbody>
    </table>
    {selectedClient && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle p-6 w-3/4">
            <span className="close absolute top-0 right-0 m-4 cursor-pointer text-gray-500" onClick={closeModal}>&times;</span>
            <h3 className="text-lg font-semibold mb-2">Данные клиента</h3>
            <p>Имя: {selectedClient.name}</p>
            <p>Телефон: {selectedClient.phone}</p>
            <p>Организация: {selectedClient.organization}</p>
            <p>Тип работы: {selectedClient.type_work}</p>
            <p>Срок работы: {selectedClient.duration}</p>
            <p>Дополнительная информация: {selectedClient.additional_info}</p>
          </div>
        </div>
      )}
</div>
    )
}

export default ClientsWorksTable;