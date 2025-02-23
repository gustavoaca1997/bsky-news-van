import { app, InvocationContext, Timer } from "@azure/functions";
import PostToBsky from '../handlers/PostNewsHandler';

export async function PostNews(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Timer function processed request.');
    PostToBsky()
}

app.timer('PostNews', {
    // {second} {minute} {hour} {day} {month} {day-of-week}
    schedule: '0 0 0 * * *',
    handler: PostNews
});
