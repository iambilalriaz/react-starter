.PHONY:
setup:
	npm install

.PHONY:
protos:
	buf generate --path api

.PHONY:
run: protos
	npm start
