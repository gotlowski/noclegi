import axios from "axios";

const instance = axios.create({
    baseUrl: 'https://noclegi-bbcdd-default-rtdb.europe-west1.firebasedatabase.app'
});

export default instance;