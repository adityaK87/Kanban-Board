import { User } from "@/lib/types";
import axios from "axios";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { toast } from "sonner";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/signin`,
				{
					email,
					password,
				}
			);

			localStorage.setItem("token", res.data?.token);
			localStorage.setItem("user", JSON.stringify(res.data?.user));
			toast.success("Login successful");
		} catch (error) {
			toast.error("Failed to login");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (name: string, email: string, password: string) => {
		setIsLoading(true);
		try {
			await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
				name,
				email,
				password,
			});
			toast("Registration successful");
		} catch (error) {
			toast.error("Failed to register");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		toast.success("Logged out successfully");
	};

	return (
		<AuthContext.Provider
			value={{ user, isLoading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
