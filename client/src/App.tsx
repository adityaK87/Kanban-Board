import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />}></Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
