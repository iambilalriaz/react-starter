# frontend

frontend for suforia

## Getting Started

Install the following for local development:

- [Node.js](https://nodejs.org/en/download/)
- [Buf](https://docs.buf.build/installation)
- [protoc for TypeScript](https://github.com/improbable-eng/ts-protoc-gen#installation)

## Navigating this repo

Check our Makefile for useful commands. This includes generating protos, running tha app.

* `api` - a git submodule that describes the various API's that we support. This is analogous to a swagger spec, but is used to generate code and provide both a client-server contract. Read up on [gRPC](https://grpc.io/) for more
* `src/` - contains the TypeScript source code.
* `public` - contains images

## Running the app

To install dependencies, run

```bash
make setup
```

To run the project locally

```bash
make run
```

Visit [http://localhost:5173](http://localhost:5173) to see the running app.
