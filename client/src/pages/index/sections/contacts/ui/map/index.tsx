import mapSm from "./assets/map-sm.jpg";
import mapMd from "./assets/map-md.jpg";
import mapLg from "./assets/map-lg.jpg";

// TODO refactor to real map !
const Map = () => {
	return (
		<picture className="col-start-1 col-end-2 row-start-1 row-end-3">
			<source media="(min-width:1366px)" srcSet={mapLg} />
			<source media="(min-width:768px)" srcSet={mapMd} />
			<source media="(min-width:320px)" srcSet={mapSm} />
			<img
				src={mapLg}
				alt="map"
				className="object-cover w-full h-[28.1rem] md:w-[36.9rem] md:h-[37.4rem] lg:w-[67rem] lg:h-[42.2rem]"
			/>
		</picture>
	);
};

export default Map;