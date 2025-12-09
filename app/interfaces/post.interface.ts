export interface IPost {
	id: number;
	title: string;
	content: string;
	author_id: number;
	likes: number;
	dislikes: number;
	rating: number;
	published_at: string;
	updated_at: string;
}

export interface IGetPostsResponse {
	posts: IPost[] | null;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
}

export interface IEditPostBody {
	title: IPost['title'];
	content: IPost['content'];
}
