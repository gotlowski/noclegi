import axios from "axios";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: 'AIzaSyAw1UH8wc6Yr7EDcRVkXyZZq2ruiDLAi8E'
    }
});

export default instance;