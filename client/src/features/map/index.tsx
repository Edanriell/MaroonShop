import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import mapSm from "./assets/map-sm.jpg";
// import mapMd from "./assets/map-md.jpg";
// import mapLg from "./assets/map-lg.jpg";

const Map = () => {
	mapboxgl.accessToken =
		"";

	const [mapLoading, setMapLoading] = useState(true);
	const [reload, setReload] = useState();
	const mapContainer = useRef(null);

	useEffect(() => {
		if (!mapContainer.current) return;
		new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/satellite-streets-v12",
			center: [12.567898, 55.67583],
			zoom: 9,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (mapLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={"md:ml-[-34.5rem] lg:ml-[-18.4rem]"}>
			<div
				ref={mapContainer}
				className={
					"object-cover w-full h-[28.1rem] md:w-[36.9rem] " +
					"md:h-[37.4rem] lg:w-[67rem] lg:h-[42.2rem]"
				}
			/>
		</div>
	);

	// <picture className={"md:ml-[-34.5rem] lg:ml-[-18.4rem]"}>
	// 	<source media="(min-width:1366px)" srcSet={mapLg} />
	// 	<source media="(min-width:768px)" srcSet={mapMd} />
	// 	<source media="(min-width:320px)" srcSet={mapSm} />
	// 	<img
	// 		src={mapLg}
	// 		alt="map"
	// className={
	// 	"object-cover w-full h-[28.1rem] md:w-[36.9rem] " +
	// 	"md:h-[37.4rem] lg:w-[67rem] lg:h-[42.2rem]"
	// }
	// 	/>
	// </picture>
};

export default Map;
