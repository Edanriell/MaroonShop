export type CustomMarkers = {
	markers: Array<{
		type: string;
		geometry: {
			type: string;
			coordinates: [number, number];
		};
		properties: {
			title: string;
			description: string;
		};
	}>;
};

export type MapProps = {
	coordinates?: [number, number];
};
