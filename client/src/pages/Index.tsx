import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";

const Index = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="flex-1 flex flex-col">
				{/* Hero Section */}
				<section className="container flex flex-col items-center justify-center text-center py-20 mt-16">
					<div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
						<span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
							SIMPLE AND ELEGANT TASK MANAGEMENT
						</span>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
							Organize your work with TaskFlow
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							A beautiful, minimalist Kanban board inspired by the
							design principles of simplicity and attention to
							detail.
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							{user ? (
								<Button
									size="lg"
									className="text-md"
									onClick={() => navigate("/dashboard")}>
									Go to Dashboard
								</Button>
							) : (
								<>
									<Button
										size="lg"
										className="text-md"
										onClick={() => navigate("/register")}>
										Get Started
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="text-md"
										onClick={() => navigate("/login")}>
										Sign In
									</Button>
								</>
							)}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="container py-20 space-y-16">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-bold">
							Designed for Productivity
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Experience a thoughtfully crafted interface that
							helps you focus on what matters.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-xl space-y-4 hover:shadow-md transition-shadow">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M21 14L14 21M10 3H5V8M19 10V5M5 16L12 9L19 16"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-medium">Drag & Drop</h3>
							<p className="text-muted-foreground">
								Move tasks between columns with a smooth
								drag-and-drop interface.
							</p>
						</div>

						<div className="glass-card p-6 rounded-xl space-y-4 hover:shadow-md transition-shadow">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-medium">Due Dates</h3>
							<p className="text-muted-foreground">
								Set deadlines and track progress with intuitive
								date selection.
							</p>
						</div>

						<div className="glass-card p-6 rounded-xl space-y-4 hover:shadow-md transition-shadow">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-medium">
								Task Priority
							</h3>
							<p className="text-muted-foreground">
								Prioritize your tasks with visual indicators for
								importance.
							</p>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="container py-16">
					<div className="glass-panel rounded-xl p-8 md:p-12 flex flex-col items-center text-center space-y-6">
						<h2 className="text-3xl font-bold">
							Ready to get organized?
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Start using TaskFlow today and transform the way you
							manage your tasks.
						</p>
						<Button
							size="lg"
							onClick={() =>
								user
									? navigate("/dashboard")
									: navigate("/register")
							}>
							{user ? "Go to Dashboard" : "Get Started for Free"}
						</Button>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t py-6">
				<div className="container flex flex-col md:flex-row items-center justify-between">
					<div className="text-sm text-muted-foreground">
						© 2023 TaskFlow. All rights reserved.
					</div>
					<nav className="flex gap-4 mt-4 md:mt-0">
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Privacy
						</a>
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Terms
						</a>
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Contact
						</a>
					</nav>
				</div>
			</footer>
		</div>
	);
};

export default Index;
