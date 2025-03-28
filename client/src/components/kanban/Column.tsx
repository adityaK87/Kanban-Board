import { useState } from "react";
import { useBoard } from "@/contexts/BoardContext";
import { Column, Card } from "@/lib/types";
import { KanbanCard } from "./Card";
import { CardDialog } from "./CardDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KanbanColumnProps {
	column: Column;
	onDragStart: (columnId: string, cardId: string) => void;
	onDragEnd: (
		fromColumnId: string,
		toColumnId: string,
		cardId: string
	) => void;
}

export function KanbanColumn({
	column,
	onDragStart,
	onDragEnd,
}: KanbanColumnProps) {
	const { updateColumn, deleteColumn } = useBoard();

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(column.title);
	const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [cardDialogMode, setCardDialogMode] = useState<"create" | "edit">(
		"create"
	);
	const [isDropTarget, setIsDropTarget] = useState(false);

	const handleTitleSave = () => {
		if (title.trim() !== "") {
			updateColumn(column.id, title);
			setIsEditing(false);
		}
	};

	const handleCardClick = (card: Card) => {
		setSelectedCard(card);
		setCardDialogMode("edit");
		setIsCardDialogOpen(true);
	};

	const handleAddCard = () => {
		setSelectedCard(null);
		setCardDialogMode("create");
		setIsCardDialogOpen(true);
	};

	const handleDragEnd = (toColumnId: string) => {
		// Make sure we have a card selected before attempting to move it
		if (selectedCard) {
			onDragEnd(column.id, toColumnId, selectedCard.id);
		}
		setSelectedCard(null);
		setIsDropTarget(false);
	};

	// Listen for dragover events to highlight drop targets
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDropTarget(true);
	};

	const handleDragLeave = () => {
		setIsDropTarget(false);
	};

	return (
		<div
			className={`kanban-column flex flex-col min-w-[280px] max-w-[280px] h-full bg-kanban-column 
                rounded-lg p-3 glass-panel animate-fade-in transition-all duration-200
                ${
					isDropTarget
						? "ring-2 ring-primary ring-opacity-60 shadow-lg scale-[1.01]"
						: ""
				}`}
			data-column-id={column.id}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={() => setIsDropTarget(false)}>
			<div className="flex items-center justify-between mb-3">
				{isEditing ? (
					<div className="flex w-full gap-1">
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="h-7 text-sm bg-background"
							onKeyDown={(e) =>
								e.key === "Enter" && handleTitleSave()
							}
							autoFocus
						/>
						<Button
							size="sm"
							variant="ghost"
							className="h-7 px-2"
							onClick={() => setIsEditing(false)}>
							<X className="h-4 w-4" />
						</Button>
					</div>
				) : (
					<>
						<h3 className="font-medium text-sm uppercase tracking-wider">
							{column.title}{" "}
							<span className="text-muted-foreground ml-1">
								({column.cards.length})
							</span>
						</h3>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-7 w-7 p-0">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => setIsEditing(true)}>
									Rename
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive"
									onClick={() => deleteColumn(column.id)}>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				)}
			</div>

			<div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 -mr-1 scrollbar-thin">
				{column.cards.map((card) => (
					<KanbanCard
						key={card.id}
						card={card}
						columnId={column.id}
						onClick={() => handleCardClick(card)}
						onDragStart={(columnId, cardId) => {
							// When a card starts dragging, save its reference
							setSelectedCard(card);
							onDragStart(columnId, cardId);
						}}
						onDragEnd={handleDragEnd}
					/>
				))}
			</div>

			<Button
				variant="ghost"
				className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground"
				onClick={handleAddCard}>
				<Plus className="h-4 w-4 mr-2" /> Add a card
			</Button>

			<CardDialog
				isOpen={isCardDialogOpen}
				onClose={() => setIsCardDialogOpen(false)}
				card={selectedCard ?? undefined}
				columnId={column.id}
				mode={cardDialogMode}
			/>
		</div>
	);
}
