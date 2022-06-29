export interface BlogModel {
	id: number;
	createdAt: string;
	status: number;
	postTexts: Array<BlogDetail>;
}


export interface BlogDetail{
  id: number;
  lang: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  postId: number;
}