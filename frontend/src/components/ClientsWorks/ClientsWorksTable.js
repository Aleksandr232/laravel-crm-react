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

      const delClient = () => {
          const token = localStorage.getItem("token");
          axios.delete(`http://localhost:8000/api/clients/${selectedClient.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((response) => {
            console.log(response.data);
            const updatedData = data.filter(client => client.id !== selectedClient.id);
            setData(updatedData);
          })
          .catch((error) => {
            alert('Сотрудник не удален');
            console.log(error);
          });   
          closeModal();
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

      const wordExport = () => {
        const token = localStorage.getItem("token");
        const id = selectedClient.id;
        axios.post(`http://localhost:8000/api/clients/document/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            alert('Файл не создан');
            console.error(error);
        });
        closeModal();
    };
   
    


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
        <tr key={id} onClick={() => openModal(clients)} className="cursor-pointer">
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
          <button
              className="close absolute top-0 right-0 m-4 cursor-pointer text-gray-500"
              onClick={closeModal}
              
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  stroke="currentColor"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-2">Данные клиента</h3>
            <div class="grid grid-cols-3 gap-2">
                <div>Имя: {selectedClient.name}</div>
                <div>Телефон: {selectedClient.phone}</div>
                <div>Организация: {selectedClient.organization}</div>
                <div>Тип работы: {selectedClient.type_work}</div>
                <div>Срок работы: {selectedClient.duration}</div>
            </div>
            <h3 className="text-lg font-semibold mt-4">Дополнительная информация</h3>
            <div class="grid grid-cols-3 gap-2 mt-4">
                <div>Цена за услугу: {selectedClient.name}</div>
                <div>Услуги: {selectedClient.phone}</div>
                <div>Адрес: {selectedClient.organization}</div>
            </div>
            <h3 className="text-lg font-semibold mt-4">Документы</h3>
            <div class="grid grid-cols-3 gap-2 mt-4">
                <button onClick={wordExport} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Сформировать документы
                </button>
                <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href={`http://localhost:8000/document/${selectedClient.path_doc}`} download={`${selectedClient.name_doc}`}>
                        Скачать
                </a>
                <button onClick={delClient}  className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Удалить
                </button>
            </div>
          </div>
        </div>
      )}
</div>
    )
}

export default ClientsWorksTable;