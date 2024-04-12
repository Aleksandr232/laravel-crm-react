import React,{useState, useEffect} from "react";
import axios from "axios";

const ClientsWorksTable=()=>{
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedClientInfo, setSelectedClientInfo] = useState(null);
    const [price_service, setPriceService] = useState('');
    const [name_service, setNameService] = useState('');
    const [address_service, setAddressService] = useState('');
    const [search, setSearch] = useState('');
    const [selectedClientAct, setSelectedClientAct] = useState(null);  
    const [service_act, setServiceAct] = useState('');
    const [count_act, setCountAct] = useState('');
    const [unit_act, setUnitAct] = useState('');
    const [price_act, setPriceAct] = useState('');
    const [sum_act, setSumAct] = useState('');
          

    const openModal = (clients) => {
        setSelectedClient(clients);
      };

      const openModalAct = (selectedClient) => {
        setSelectedClientAct(selectedClient)
      };  

      
     const openModalInfo=(selectedClient)=>{
      setSelectedClientInfo(selectedClient);
      
     }

     const closeModalInfo = () => {
      setSelectedClientInfo(null);
      
    };
    
      const closeModal = () => {
        setSelectedClient(null);
      };

      const closeModalAct = () => {
        setSelectedClientAct(null);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        const formData = new FormData();
        formData.append('price_service', price_service);
        formData.append('name_service', name_service);
        formData.append('address_service', address_service);
    
        axios.post(`http://localhost:8000/api/clients/info/${selectedClientInfo}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            
        })
        .catch((error) => {
            console.log(error);
        });
        closeModalInfo();
    };

    const handleSubmitAct = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      formData.append('service_act', service_act);
      formData.append('count_act', count_act);
      formData.append('unit_act', unit_act);
      formData.append('price_act', price_act);
      formData.append('sum_act', sum_act);
  
      axios.post(`http://localhost:8000/api/clients/act/${selectedClientAct}`, formData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then((response) => {
          console.log(response.data);
          
      })
      .catch((error) => {
          console.log(error);
      });
      closeModalAct();
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
        if(!search) {
          // Если поле поиска пустое, отображаем все данные
          setData(allData);
        } else {
          // Если в поиске есть значение, фильтруем данные и обновляем состояние
          const filteredData = allData.filter(client => client.name.toLowerCase().includes(search.toLowerCase()));
          setData(filteredData);
        }
      }, [search, allData]);
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:8000/api/clients/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setData(response.data);
          setAllData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      };

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
   
    
    const handleInputChange = (e) => {
      setSearch(e.target.value);
    };

    return(
        <div className="overflow-x-auto">
        <input className="search" placeholder="Введите клиента" value={search} onChange={handleInputChange} type="text" />
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
            <div className="flex items-end">
              <h3 className="text-lg font-semibold mt-4 grid">Дополнительная информация</h3>
              <svg onClick={()=>openModalInfo(selectedClient.id)}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 1 1 18 0Z" />
              </svg>
            </div>
            {selectedClient.price_service && selectedClient.name_service && selectedClient.address_service  ? (<div class="grid grid-cols-3 gap-2 mt-4">
                <div>Цена за услугу: {selectedClient.price_service} </div>
                <div>Услуги:{selectedClient.name_service} </div>
                <div>Адрес: {selectedClient.address_service} </div>
            </div>) : null}
            <h3 className="text-lg font-semibold mt-4">Документы</h3>
            <div class="grid grid-cols-3 gap-2 mt-4">
                <button onClick={wordExport} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Сформировать документы
                </button>
                <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href={`http://localhost:8000/document/${selectedClient.path_doc}`}>
                        Скачать
                </a>
                <button onClick={delClient}  className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Удалить
                </button>
            </div>
            <div className="flex items-end">
              <h3 className="text-lg font-semibold mt-4 grid">Акты</h3>
              <svg onClick={()=>openModalAct(selectedClient.id)}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 1 1 18 0Z" />
              </svg>
            </div>
            {
              (<div>
                <a href={`http://localhost:8000/document/${selectedClient.path_act}`}>скачать</a>
              </div>)
            }
          </div>
        </div>
      )}
        

      {selectedClientInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div  className="mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={closeModalInfo}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
          </div>
          <h1 className="text-lg font-bold mb-4">Даполнить клиента</h1>
          <form onSubmit={handleSubmit}  className="space-y-4">
          
        <input
            type="text"
            value={price_service}
            onChange={(e)=>setPriceService(e.target.value)}
            placeholder="Сумма услуги"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        
        <input
            type="text"
            value={name_service}
            onChange={(e)=>setNameService(e.target.value)}
            placeholder="Названия услуги"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={address_service}
            onChange={(e)=>setAddressService(e.target.value)}
            placeholder="Адрес проведения работ"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
            Добавить
        </button>
        </form>
     </div>
     </div>
     )}
     {selectedClientAct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div  className="mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={closeModalAct}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
          </div>
          <h1 className="text-lg font-bold mb-4">Добавить акт</h1>
          <form onSubmit={handleSubmitAct}  className="space-y-4">
          
        <input
            type="text"
            value={service_act}
            onChange={(e)=>setServiceAct(e.target.value)}
            placeholder="Название работ, услуг"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        
        <input
            type="text"
            value={count_act}
            onChange={(e)=>setCountAct(e.target.value)}
            placeholder="Кол-во"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={unit_act}
            onChange={(e)=>setUnitAct(e.target.value)}
            placeholder="Ед.измерения"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={price_act}
            onChange={(e)=>setPriceAct(e.target.value)}
            placeholder="Цена"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
            type="text"
            value={sum_act}
            onChange={(e)=>setSumAct(e.target.value)}
            placeholder="Сумма"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
            Создать акт
        </button>
        </form>
     </div>
     </div>
     )}
</div>
    )
}

export default ClientsWorksTable;