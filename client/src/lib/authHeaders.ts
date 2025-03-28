export const authHeaders: {
	headers: {
		Authorization: string;
	};
} = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
};
