const getEnvironmentVariable = (key: string) => {
	if (process.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`);
	}
	return process.env[key] || "";
};

export const API_URL = getEnvironmentVariable("REACT_APP_API_URL");
