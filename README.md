## Running project

Pre-requisites:

- node _(follow [this link](https://nodejs.org/en/download/) to install)_
- yarn _(follow [this link](https://classic.yarnpkg.com/en/docs/install) to install)_
- [Buf](https://docs.buf.build/installation)
  You'll also need to install the following
  `yarn add -D grpc-tools grpc_tools_node_protoc_ts`

Build gRPC client

```bash
buf generate
```

Execute following command:

```bash
npm start
```

<!-- add scripts yarn add -D grpc-tools grpc_tools_node_protoc_ts -->

Visit `http://localhost:5173` to see the running app.
