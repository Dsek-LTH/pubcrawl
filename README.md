<div align="center">
  <img src="/apps/web/static/icons/favicon-white-512x512.png" alt="Pubcrawl logo">
  <h3>Pubcrawl</h3>
  <p>
    Bar occupancy tracker
    <br />
    <a href="https://pubcrawl.dsek.se/"><strong>pubcrawl.dsek.se</strong></a>
  </p>
</div>

## About

A web app that allows door attendants at TLTH pubs to register participants. The
information is updated in real-time, allowing others to see how many people are
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
