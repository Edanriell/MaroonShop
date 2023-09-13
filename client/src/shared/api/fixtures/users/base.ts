import axios from "axios";

import { API_URL } from "../../../config";

export const apiInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});
