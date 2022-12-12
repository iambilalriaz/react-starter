.PHONY: protos

protos:
	export PATH=$PATH:node_modules/ts-protoc-gen/bin
	buf generate --path api