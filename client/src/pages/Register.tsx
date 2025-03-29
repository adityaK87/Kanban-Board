import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { Header } from "@/components/layout/Header";

const Register = () => {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !isLoading) {
			navigate("/dashboard");
		}
	}, [user, isLoading, navigate]);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 flex items-center justify-center p-4 mt-16">
				<div className="w-full max-w-md">
					<AuthForm type="register" />
				</div>
			</main>
		</div>
	);
};

export default Register;
