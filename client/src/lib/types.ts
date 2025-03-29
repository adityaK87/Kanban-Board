export interface User {
	id: string;
	email: string;
	name: string;
}

export enum Priority {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

export interface Card {
	id: string;
	title: string;
	description: string;
	dueDate?: Date;
	priority: Priority;
	columnId: string;
}

export interface Column {
	id: string;
	title: string;
	userId: string;
	cards: Card[];
}

export interface Board {
	columns: Column[];
}
