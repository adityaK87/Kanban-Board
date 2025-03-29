import { useState } from "react";
import { useBoard } from "@/contexts/BoardContext";
import { KanbanColumn } from "@/components/kanban/Column";
import { CreateColumnDialog } from "@/components/kanban/CreateColumnDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Board() {
	const { board, moveCard } = useBoard();
	const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
	const [, setDragInfo] = useState<{
		columnId: string;
		cardId: string;
	} | null>(null);

	const handleDragStart = (columnId: string, cardId: string) => {
		setDragInfo({ columnId, cardId });
	};

	const handleDragEnd = (
		fromColumnId: string,
		toColumnId: string,
		cardId: string
	) => {
		if (fromColumnId !== toColumnId) {
			moveCard(fromColumnId, toColumnId, cardId);
		}
		setDragInfo(null);
	};

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold">My Kanban Board</h2>
				<Button onClick={() => setIsAddColumnDialogOpen(true)}>
					<Plus className="h-4 w-4 mr-2" /> Add List
				</Button>
			</div>

			<div className="flex flex-1 flex-wrap overflow-x-auto pb-4 -mb-4 gap-4">
				{board?.columns?.map((column) => (
					<KanbanColumn
						key={column.id}
						column={column}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					/>
				))}

				<Button
					variant="outline"
					className="min-w-[280px] h-[60px] rounded-lg border-dashed opacity-60 hover:opacity-100 transition-opacity"
					onClick={() => setIsAddColumnDialogOpen(true)}>
					<Plus className="h-5 w-5 mr-2" /> Add List
				</Button>
			</div>

			<CreateColumnDialog
				isOpen={isAddColumnDialogOpen}
				onClose={() => setIsAddColumnDialogOpen(false)}
			/>
		</div>
	);
}
