import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Use RSS2JSON API to fetch your Medium articles
        const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nagarjunmallesh`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch from RSS2JSON: ${response.status}`);
        }

        const data = await response.json();

        // Check if we have data in the expected format
        if (data.status === 'ok' && data.items && Array.isArray(data.items)) {
            return NextResponse.json(data.items);
        } else {
            console.error('Unexpected API response structure:', data);
            return NextResponse.json([]);
        }
    } catch (error: unknown) {
        console.error('API route error:', error);

        // Safe error handling with proper type checking
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}