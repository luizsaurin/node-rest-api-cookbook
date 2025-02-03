<h1 align="center"><strong>Users CRUD</strong></h1>

### **Summary**

REST API developed with Node.js and Typescript, with User CRUD operations.

&nbsp;

## **Table of Contents**

1. [Features](#features)
1. [How to run](#how-to-run)
1. [How to debug](#how-to-debug)
1. [Dependencies](#dependencies)
1. [How to use](#how-to-use)
1. [Final Considerations](#final-considerations)
   1. [Mongoose Schema](#mongoose-schema)
   1. [ESlint and Prettier](#eslint-and-prettier)
      1. [VSCode Plugins](#vscode-plugins)
      1. [VSCode settings](#vscode-settings)
      1. [ESLint](#eslint)
      1. [Prettier](#prettier)
      1. [Ignore files](#ignore-files)

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

### **ESlint and Prettier**

Here's how I configured ESLint and Prettier to work together.

&nbsp;

#### **VSCode Plugins**

Make sure to have the followint plugins installed:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

&nbsp;

#### **VSCode settings**

Verify if you have this settings on you User Settings JSON.

```json
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"eslint.validate": [ "javascript", "typescript"],
"eslint.run": "onType"
```

These settings will help for a better experience in VSCode

If you already have the vscode plugins installed, run `npm install` and reload the editor. It should be all working by now. If you want to know further how ESLint and Prettier were configured, check the details below.

&nbsp;

#### **ESLint**

Eslint was installed using the setup tool (eslint v9.19.0)

```
npx eslint --init
```

Setup select options:

❓ How would you like to use ESLint? <br>
✅ To check syntax and find problems

❓ What type of modules does your project use? <br>
✅Javascript modules (import/export)

❓ Which framework does your project use? <br>
✅None of these

❓ Does your project use TypeScript? <br>
✅Yes

❓ Where does your code run? <br>
✅Node (uncheck the option 'Browser' and c only heck the option 'Node' using the 'i' key)

❓ Would you like to install them now? <br>
✅Yes

❓ Which package manager do you want to use? <br>
✅npm

After that, npm will install all required packages by eslint:

- eslint
- globals
- @eslint/js
- typescript-eslint

Eslint will also create the eslint.config.mjs file. At first, this file contains only the minimal configuration to make eslint work, but it will not have any rules. You will have to manually add them yourself.

In this case, to make my eslint configuration work, with the rules and everything, I had to install the following packages:

```
npm install --save-dev eslint eslint-plugin-import eslint-plugin-prettier eslint-config-prettier eslint-plugin-n @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

At this point, just reload the editor, and the lint rules should be working by now. Note that in this command there is some packages related to prettier, that will be used in the next step.

&nbsp;

#### **Prettier**

If you finished the previous step, what's left is to create a prettierrc file to define your prettier formatting options.

&nbsp;

#### **Ignore files**

It's not required, by I think its good practice to create an eslintignore and prettierignore, just to make sure eslint and prettier will only affect the intended files.
