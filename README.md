# frontend

frontend for suforia

## Getting Started

Install the following for local development:

- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [Buf](https://docs.buf.build/installation)

**Note:**

Install version `3.20` or older of *Buf* if you get this error in a newer version:

```
protoc-gen-js: program not found or is not executable
```

On macOS, this will fix the issue:

```zsh
brew install protobuf@3
brew link --overwrite protobuf@3
```

## Navigating this repo

Check our Makefile for useful commands. This includes generating protos, running tha app.

* api - a git submodule that describes the various API's that we support. This is analogous to a swagger spec, but is used to generate code and provide both a client-server contract. Read up on [gRPC](https://grpc.io/) for more
* src/ - contains the TypeScript source code.
* public - contains images

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
