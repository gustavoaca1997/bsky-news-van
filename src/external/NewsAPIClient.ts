import axios, { AxiosInstance, AxiosResponse } from 'axios';

class NewsAPIClient {
    private client: AxiosInstance;
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://newsapi.org/v2';
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async getNews(query: string, from: string, sortBy: string, language: string, searchIn: string, excludeDomains: string): Promise<AxiosResponse<any>> {
        console.log(`Requesting last 5 articles about ${query} from ${from} sorted by ${sortBy} in ${language} language with search in ${searchIn}.`);
        const response = await this.client.get('/everything', {
            params: {
                apiKey: this.apiKey,
                q: query,
                from: from,
                sortBy: sortBy,
                language: language,
                searchIn: searchIn,
                excludeDomains: excludeDomains,
                pageSize: 5,
            },
        });
        console.log(`${response.data.articles.length} articles found.`);
        return response;
    }

    public async getVancouverNews(): Promise<AxiosResponse<any>> {
        // Create a date object using Date constructor
        let dateObj = new Date();

        // Get the current time in milliseconds
        let currentTime = dateObj.getTime();

        // Subtract one day in milliseconds (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        let yesterdayTime = currentTime - (24 * 60 * 60 * 1000)*2;

        // Set the time back to the date object
        dateObj.setTime(yesterdayTime);

        return this.getNews('vancouver OR "British Columbia"', `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`, 'popularity', 'en', 'title,description', "financialpost.com")
    }
}

export default NewsAPIClient;