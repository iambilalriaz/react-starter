.PHONY:
setup:
	npm install --legacy-peer-deps

.PHONY:
protos:
	buf generate --path api

.PHONY:
run: protos
	npm start
