<h1 align="center"><strong>Users CRUD</strong></h1>

### Summary

REST API developed with Node.js and Javascript, with User CRUD operations.

&nbsp;

### Table of Contents

1. [Features](#features)
1. [How to run](#how-to-run)
1. [How to debug](#how-to-debug)
1. [Dependencies](#dependencies)
1. [Final Considerations](#final-considerations)
   1. [Endpoints](#endpoints)
      1. [Signup](#signup)
      1. [Login](#login)
      1. [Users CRUD](#users-crud)
   1. [DTO](#dto)
   1. [Mongo ObjectIds](#mongo-objectids)

&nbsp;

### Features

- MongoDB
- Mongoose
- Authentication and authorization with [JWT](https://www.npmjs.com/package/jsonwebtoken)
- Payload validation with [JOI](https://www.npmjs.com/package/joi)
- eslint
- prettier

&nbsp;

## **How to run**

Install npm packages

```
npm install
```

Run application

```
npm start
```

&nbsp;

## **How to debug**

It is recommended to use the native Javascript Debug Terminal of the VSCode editor

```
npm start
```

&nbsp;

## **Dependencies**

- Node >= 22.13.0

&nbsp;

## **How to use**

This is a REST API designed to work on the backend, controlling user interactions with the database. To use the API, use the postman collection available in /resources.

&nbsp;

## **Final Considerations**

Here we will detail some points of attention that influenced the development of this project.

### Endpoints

Since no Swagger documentation has been created, here is a brief description of how the endpoints implemented in this API work.

#### Signup

`/api/v1/auth/signup`

Endpoint that simulates the registration of new users in the system. It is open to any user, but limited to the creation of users with the 'user' role.

#### Login

`/api/v1/auth/login`

Endpoint intended for performing authentication and obtaining the Bearer token.

#### Users CRUD

`/api/v1/users/*`

Endpoints intended for managing user registration, with some endpoints protected by authentication based on the user's role (admin, user).

&nbsp;

### DTO

DTO's (or Data Transfer Object) were used to format the response to requests, selecting the fields to be displayed to the user.

&nbsp;

### Mongo ObjectIds

When inserting a new document into the database, MongoDB creates an \_id property. This property is an ObjectId, typically represented by a string of 24 hexadecimal characters.

When querying users by ID, it is important to remember that a valid ID must have this same structure, otherwise MongoDB will throw a CastError, typically with the message: Cast to ObjectId failed for value...
