import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function GoogleCallback() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token); 
                    navigate('/home');
                } else {
                    throw new Error('Something went wrong!');
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    // ... (ваша оригинальная функция render) ...
}

export default GoogleCallback;

