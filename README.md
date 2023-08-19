# Node.js API Project with Nest.js

This repository contains the implementation of a Node.js API project using the Nest.js framework. The API provides endpoints for retrieving user data from a third-party API, allows filtering and pagination, and retrieves user details by ID.

## Getting Started

1. Clone this repository
2. npm install
3. npm run start
4. Access the Swagger documentation: Open your browser and navigate to http://localhost:3000/api.

## Endpoints

Get Users

```
- URL: `/api/users`
- Method: GET
- Description: Retrieve a list of users.
- Query Parameters:
  - `createdFrom`: Filter users created from this date.
  - `createdTo`: Filter users created up to this date.
  - `jobType`: Filter users by job type.
  - `page`: Page number for pagination (optional, default: 1).
  - `pageSize`: Number of users per page (optional, default: 10).

```

Get User Detail

```
- URL: `/api/users/user-detail/:id`
- Method: GET
- Description: Retrieve details of a specific user by ID.

```
