REPORTER = dot

.PHONY: test test-w

test:
  @NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

test-w:
  @NODE_ENV=test ./node_modules/.bin/mocha  --reporter $(REPORTER) --watch
#    --growl # osx growl notifications


