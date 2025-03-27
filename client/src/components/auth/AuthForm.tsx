import React, { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AuthFormProps {
	type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
	const { login, register } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (type === "register") {
				if (formData.password !== formData.confirmPassword) {
					toast.error("Password do not match");
					return;
				}

				if (formData.password.length < 6) {
					toast.error("Password must be at least 6 characters");
					return;
				}
				await register(
					formData.name,
					formData.email,
					formData.password
				);
				navigate("/login");
			} else {
				await login(formData.email, formData.password);
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Auth error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="max-w-md w-full mx-auto animate-fade-in glass-card">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold">
					{type === "login" ? "Login" : "Create an account"}
				</CardTitle>
				<CardDescription>
					{type === "login"
						? "Enter your credentials to access your account"
						: "Fill in the details below to create your account"}
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					{type === "register" && (
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								placeholder="Your name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder={
								type === "register"
									? "Create a password"
									: "Enter your password"
							}
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					{type === "register" && (
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>
					)}
				</CardContent>

				<CardFooter className="flex flex-col space-y-4">
					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting}>
						{isSubmitting
							? "Loading..."
							: type === "login"
							? "Login"
							: "Create account"}
					</Button>

					<div className="text-center text-sm text-muted-foreground">
						{type === "login" ? (
							<>
								Don't have an account?{" "}
								<Button
									variant="link"
									className="p-0 text-primary"
									onClick={() => navigate("/register")}>
									Sign up
								</Button>
							</>
						) : (
							<>
								Already have an account?{" "}
								<Button
									variant="link"
									className="p-0 text-primary"
									onClick={() => navigate("/login")}>
									Login
								</Button>
							</>
						)}
					</div>
				</CardFooter>
			</form>
		</Card>
	);
}
