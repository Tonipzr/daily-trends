# Daily-Trends

## Table of contents

* [Installation](#Installation)
* [Instructions](#Instructions)
* [Tests](#Tests)
* [Architecture](#Architecture)
* [API Docs](#API)

## Installation

To work, it is necessary to have an instance of mongodb running on port 27017 (This can be changed using the `MONGO_URL` environment variable).

In order to build a mongo instance, the repository includes a `docker-compose` with a basic configuration.

Run the following command:

Windows:
```sh
docker compose up mongo -d
```

Linux:
```sh
docker-compose up mongo -d
```

## Instructions

First the dependencies must be installed using `npm install`.

### Development

The server can be started in development mode with the following command

```sh
npm run dev
```

By default, the server will start in [express](https://www.npmjs.com/package/express) mode, this behaviour can be changed by using command arguments

```sh
npm run dev -- express
npm run dev -- fastify
```

The options available are [express](https://www.npmjs.com/package/express) and [fastify](https://www.npmjs.com/package/fastify)

### Production

To run the server in production mode, the first step is to compile the code

```sh
npm run build
```

And then run the server

```sh
npm run start
```

By default, the server will start in [express](https://www.npmjs.com/package/express) mode, this behaviour can be changed by using command arguments

```sh
npm run start -- express
npm run start -- fastify
```

The options available are [express](https://www.npmjs.com/package/express) and [fastify](https://www.npmjs.com/package/fastify)

### Production in Container

To run an instance of the service within docker, you can use the project's docker-compose

Run the following command:

Windows:
```sh
docker compose up app -d
```

Linux:
```sh
docker-compose up app -d
```

If no mongo instance was running, the corresponding database container will also be created.

The Dockerfile is optimised to use the cache in container builds.

## Tests

The following commands are used to run the tests

```sh
npm run test
```

And to run them and obtain coverage

```sh
npm run test:coverage
```

Current test coverage is:

![Unit Test Coverage](docs/images/unit_test_coverage.png)

## Architecture

The architecture of daily-trends follows the DDD (Domain-Drive-Design) architecture in which it is divided into three main groups

* Domain
* Application
* Infrastructure

The innermost layers cannot depend on the outermost layers, this means that Domain cannot have external domain dependencies, application can only have domain dependencies and infrastructure can depend on anyone.

![Project layer image](docs/images/layer_image.png)

To give some examples, the scraping system is organised in the following way

![Scraper Class](docs/images/scrapers.png)

And the available servers (express and fastify) as follows

![Servers Class](docs/images/servers.png)

Finally, a sequence diagram of an API request

![API Request Sequence](docs/images/request.png)

## API

### Get all feeds (GET /feed)

Request to get all feeds

- **Path**: GET /feed
- **Params**: None
- **Body**: None

**Response**
```json
{
    "status": "success",
    "data": {
        "items": [
            {
                "_id": "string",
                "title": "string",
                "subTitle": "string",
                "url": "string",
                "author": "string",
                "source": "string",
                "publishedAt": "string",
                "createdAt": "string",
                "updatedAt": "string",
                "__v": "number"
            },
        ]
    }
}
```

### Get one feed (GET /feed/:id)

Request to get a feed by its id

- **Path**: GET /feed/:id
- **Params**: 
    - id: feed id
- **Body**: None

**Response**
```json
{
    "status": "success",
        "data": {
            "items": {
                "_id": "string",
                "title": "string",
                "subTitle": "string",
                "url": "string",
                "author": "string",
                "source": "string",
                "publishedAt": "string",
                "createdAt": "string",
                "updatedAt": "string",
                "__v": "number"
            },
        }
}
```

### Create feed (POST /feed)

Request to create a feed

- **Path**: POST /feed
- **Params**: None
- **Body**: *as json* - **all fields required**
```json
{
  "title": "Title", // any string
  "subTitle": "Description", // any string
  "url": "http://example.com", // any string (must be unique)
  "author": "Toni", // any string
  "source": "Custom", // Must be one of: Custom | ElPais | ElMundo
  "publishedAt": "2025-02-23T12:33:47.965Z" // Date in string format. Must be new Date() parsable
}
```

**Response OK**
```json
{
    "status": "success",
    "data": {
        "items": true // boolean
    }
}
```

**Response Not OK**
```json
{
    "status": "error",
    "errors": "error description" // string
}
```

### Update Feed (PUT /feed/:id)

Request to update a feed. If the document does not exist, it will create a new one.

- **Path**: PUT /feed/:id
- **Params**: 
    - id: feed id
- **Body**: *as json* - **all fields required**
```json
{
  "title": "Title", // any string
  "subTitle": "Description", // any string
  "url": "http://example.com", // any string (must be unique)
  "author": "Toni", // any string
  "source": "Custom", // Must be one of: Custom | ElPais | ElMundo
  "publishedAt": "2025-02-23T12:33:47.965Z" // Date in string format. Must be new Date() parsable
}
```

**Response OK**
```json
{
    "status": "success",
    "data": {
        "items": true // boolean
    }
}
```

**Response Not OK**
```json
{
    "status": "error",
    "errors": "error description" // string
}
```

### Delete feed (DELETE /feed/:id)

Request to delete a feed

- **Path**: DELETE /feed/:id
- **Params**: 
    - id: feed id
- **Body**: None

**Response OK**
```json
{
    "status": "success",
    "data": {
        "items": true // boolean
    }
}
```

### Scraping (POST /feed/scrape)

Request to retrieve feeds from [El Mundo](https://www.elmundo.es/) y [El País](https://elpais.com/)

- **Path**: POST /feed/scrape
- **Params**: 
    - id: feed id
- **Body**: *as json* - **all fields are optional**

When the `save` field is not present or false, it simply returns the news, if true it saves them to the database if it has not already done.

**It does not duplicate feeds, if they have the same URL, it does not re-add them**

*Limited to 5 feeds*
```sh
{
  "save": boolean // true | false
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "items": [
            {
                "_id": "string",
                "title": "string",
                "subTitle": "string",
                "url": "string",
                "author": "string",
                "source": "string",
                "publishedAt": "string",
                "createdAt": "string",
                "updatedAt": "string",
                "__v": "number"
            },
        ]
    }
}
```

### Healthcheck (GET /)

Request to get server status

- **Path**: GET /
- **Params**: None
- **Body**: None

**Response**
```json
{
    "status": "success",
        "data": {
            "items": {
                "status": "ok", // string
                "uptime": 7218.886387329, // number
                "memoryUsage": {
                    "rss": 117751808, // number
                    "heapTotal": 45092864, // number
                    "heapUsed": 42675704, // number
                    "external": 22049381, // number
                    "arrayBuffers": 18535668 // number
                },
                "pid": 1, // number
                "nodeVersion": "v22.14.0", // string
                "platform": "linux", // string
                "arch": "x64" // string
            }
        }
}
```