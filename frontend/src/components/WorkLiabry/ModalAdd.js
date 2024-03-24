import React, {useState} from "react";
import axios from "axios";

const ModalAdd=({ onClose })=>{
    const [data, setData] = useState([]);
    const [swork, setSwork] = useState("");
    const [endwork, setEndwork] = useState("");
    const [workType, setWorkType] = useState("");
    const [cperson, setCountPerson] = useState(0);
    const [file, setFile] = useState("");
    const [expenses, setExpenses] = useState(0);
    const [income, setIncome] = useState(0);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('start_work', swork);
        formData.append('end_work', endwork);
        formData.append('expenses', expenses);
        formData.append('count_person', cperson);
        formData.append('file', file);
        formData.append('income', income);
        formData.append('work_type', workType);
        
    
    
        axios.post("http://localhost:8000/api/work", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
            console.log(response.data);
            setData([response.data]);
           
            
        })
        .catch((error) => {
            alert('Информация не добавлена');
            console.log(error);
        });
            onClose();
        }; 

      const handleClose = () => {
        onClose();
      };
    

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
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
          <h1 className="text-2xl font-bold mb-4">Дневник работ</h1>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
            <div className=" w-full md:w-1/2 md:pr-2">
              <div className="mb-4">
                <label htmlFor="startDate" className="block font-semibold mb-1">Дата начала работы</label>
                <input
                  onChange={(e)=>setSwork(e.target.value)}
                  value={swork}
                  type="date"
                  id="startDate"
                  className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block font-semibold mb-1">Дата окончания работы</label>
                <input
                  value={endwork}
                  onChange={(e)=>setEndwork(e.target.value)}
                  type="date"
                  id="endDate"
                  className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-4">
              <label htmlFor="expenses" className="block font-semibold mb-1">Расходы объекта</label>
                <input
                  type="number"
                  id="expenses"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <div className="mb-4">
                <label htmlFor="numOfPeople" className="block font-semibold mb-1">Количество человек</label>
                <input
                  type="number"
                  id="numOfPeople"
                  value={cperson}
                  onChange={(e) => setCountPerson(e.target.value)}
                  className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="uniqueObjectPhoto" className="block font-semibold mb-1">Добавить фото объекта</label>
                <label htmlFor="uniqueObjectPhoto" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </label>
                <input type="file" id="uniqueObjectPhoto" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className='hidden' />
                </div>
              <div className="mb-4">
                <label htmlFor="income" className="block font-semibold mb-1">Доходы объекта</label>
                <input
                  type="number"
                  id="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div style={{position:"relative", width: "250px", left: "-210px"}} className="mb-4">
                <label htmlFor="workType"  className="block font-semibold mb-1">Виды работы</label>
                <select
                id="workType"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                >
                <option value="Выбрать вид работы">Выбрать вид работы</option>
                <option value="Уборка снега">Уборка снега</option>
                <option value="Монтаж">Монтаж</option>
                <option value="Демонтаж">Демонтаж</option>
                <option value="Мойка">Мойка</option>
                <option value="Фасадные работы">Фасадные работы</option>
                </select>
              </div>
              <button style={{position:"relative", width: "300px", left: "-157px"}}
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                    Добавить
                </button>
            </div>
            
          </form>
        </div>
      </div>
      
        
    )
}

export default ModalAdd;