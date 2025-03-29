import { Board } from "@/components/kanban/Board";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { BoardProvider } from "@/contexts/BoardContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !isLoading) {
			navigate("/dashboard");
		}
	}, [user, isLoading, navigate]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<BoardProvider>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-1 container py-6 mt-16">
					<Board />
				</main>
			</div>
		</BoardProvider>
	);
};

export default Dashboard;
