# Metron
[![GPL-3.0 license](https://img.shields.io/github/license/giancarlopernudisegura/metron)](https://github.com/giancarlopernudisegura/metron/blob/master/LICENSE)
[![Node Version](https://img.shields.io/node/v/next)](https://nodejs.org/en/download/)

A test case aggregator.

## Description
Metron is a test case aggregator for education mainly geared towards computing
science classes.

## Development
If you want to get involved, check out [the contributing
document](CONTRIBUTING.md).

## Deployment
There intent is that any instituion who wants to use this project, host their
own instance. You can use the [Dockerfile](docker/Dockerfile) to run a
deployment of the website. You'll have to also manually deploy a PostgreSQL
server and create a auth0 account.

A fully fledged deployment docker with integrated PostgreSQL is in the works.
