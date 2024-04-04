import React,{useState, useEffect} from "react";
import axios from "axios";

const ClientsWorksTable=()=>{
    const [data, setData] = useState([]);

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
        <tr key={id}>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.name}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.phone}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.organization}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.type_work}</td>
        <td className="px-3 py-4 text-center whitespace-nowrap">{clients.duration}</td>
      </tr>
    ))}
        </tbody>
    </table>
</div>
    )
}

export default ClientsWorksTable;