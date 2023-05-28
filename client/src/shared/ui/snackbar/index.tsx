import { useState, useEffect } from "react";

const Snackbar = () => {
	const [displayed, setDisplayed] = useState(false);

	useEffect(() => {
		setDisplayed(true);
	}, []);

	useEffect(() => {
		// const timeout = setTimeout(() => {
		// 	setDisplayed(false);
		// }, 4000);

		// return () => {
		// 	clearTimeout(timeout);
		// };
	});

	if (displayed) {
		return <div>Test</div>;
	}

	return null;
};

export default Snackbar;
