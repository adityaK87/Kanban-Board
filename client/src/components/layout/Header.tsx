import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function Header() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b">
			<div className="container flex h-16 items-center justify-between px-12">
				<div className="flex items-center gap-6">
					<Link
						to="/"
						className="text-xl font-medium tracking-tight transition-colors hover:text-primary ">
						TaskFlow
					</Link>

					{user && (
						<nav className="hidden md:flex items-center gap-6">
							<Link
								to="/dashboard"
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
								Dashboard
							</Link>
						</nav>
					)}
				</div>

				<div className="flex items-center gap-2">
					{user ? (
						<>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleLogout}
								className="hidden md:flex">
								<LogOut className="h-5 w-5" />
								<span className="sr-only">Logout</span>
							</Button>
							<div className="flex items-center gap-4">
								<span className="text-sm font-medium hidden md:inline-block">
									{user.name}
								</span>
								<Button
									size="sm"
									onClick={handleLogout}
									variant="secondary"
									className="md:hidden">
									Logout
								</Button>
								<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
									{user.name.charAt(0).toUpperCase()}
								</div>
							</div>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								onClick={() => navigate("/login")}
								className="hidden md:inline-flex">
								Login
							</Button>
							<Button
								onClick={() => navigate("/register")}
								className="bg-[#4269b8]">
								Sign Up
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
