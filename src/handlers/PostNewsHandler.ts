import { BskyAgent, RichText } from '@atproto/api';
import * as dotenv from 'dotenv';
import * as process from 'process';
import NewsAPIClient from '../external/NewsAPIClient';

dotenv.config();
// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
  })

async function PostToBsky() {
    const apiKey = process.env.NEWS_API_KEY;
    const newsClient = new NewsAPIClient(apiKey);
    var vancouverNewsResponse = await newsClient.getVancouverNews();
    
    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})

    for (const article of vancouverNewsResponse.data.articles) {
        const rt = new RichText({
           text: `📰${article.title}📰\n${article.url}`,
        }) 
        await rt.detectFacets(agent) // automatically detects mentions and links
        await agent.post({
            $type: 'app.bsky.feed.post',
            text: rt.text,
            facets: rt.facets,
            createdAt: new Date().toISOString(),
            embed: {
                $type: 'app.bsky.embed.external',
                external: {
                    uri: article.url,
                    title: article.title,
                    description: article.description,
                }
            }
          });
        console.log(`Posted article: ${article.title}`);
    }
    console.log('Finished posting articles');
}

export default PostToBsky;

PostToBsky()