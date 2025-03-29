import { useState, useEffect } from "react";
import { useBoard } from "@/contexts/BoardContext";
import { Card, Priority } from "@/lib/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Calendar as CalendarIcon,
	Check,
	Clock,
	Trash2,
	X,
} from "lucide-react";
import { format } from "date-fns";

interface CardDialogProps {
	isOpen: boolean;
	onClose: () => void;
	card?: Card;
	columnId: string;
	mode: "create" | "edit";
}

export function CardDialog({
	isOpen,
	onClose,
	card,
	columnId,
	mode,
}: CardDialogProps) {
	const { addCard, updateCard, deleteCard } = useBoard();

	const [formData, setFormData] = useState<{
		title: string;
		description: string;
		priority: Priority;
		dueDate?: Date;
	}>({
		title: "",
		description: "",
		priority: Priority.MEDIUM,
		dueDate: undefined,
	});

	const [calendarOpen, setCalendarOpen] = useState(false);

	// Initialize form with card data when editing
	useEffect(() => {
		if (mode === "edit" && card) {
			setFormData({
				title: card.title,
				description: card.description,
				priority: card.priority,
				dueDate: card.dueDate ? new Date(card.dueDate) : undefined,
			});
		} else {
			// Reset form for create mode
			setFormData({
				title: "",
				description: "",
				priority: Priority.MEDIUM,
				dueDate: undefined,
			});
		}
	}, [card, mode, isOpen]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (value: Priority) => {
		setFormData((prev) => ({ ...prev, priority: value }));
	};

	const handleDateChange = (date?: Date) => {
		setFormData((prev) => ({ ...prev, dueDate: date }));
		setCalendarOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (mode === "create") {
			addCard(columnId, formData);
		} else if (card) {
			updateCard(columnId, card.id, formData);
		}

		onClose();
	};

	const handleDelete = () => {
		if (mode === "edit" && card) {
			deleteCard(columnId, card.id);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent className="sm:max-w-lg glass-card shadow-lg">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>
							{mode === "create"
								? "Create New Task"
								: "Edit Task"}
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								name="title"
								placeholder="Task title"
								value={formData.title}
								onChange={handleInputChange}
								className="bg-background/50"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Task description"
								value={formData.description}
								onChange={handleInputChange}
								className="resize-none h-24 bg-background/50"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="priority">Priority</Label>
								<Select
									value={formData.priority}
									onValueChange={(value) =>
										handleSelectChange(value as Priority)
									}>
									<SelectTrigger
										id="priority"
										className="bg-background/50">
										<SelectValue placeholder="Select priority" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											value={Priority.LOW}
											className="flex items-center gap-2">
											<div className="flex items-center gap-2">
												<Check className="h-4 w-4 text-green-500" />
												<span>Low</span>
											</div>
										</SelectItem>
										<SelectItem
											value={Priority.MEDIUM}
											className="flex items-center gap-2">
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-amber-500" />
												<span>Medium</span>
											</div>
										</SelectItem>
										<SelectItem
											value={Priority.HIGH}
											className="flex items-center gap-2">
											<div className="flex items-center gap-2">
												<X className="h-4 w-4 text-red-500" />
												<span>High</span>
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="dueDate">Due Date</Label>
								<Popover
									open={calendarOpen}
									onOpenChange={setCalendarOpen}>
									<PopoverTrigger asChild>
										<Button
											id="dueDate"
											variant="outline"
											className="w-full justify-start text-left font-normal bg-background/50">
											<CalendarIcon className="mr-2 h-4 w-4" />
											{formData.dueDate ? (
												format(formData.dueDate, "PPP")
											) : (
												<span>Select date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start">
										<Calendar
											mode="single"
											selected={formData.dueDate}
											onSelect={handleDateChange}
											initialFocus
										/>
										{formData.dueDate && (
											<div className="p-2 border-t border-border flex justify-between">
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleDateChange(
															undefined
														)
													}>
													Clear
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														setCalendarOpen(false)
													}>
													Done
												</Button>
											</div>
										)}
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>

					<DialogFooter className="flex justify-between">
						{mode === "edit" && (
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={handleDelete}
								className="mr-auto">
								<Trash2 className="h-4 w-4 mr-2" />
								Delete
							</Button>
						)}
						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">
								{mode === "create"
									? "Create Task"
									: "Save Changes"}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
