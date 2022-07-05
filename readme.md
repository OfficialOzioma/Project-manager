# This is the API collection for the Project Manager Application Built with AdonisJs version 5

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Mini eCommerce API is a crud API that has the following features.

## Features

- **User Authenication**
- **Perform Project CRUD**
- **Perform Milestone CRUD**

## Technologies

This Mini eCommerce API was built with the following Technologies:

- **[NodeJs](https://nodejs.org/en/) - Nodejs is a JavaScript runtime built on Chrome's V8 JavaScript engine.**
- **[AdonisJs](https://adonisjs.com/) - A fully featured web framework for Node.js!**
- **[TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.**
- **[PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.**
- **[Postman](https://www.postman.com/) - Postman is an API platform for building and using APIs.**

## Installation

This API requires [Node.js](https://nodejs.org/) v12+ to run.
You need git install on your PC
Install the dependencies and devDependencies and start the server.

### Run the following command on your

```sh
git clonegit@github.com:OfficialOzioma/Project-manager-api.git
```

```sh
cd Project-manager-api
```

```sh
npm install
```

```sh
node ace migration:run
```

```sh
node ace serve --watch
```

## API End points

> ### Note: `You need to create project before you can create a milestone`

table
| Details                | HTTP Method | API End points            |
| ---------------------- | ------ | ------------------------- |
| Register               | POST   | [api/register](#)         |
| Login                  | POST   | [api/login](#)            |
| Create Project         | POST   | [api/project](#)         |
| Get All Projects       | GET    | [api/projects](#)         |
| Find a project        | GET    | [api/project/:id](#)     |
| Update a project      | PUT    | [api/project/:id](#)     |
| Delete a project      | DELETE | [api/project/:id](#)     |
| Create Milestone         | POST   | [api/milestone](#)          |
| Get all Milestone        | GET    | [api/milestones](#)          |
| Find a Milestone         | GET    | [api/milestone/:id](#)      |
| Update a Milestone       | PUT    | [api/milestone/:id](#)      |
| Delete a Milestone       | DELETE | [api/milestone/:id](#)      |

## License

MIT
