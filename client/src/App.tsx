import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function App() {
	return (
		<AuthProvider>
			<Toaster />
			<Sonner position="top-right" />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
