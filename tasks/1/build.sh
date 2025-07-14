#!/bin/bash
rm -rf dist && mkdir dist && cat ./src/jquery.js ./src/index.js | sed 's/  */ /g' | tr -d '\t\n' > dist/entry.js