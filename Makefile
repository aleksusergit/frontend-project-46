#Makefile
install: # install deps
	npm ci

run: # run application
	node bin/gendiff.js

publish: # publish the project locally
	npm publish --dry-run

#lint: # linter check
#	npx eslint .