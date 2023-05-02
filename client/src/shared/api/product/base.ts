import axios from "axios";
import { API_URL } from "../../config";

// TODO Think about axios.create and how we can replace it.
export const apiInstance = axios.create({
	baseURL: API_URL,
});
