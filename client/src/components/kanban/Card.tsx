import { Card as CardType, Priority } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Check } from "lucide-react";
import { useDrag } from "@use-gesture/react";
import { format } from "date-fns";
import { useState } from "react";

interface KanbanCardProps {
	card: CardType;
	columnId: string;
	onClick: () => void;
	onDragStart: (columnId: string, cardId: string) => void;
	onDragEnd: (toColumnId: string) => void;
}

export function KanbanCard({
	card,
	columnId,
	onClick,
	onDragStart,
	onDragEnd,
}: KanbanCardProps) {
	const [isDragging, setIsDragging] = useState(false);

	// Function to get priority color
	const getPriorityColor = (priority: Priority) => {
		switch (priority) {
			case Priority.HIGH:
				return "bg-red-100 text-red-700";
			case Priority.MEDIUM:
				return "bg-amber-100 text-amber-700";
			case Priority.LOW:
				return "bg-green-100 text-green-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	// Function to get priority icon
	const getPriorityIcon = (priority: Priority) => {
		switch (priority) {
			case Priority.HIGH:
				return <AlertTriangle className="h-3 w-3" />;
			case Priority.MEDIUM:
				return <Clock className="h-3 w-3" />;
			case Priority.LOW:
				return <Check className="h-3 w-3" />;
			default:
				return null;
		}
	};

	// Bind drag handlers with improved event handling
	const bind = useDrag(
		({ down, last, event, first, xy }) => {
			// Always prevent default browser behavior when dragging starts
			if (event && "preventDefault" in event) {
				event.preventDefault();
				event.stopPropagation();
			}

			// Start dragging - only trigger once when drag starts
			if (first && down) {
				setIsDragging(true);
				onDragStart(columnId, card.id);

				// Apply a user-select: none to body to prevent text selection during drag
				document.body.style.userSelect = "none";
			}

			// End dragging
			if (last) {
				setIsDragging(false);

				// Reset user selection styles
				document.body.style.userSelect = "";

				// Detect which column we're over
				const elements = document.elementsFromPoint(xy[0], xy[1]);
				const columnElement = elements.find((el) =>
					el.classList.contains("kanban-column")
				);

				if (columnElement) {
					const toColumnId =
						columnElement.getAttribute("data-column-id");
					if (toColumnId && toColumnId !== columnId) {
						onDragEnd(toColumnId);
					}
				}
			}
		},
		{
			filterTaps: true,
			threshold: 5,
			axis: "x", // Only allow horizontal dragging to make it more predictable
		}
	);

	return (
		<Card
			className={`kanban-card shadow-sm cursor-grab select-none mb-3 group transition-all duration-200 
        ${
			isDragging
				? "opacity-70 scale-105 rotate-1 shadow-md z-10 cursor-grabbing"
				: "opacity-100 scale-100 rotate-0"
		}`}
			{...bind()}
			onClick={(e) => {
				// Only trigger click when not dragging
				if (!isDragging) {
					e.stopPropagation();
					onClick();
				}
			}}
			draggable="false" // Disable HTML5 drag to prevent conflicts
		>
			<CardContent className="p-3">
				<div className="space-y-2">
					<div className="flex justify-between items-start gap-2">
						<h3 className="font-medium text-sm line-clamp-2">
							{card.title}
						</h3>
					</div>

					{card.description && (
						<p className="text-xs text-muted-foreground line-clamp-2">
							{card.description}
						</p>
					)}

					<div className="flex justify-between pt-1">
						{card.dueDate && (
							<Badge
								variant="outline"
								className="text-xs flex gap-1 items-center">
								<Clock className="h-3 w-3" />
								{format(new Date(card.dueDate), "MMM d")}
							</Badge>
						)}

						<Badge
							className={`text-xs ml-auto flex gap-1 items-center ${getPriorityColor(
								card.priority
							)}`}>
							{getPriorityIcon(card.priority)}
							{card.priority}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
