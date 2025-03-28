import { useState } from "react";
import { useBoard } from "@/contexts/BoardContext";
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

interface CreateColumnDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function CreateColumnDialog({
	isOpen,
	onClose,
}: CreateColumnDialogProps) {
	const { addColumn } = useBoard();
	const [title, setTitle] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (title.trim() !== "") {
			addColumn(title);
			setTitle("");
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent className="sm:max-w-md glass-card shadow-lg">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create New List</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="columnTitle">List Title</Label>
							<Input
								id="columnTitle"
								placeholder="Enter list title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="bg-background/50"
								autoFocus
								required
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Create List</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
