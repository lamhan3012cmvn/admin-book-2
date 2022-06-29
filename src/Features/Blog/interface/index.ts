export interface IBlog {
	id: number;
	status: number;
	createdAt: string;
	postTexts: Array<{
		id: number;
		lang: number;
		title: string;
		content: string;
		slug: string;
		createdAt: string;
		updatedAt: string;
		status: number;
		postId: number;
	}>;
}
