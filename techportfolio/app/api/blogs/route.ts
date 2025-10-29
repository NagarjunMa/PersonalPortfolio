import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Use rss2json API to bypass Medium's CORS and access restrictions
        const mediumUsername = process.env.MEDIUM_USERNAME || 'nagarjunmallesh'
        const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`

        // Using rss2json.com API (free tier allows 10,000 requests/day)
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`

        const res = await fetch(apiUrl, {
            next: { revalidate: 60 * 30 }, // Cache for 30 minutes
            headers: {
                'Accept': 'application/json',
            }
        })

        if (!res.ok) {
            return NextResponse.json({ error: `Failed to fetch feed: ${res.status}` }, { status: 502 })
        }

        const data = await res.json()

        // Check if the API returned an error
        if (data.status !== 'ok') {
            return NextResponse.json({ error: data.message || 'Failed to parse RSS feed' }, { status: 502 })
        }

        // Transform the data to match our expected format
        const items = data.items.map((item: {
            thumbnail?: string;
            description?: string;
            title?: string;
            link?: string;
            pubDate?: string;
            categories?: string[];
        }) => {
            // Extract thumbnail from content or use author's image
            let thumbnail = item.thumbnail || null

            // Try to extract first image from description/content if no thumbnail
            if (!thumbnail && item.description) {
                const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/i)
                if (imgMatch && imgMatch[1]) {
                    thumbnail = imgMatch[1]
                }
            }

            return {
                title: item.title || 'Untitled',
                link: item.link || '#',
                pubDate: item.pubDate || '',
                thumbnail: thumbnail,
                description: item.description || '',
                categories: item.categories || [],
            }
        })

        return NextResponse.json(items)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error fetching Medium posts:', err)
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}
