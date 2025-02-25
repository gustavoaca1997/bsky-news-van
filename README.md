# bsky-news-bot

bsky-news-bot is a bot designed to fetch and post news updates to the Bluesky social network.

## Features

- Fetches news from various sources
- Posts updates to Bluesky
- Customizable news sources and posting frequency

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gustavoaca1997/bsky-news-van.git
    ```
2. Navigate to the project directory:
    ```bash
    cd bsky-news-bot
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

1. Configure your news sources and Bluesky credentials in a `.env` file.
2. This bot is developed as an Azure Function in [this file](/src/functions/PostNews.ts). However, you could import the [handler](src/handlers/PostNewsHandler.ts) and invoke the `PostToBsky` function from whenever you want.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact the repository owner.
