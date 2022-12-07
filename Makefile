#Makefile

setup:
	install link

install: # install deps
	npm ci

link:
	npm link

publish: # publish the project locally
	npm publish --dry-run

lint: # linter check
	npx eslint .

fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test