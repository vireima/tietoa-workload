import axios from "axios";

// const baseUrl = "http://tietoa.up.railway.app";
const baseUrl = "http://localhost:8000/loads/";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

export default { getAll };
