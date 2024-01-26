import axios from "axios";
import { config } from "../config";

const getAll = () =>
  axios.get(`${config.API_URL}/loads`).then((response) => response.data);

export default { getAll };
