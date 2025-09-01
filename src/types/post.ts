export interface Post {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePostRequest {
  title: string;
  body: string;
}

export interface PostsResponse {
  posts: Post[];
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
