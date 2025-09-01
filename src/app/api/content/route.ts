import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/config';
import { Post, CreatePostRequest, PostsResponse, ApiResponse } from '@/types/post';

// GET /api/content - Retrieve posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get posts with pagination
    const result = await db.query(
      'SELECT id, title, body, created_at, updated_at FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    // Get total count
    const countResult = await db.query('SELECT COUNT(*) FROM posts');
    const total = parseInt(countResult.rows[0].count);

    const response: ApiResponse<PostsResponse> = {
      success: true,
      data: {
        posts: result.rows,
        count: total
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch posts'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/content - Create new post
export async function POST(request: NextRequest) {
  try {
    const body: CreatePostRequest = await request.json();
    
    if (!body.title || !body.body) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Title and body are required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Insert new post
    const result = await db.query(
      'INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING id, title, body, created_at, updated_at',
      [body.title, body.body]
    );

    const newPost: Post = result.rows[0];
    
    const response: ApiResponse<Post> = {
      success: true,
      data: newPost
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create post'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
