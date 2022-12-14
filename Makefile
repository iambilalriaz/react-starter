.PHONY:
setup:
	npm install
	npm install ts-protoc-gen

.PHONY:
protos:
	export PATH=$PATH:node_modules/ts-protoc-gen/bin
	buf generate --path api

.PHONY:
run: protos
	npm start
