.PHONY:
setup:
	npm install
	npm i -g grpc-tools grpc_tools_node_protoc_ts

.PHONY:
protos:
	buf generate

.PHONY:
run: protos
	npm start
