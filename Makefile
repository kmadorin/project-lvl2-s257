install:
	npm install
start:
	npm run babel-node -- src/gendiff.js
publish:
	npm publish
lint:
	npm run eslint .
build:
	npm run build
test:
	npm test
.PHONY: test