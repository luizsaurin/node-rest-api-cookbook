<h1 align="center"><strong>Users CRUD</strong></h1>

### **Summary**

REST API developed with Node.js and Typescript, with User CRUD operations.

#### **ESlint and Prettier**

Here's how I configured ESLint and Prettier to work together.

#### **VSCode Plugins**

Make sure to have the followint plugins installed:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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

#### **Prettier**

If you finished the previous step, what's left is to create a prettierrc file to define your prettier formatting options.

#### **Ignore files**

It's not required, by I think its good practice to create an eslintignore and prettierignore, just to make sure eslint and prettier will only affect the intended files.
