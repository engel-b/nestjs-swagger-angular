<div align="center">
  <h1>Taskmanagement</h1>
</div>
<div align="center">
  <strong>NestJsx CRUD combined with Angular UI and Swagger generated API-client</strong>
</div>

<br />

<div align="center">
  <sub>Built with :purple_heart: by
  <a href="https://engel-b.github.io">Björn Engel</a>
</div>

<br />

This project is a prototype of using NestJs extended with Crud-extension and Swagger. It is used to learn how an Angular frontend interacts with the backend by using a swagger genearated api-client.

## Features

- :computer: [NestJs](https://github.com/nestjs/nest) using [nestjsx/crud](https://github.com/nestjsx/crud)

- :pencil2: Swagger for API documentation

- :mag: Angular

- :electric_plug: Swagger-Codegen to generate API-client

## Packages

- [**Backend**](https://www.npmjs.com/package/@nestjsx/crud) - Simple NestJs-Service that uses `@nestjsx/crud` extension for basic CRUD-services on an entity
- [**Frontend**](https://www.npmjs.com/package/@nestjsx/crud-request) - Angular frontend

## How to run

- Start [postgresql](https://www.postgresql.org) database and [adminer](https://www.adminer.org) for database administration `docker-compose up -d`

- Change into backend directory `cd backend`
- Start backend service `npm run start:dev`

- Change into backend directory `cd frontend`
- Generate API-client `npm run generate:api`
- ... and start frontend service `ng serve`

## URLs

- [Adminer http://localhost:8080](http://localhost:8080)
- [Backend http://localhost:3000](http://localhost:3000)
- [Swagger-UI http://localhost:3000/api](http://localhost:3000/api)
- [Frontend http://localhost:4200](http://localhost:4200)

## License

[MIT](LICENSE)