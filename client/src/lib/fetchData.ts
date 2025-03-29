import axios from "axios";
import { authHeaders } from "./authHeaders";

type UrlType = string;

const fetchData = async (url: UrlType) => {
	try {
		const { data } = await axios.get(url, authHeaders);
		return data;
	} catch (error) {
		throw new Error(
			`Error: ${error instanceof Error ? error.message : String(error)}`
		);
	}
};

export default fetchData;
