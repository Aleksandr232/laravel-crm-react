import React, {useState, useEffect} from 'react';

function SignYandex() {

    const [loginUrl, setLoginUrl] = useState(null);

useEffect(() => {
    fetch('http://localhost:8000/api/redirect-to-yandex-auth', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong!');
        })
        .then((data) => {
            setLoginUrl(data.url);
            console.log(data); // Выводим ответ в консоль
        })
        .catch((error) => console.error(error));
}, []);

    return (
        <div>
            {loginUrl != null && (
            <a
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded flex items-center"
                href={loginUrl}
            >
                
                Войти через Яндекс
            </a>
            )}
      </div>
    );
}

export default SignYandex;