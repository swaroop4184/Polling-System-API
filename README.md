# Polling API

## Prerequisites

- Node.js installed
- MongoDB installed and running

## Clone the Project

1. **Clone the repository**

    ```bash
    git clone https://github.com/57saurabh/rohangarg_work.git
    cd project-folder
    ```

## Dependencies

The project relies on the following dependencies:

- [Express](https://www.npmjs.com/package/express) (v4.18.2) - Fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://www.npmjs.com/package/mongoose) (v8.0.3) - Elegant MongoDB object modeling for Node.js.
- [Cors](https://www.npmjs.com/package/cors) (v2.8.5) - CORS (Cross-Origin Resource Sharing) middleware for Express.
- [Dotenv](https://www.npmjs.com/package/dotenv) (v16.3.1) - Loads environment variables from a `.env` file into `process.env`.
- [Morgan](https://www.npmjs.com/package/morgan) (v1.10.0) - HTTP request logger middleware for Node.js.

## API Endpoints

- `POST /questions/create`: Create a new poll.
- `POST /questions/:id/options/create`: Add options to a specific poll.
- `DELETE /questions/:id/delete`: Delete a specific poll.
- `DELETE /options/:id/delete`: Delete a specific option.
- `POST /options/:id/add_vote`: Add a vote to a specific option.
- `GET /questions/:id`: View a poll and its options.

---
