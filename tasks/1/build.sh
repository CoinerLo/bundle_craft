#!/bin/bash
rm -rf dist && mkdir dist && cat ./src/jquery.js ./src/index.js | tr -d '\n\t' | tr -s ' ' > dist/entry.js