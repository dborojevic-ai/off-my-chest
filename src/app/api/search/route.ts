import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database/config';
import { PostsResponse, ApiResponse } from '@/types/post';

// GET /api/search - Search posts by title or content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!query) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Search query is required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Search in title and body using ILIKE for case-insensitive search
    const searchTerm = `%${query}%`;
    const result = await db.query(
      'SELECT id, title, body, created_at, updated_at FROM posts WHERE title ILIKE $1 OR body ILIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [searchTerm, limit, offset]
    );

    // Get total count for the search
    const countResult = await db.query(
      'SELECT COUNT(*) FROM posts WHERE title ILIKE $1 OR body ILIKE $1',
      [searchTerm]
    );
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
    console.error('Error searching posts:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to search posts'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
