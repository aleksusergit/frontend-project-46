#Makefile

setup:
	install link

install: # install deps
	npm ci

link:
	npm link

publish: # publish the project locally
	npm publish --dry-run

#lint: # linter check
#	npx eslint .