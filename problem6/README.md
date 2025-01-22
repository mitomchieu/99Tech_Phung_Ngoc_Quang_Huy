# API Service Module: Live Scoreboard

## Overview

This module is responsible for managing the live scoreboard on the website. It provides APIs to update, retrieve, and stream user scores, ensuring secure and real-time updates to the scoreboard.

## Features

1. **Real-time Score Updates:** The scoreboard displays the top 10 users' scores and updates automatically when changes occur.
2. **API Endpoint for Score Updates:** Allows users to update their scores by completing predefined actions.
3. **Security:** Ensures only authorized updates to scores are processed.

## API Endpoints

### 1. **Update User Score**

- **Endpoint:** `POST /api/v1/scores/update`
- **Description:** Updates the score of a user after completing an action.
- **Request Payload:**
  ```json
  {
    "userId": "<user-id>",
    "scoreIncrement": <integer>,
    "authToken": "<authentication-token>"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Score updated successfully",
    "currentScore": <integer>
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: If the `authToken` is invalid.
  - `400 Bad Request`: If the payload is malformed or `scoreIncrement` is not valid.

### 2. **Retrieve Top Scores**

- **Endpoint:** `GET /api/v1/scores/top`
- **Description:** Retrieves the top 10 scores from the scoreboard.
- **Response:**
  ```json
  {
    "status": "success",
    "topScores": [
      {
        "userId": "<user-id>",
        "score": <integer>
      },
      ...
    ]
  }
  ```

### 3. **Stream Scoreboard Updates**

- **Endpoint:** `GET /api/v1/scores/stream`
- **Description:** Provides a server-sent events (SSE) stream for real-time scoreboard updates.
- **Response Stream Format:**
  ```json
  {
    "userId": "<user-id>",
    "score": <integer>,
    "rank": <integer>
  }
  ```

## Security

1. **Authentication:**

   - Every API call must include a valid `authToken` to ensure only authorized users can update their scores.
   - Use JWT (JSON Web Token) for authentication.
2. **Rate Limiting:**

   - Implement rate limiting to prevent spamming of the `POST /api/v1/scores/update` endpoint.
   - Example: Limit to 10 requests per minute per user.
3. **Validation:**

   - Validate `scoreIncrement` to ensure it is within an acceptable range (e.g., 1-100).
   - Use middleware to verify the structure of the request payload.
4. **Data Integrity:**

   - Store scores in a secure database with integrity checks.
   - Use transactions to prevent race conditions.

## Architecture Diagram

![Scoreboard Module Diagram](diagram_placeholder)

1. **Frontend:**

   - Sends API requests to update scores and fetch top scores.
   - Listens to SSE stream for real-time updates.
2. **Backend:**

   - Validates and processes incoming requests.
   - Publishes updates to the scoreboard stream.
   - Fetches and updates scores in the database.
3. **Database:**

   - Stores user scores securely.
   - Supports queries for top scores.

## Flow of Execution

1. **User Action:** A user completes an action.
2. **API Call:** The frontend sends a `POST /api/v1/scores/update` request with the user ID, score increment, and authentication token.
3. **Validation:**
   - Backend validates the `authToken`.
   - Ensures `scoreIncrement` is within the allowed range.
4. **Database Update:** Updates the user's score in the database.
5. **Notify Clients:**
   - Publishes the updated scores to the SSE stream.
   - Sends a response back to the frontend.
6. **Frontend Update:** Updates the live scoreboard using the received data.

## Implementation Notes

1. Use WebSocket as an alternative to SSE for bi-directional communication if required in the future.
2. Cache the top 10 scores to reduce database load for frequent queries.
3. Monitor and log suspicious activity to identify potential abuse.

## Future Improvements

- **Leaderboard Segmentation:** Support for multiple leaderboards based on categories or timeframes (e.g., daily, weekly).
- **User Notifications:** Notify users when they achieve a new high score or rank.
- **Admin Controls:** Allow admins to monitor and manage suspicious score changes.
