import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { CustomMarkers } from "./types";

import { ReactComponent as MapMarker } from "./assets/map-marker.svg";
import mapSm from "./assets/map-sm.jpg";
import mapMd from "./assets/map-md.jpg";
import mapLg from "./assets/map-lg.jpg";

import "./styles.scss";

const customMarkers: CustomMarkers = {
	markers: [
		{
			type: "Marker",
			geometry: {
				type: "Point",
				coordinates: [18.06324, 59.334591],
			},
			properties: {
				title: "Maroon",
				description: "Shop",
			},
		},
	],
};

const Map = () => {
	const mapContainer = useRef(null);

	const mapApiKey = process.env.REACT_APP_MAP_API_KEY ?? "";
	mapboxgl.accessToken = mapApiKey;

	useEffect(() => {
		if (!mapContainer.current) return;

		if (mapApiKey !== "") {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/light-v11",
				center: [18.06324, 59.334591],
				zoom: 6,
			});

			for (const marker of customMarkers.markers) {
				const markerElement = document.createElement("div");
				markerElement.classList.add("map-marker");

				new mapboxgl.Marker(markerElement)
					.setLngLat(marker.geometry.coordinates)
					.addTo(map);

				new mapboxgl.Marker(markerElement)
					.setLngLat(marker.geometry.coordinates)
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setHTML(
							`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`,
						),
					)
					.addTo(map);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (mapApiKey === "") {
		return (
			<div className={"md:ml-[-34.5rem] lg:ml-[-9.2rem] relative"}>
				<div className={"relative blur-sm"}>
					<picture className={"md:ml-[-34.5rem] lg:ml-[-9.2rem] block"}>
						<source media="(min-width:1366px)" srcSet={mapLg} />
						<source media="(min-width:768px)" srcSet={mapMd} />
						<source media="(min-width:320px)" srcSet={mapSm} />
						<img
							src={mapLg}
							alt="map"
							className={
								"object-cover w-full h-[28.1rem] md:w-[36.9rem] " +
								"md:h-[37.4rem] lg:w-[67rem] lg:h-[42.2rem]"
							}
						/>
					</picture>
					<MapMarker
						className={
							"w-[1.6rem] h-[2.2rem] absolute top-[8rem] left-[44vw] " +
							"text-blue-zodiac-950 md:top-[14rem] md:left-[-17rem] " +
							"lg:left-[17rem] lg:top-[16rem]"
						}
					/>
				</div>
				<p
					className={
						"flex flex-col items-center absolute lg:top-[50%] " +
						"lg:left-[50%] lg:translate-x-[-70%] lg:translate-y-[-50%] " +
						"top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center " +
						"md:mr-[-30rem] md:translate-x-[-120%]"
					}
				>
					<span
						className={
							"font-raleway font-bold text-blue-zodiac-950 text-sm-16px mb-[0.5rem]"
						}
					>
						Не удалось загрузить карту.
					</span>
					<span
						className={"font-raleway font-semibold text-blue-zodiac-950 text-sm-16px"}
					>
						Отсутствует API ключ.
					</span>
				</p>
			</div>
		);
	}

	return (
		<div className={"md:ml-[-34.5rem] lg:ml-[-18.4rem]"}>
			<div
				ref={mapContainer}
				className={
					"object-cover w-full h-[28.1rem] md:w-[36.9rem] " +
					"md:h-[37.4rem] lg:w-[67rem] lg:h-[42.2rem]"
				}
			></div>
		</div>
	);
};

export default Map;
