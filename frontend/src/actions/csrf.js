import axios from 'axios';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'X-CSRFTOKEN': getCookie('csrftoken'),
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
