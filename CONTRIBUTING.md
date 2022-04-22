# Contributing to Metron
Contributions are welcome. Read the following document for information pertaining to contributions and how to get started.

## Setting up local environment
The easiest way to get your local environment up and running is to use [the dev container](.devcontainer/devcontainer.json) included in the repo. This will require having docker installed on your machine. This will setup your vscode with the extensions needed and will also create a PostgreSQL instance for you.

You will also need to create a `.env` file. You can do so by copying `.env.example`.
```sh
cp .env.example .env
```
For the auth0 API keys, create your own auth0 project and get the values from the dashboard.

This project uses yarn instead of npm.

## Coding standard
Please use tabs for indentation. The dev container should already do this for you but be aware otherwise. To check if your code is good, run:
```sh
yarn lint
```
