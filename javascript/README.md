<h1 align="center"><strong>Users CRUD</strong></h1>

### **Summary**

REST API developed with Node.js and Javascript, with User CRUD operations.

&nbsp;

## **Table of Contents**

1. [Features](#features)
1. [How to run](#how-to-run)
1. [How to debug](#how-to-debug)
1. [Dependencies](#dependencies)
1. [How to use](#how-to-use)
1. [Final Considerations](#final-considerations)
   1. [Mongoose Schema](#mongoose-schema)
   1. [Mongo ObjectIds](#mongo-objectids)

&nbsp;

## **Features**

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

### **Mongoose Schema**

Some points of attention about Mongoose schemas.

- It is recommended that an interface that represents the schema is always created. This helps in controlling variable typing with TypeScript.
- In queries like `find` or `findOne`, mongoose will take into account the configuration of the schema fields, if they have the `select: false` configuration.
- When the schema is transformed into a json object to be returned in the request response, one way to remove fields with sensitive information is by using the `toJSON` configuration.

&nbsp;

### **Mongo ObjectIds**

When inserting a new document into the database, MongoDB creates an \_id property. This property is an ObjectId, typically represented by a string of 24 hexadecimal characters.

When querying users by ID, it is important to remember that a valid ID must have this same structure, otherwise MongoDB will throw a CastError, typically with the message: Cast to ObjectId failed for value...
