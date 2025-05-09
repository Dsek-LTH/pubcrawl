<div align="center">
  <img src="/apps/web/static/icons/favicon-white-512x512.png" alt="Pubcrawl logo">
  <h3>Pubcrawl</h3>
  <p>
    Bar occupancy tracker
    <br />
    <a href="https://pubcrawl.dsek.se/"><strong>pubcrawl.dsek.se</strong></a>
  </p>
</div>


![builtwith][builtwith]
[![svelte][svelte]][svelte-url]
[![daisy][daisy]][daisy-url]
[![typescript][typescript]][typescript-url]
[![drizzle][drizzle]][drizzle-url]
[![zod][zod]][zod-url]
[![graphql][graphql]][docker-url]

![using][using]
[![node][node]][node-url]
[![pnpm][pnpm]][pnpm-url]
[![docker][docker]][docker-url]
[![apollo][apollo]][apollo-url]

## About

A web app that allows door attendants at TLTH pubs to register participants. The
information is updated in real-time, allowing visitors to see how many people are
at each pub during the pub crawl.

## Development Guide

### Prerequisites

Ensure you have the following installed:

- [Node](https://nodejs.org/) – JavaScript runtime required for development.
- [pnpm](https://pnpm.io/) – Package manager.
- [Docker](https://www.docker.com/) – For containerized environments.

### Setup

1. Clone, or fork, this repo.

2. Run `pnpm install`, in the project root, to install dependencies.

3. Copy the `.env.example` file to `.env` and fill in the required environment variables.

4. Run `setup-dev.sh` to set up the development environment. This will setup docker containers for the database and Redis, and run migrations to set up the database schema.

5. Navigate to the `apps/db` directory and run `pnpm run dev` to start the Apollo GraphQL server.

6. Navigate to the `apps/web` directory and run `pnpm run dev` to start the web server.

### Running

To run the application, ensure you have the Postgres and Redis containers running. Then, start the Apollo server and the web server, as described in the setup section above.

### Useful Commands

View the `package.json` files in respective directories for all available scripts.

**Note:** always run `pnpm` commands in the respective directories.



[builtwith]: https://img.shields.io/badge/built%20with-f280a1?style=for-the-badge
[using]: https://img.shields.io/badge/using-f280a1?style=for-the-badge
[typescript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[svelte]: https://img.shields.io/badge/svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white
[svelte-url]: https://svelte.dev/
[daisy]: https://img.shields.io/badge/daisyui-107f65?style=for-the-badge&logo=data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMjU2IiB5PSI2NzAuNzIiIHdpZHRoPSI1MTIiIGhlaWdodD0iMjU2IiByeD0iMTI4IiBmaWxsPSIjMUFEMUE1Ii8+CjxjaXJjbGUgY3g9IjUxMiIgY3k9IjM1My4yOCIgcj0iMjU2IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSIzNTMuMjgiIHI9IjI2MSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIxMCIvPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSIzNTMuMjgiIHI9IjExNC42ODgiIGZpbGw9IiNGRjk5MDMiLz4KPC9zdmc+Cg==
[daisy-url]: https://daisyui.com/
[pnpm]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[pnpm-url]: https://pnpm.io/
[docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[node]: https://img.shields.io/badge/node-339933?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/
[drizzle]: https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=Drizzle&logoColor=black
[drizzle-url]: https://orm.drizzle.team/
[zod]: https://img.shields.io/badge/zod-274d82?style=for-the-badge&logo=zod
[zod-url]: https://zod.dev/
[graphql]: https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white
[graphql-url]: https://graphql.org/
[apollo]: https://img.shields.io/badge/-Apollo-311C87?style=for-the-badge&logo=apollo-graphql
[apollo-url]: https://www.apollographql.com/