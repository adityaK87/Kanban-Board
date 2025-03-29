import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Board, Card } from "@/lib/types";
import { toast } from "sonner";
import axios from "axios";
import fetchData from "@/lib/fetchData";
import { authHeaders } from "@/lib/authHeaders";

interface BoardContextType {
	board: Board;
	addColumn: (title: string) => void;
	updateColumn: (columnId: string, title: string) => void;
	deleteColumn: (columnId: string) => void;
	addCard: (columnId: string, card: Omit<Card, "id" | "columnId">) => void;
	updateCard: (
		columnId: string,
		cardId: string,
		card: Partial<Omit<Card, "id">>
	) => void;
	deleteCard: (columnId: string, cardId: string) => void;
	moveCard: (
		fromColumnId: string,
		toColumnId: string,
		cardId: string
	) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
	const [board, setBoard] = useState<Board>({
		columns: [],
	});

	const addColumn = async (title: string) => {
		const res = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/columns`,
			{
				title,
			},
			authHeaders
		);

		const { newColumn } = res.data;

		setBoard((prev) => ({
			...prev,
			columns: [...prev.columns, newColumn],
		}));
		toast.success("Column added");
	};

	const updateColumn = async (columnId: string, title: string) => {
		await axios.put(
			`${import.meta.env.VITE_BACKEND_URL}/columns/${columnId}`,
			{ title },
			authHeaders
		);
		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === columnId ? { ...col, title } : col
			),
		}));
		toast.success("Column updated");
	};

	const deleteColumn = async (columnId: string) => {
		const { data } = await axios.delete(
			`${import.meta.env.VITE_BACKEND_URL}/columns/${columnId}`,
			authHeaders
		);
		setBoard((prev) => ({
			...prev,
			columns: prev.columns.filter(
				(col) => col.id !== data.deleteColumnId
			),
		}));
		toast.success("Column deleted");
	};

	useEffect(() => {
		fetchData(`${import.meta.env.VITE_BACKEND_URL}/columns`).then(
			(data) => {
				setBoard({
					columns: data?.columns,
				});
			}
		);
	}, []);

	const addCard = async (
		columnId: string,
		card: Omit<Card, "id" | "columnId">
	) => {
		const { data } = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/${columnId}/cards`,
			{
				...card,
			},
			authHeaders
		);

		const newCard: Card = data.newCard;

		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === columnId
					? { ...col, cards: [...col.cards, newCard] }
					: col
			),
		}));

		toast.success("Card added");
	};

	const updateCard = async (
		columnId: string,
		cardId: string,
		card: Partial<Omit<Card, "id">>
	) => {
		const { data } = await axios.put(
			`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}`,
			{
				...card,
			},
			authHeaders
		);

		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === columnId
					? {
							...col,
							cards: col.cards.map((c) =>
								c.id === cardId ? { ...c, ...data.card } : c
							),
					  }
					: col
			),
		}));
		toast.success("Card updated");
	};

	const deleteCard = async (columnId: string, cardId: string) => {
		await axios.delete(
			`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}`,
			authHeaders
		);
		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === columnId
					? {
							...col,
							cards: col.cards.filter((c) => c.id !== cardId),
					  }
					: col
			),
		}));
		toast.success("Card deleted");
	};

	const moveCard = async (
		fromColumnId: string,
		toColumnId: string,
		cardId: string
	) => {
		// Find the card in the source column
		const fromColumn = board.columns.find((col) => col.id === fromColumnId);
		if (!fromColumn) return;

		const card = fromColumn.cards.find((c) => c.id === cardId);
		if (!card) return;

		// Remove card from source column
		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === fromColumnId
					? {
							...col,
							cards: col.cards.filter((c) => c.id !== cardId),
					  }
					: col
			),
		}));

		await axios.patch(
			`${import.meta.env.VITE_BACKEND_URL}/${cardId}/${toColumnId}/move`,
			undefined,
			authHeaders
		);

		// Add card to target column
		setBoard((prev) => ({
			...prev,
			columns: prev.columns.map((col) =>
				col.id === toColumnId
					? {
							...col,
							cards: [
								...col.cards,
								{ ...card, updatedAt: new Date() },
							],
					  }
					: col
			),
		}));
	};

	return (
		<BoardContext.Provider
			value={{
				board,
				addColumn,
				updateColumn,
				deleteColumn,
				addCard,
				updateCard,
				deleteCard,
				moveCard,
			}}>
			{children}
		</BoardContext.Provider>
	);
}

export const useBoard = () => {
	const context = useContext(BoardContext);
	if (context === undefined) {
		throw new Error("useBoard must be used within a BoardProvider");
	}
	return context;
};
