<div align="center">
  <img src="/static/icons/favicon-white-512x512.png" alt="Pubcrawl logo">
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

- [Deno 2](https://deno.com/) – Required for development
- [Docker](https://www.docker.com/) – Optional, for containerized environments

### Installation

1. Clone this repo
2. Create a `.env` file in the project root and add `ADMIN_KEY=<password>`

### Running

Run any of the **Useful Commands** blow.

### Useful Commands

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `deno task dev`     | Starts a development server with live reloading.       |
| `deno task build`   | Compiles and builds the project.                       |
| `deno task preview` | Serves the built project in a development environment. |
| `deno task serve`   | Runs the built project in production mode.             |
