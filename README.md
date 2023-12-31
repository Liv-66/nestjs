# Node.js API Project with Nest.js

This repository contains the implementation of a Node.js API project using the Nest.js framework. The API provides endpoints for retrieving user data from a third-party API, allows filtering and pagination, and retrieves user details by ID.

## Getting Started

1. Clone this repository
2. npm install
3. npm run start
4. Access the Swagger documentation: Open your browser and navigate to http://localhost:3000/api.

## Unit Test

```
- src/: Contains the application's source code.
  - users/: Contains the users module.
    - users.controller.spec.ts: Unit tests for UsersController.
    - users.service.spec.ts: Unit tests for UsersService
    - mock-users-data.ts: Contains mock user data.
```

Run JEST test

```
npm run test
```

## Directory Structure

```
- src/: Contains the application's source code.
  - users/: Contains the users module.
    - user.interface.ts: Defines the User interface.
    - users.controller.ts: Implements the API endpoints.
    - users.service.ts: Implements the business logic.
    - mock-users-data.ts: Contains mock user data.
- main.ts: Bootstrap file for the Nest.js application.
- app.module.ts: Root module of the application.

```

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
