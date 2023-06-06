import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { GalleryImage } from "./model";

const BASE_URL = "/gallery";

export const getGalleryImages = (): AxiosPromise<GalleryImage[]> => {
	return apiInstance.get(BASE_URL);
};
