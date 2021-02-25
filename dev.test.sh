#!/usr/bin/env bash

   git add . \
&& git commit -m '[WIP] update' \
&& git push \
&& cd .. \
&& rm -rf ./micro-test-tpl \
&& moleculer init --no-install "bytetechnology/micro-service-template#develop" micro-test-tpl \
&& cp ./micro-api/.npmrc ./micro-test-tpl/.npmrc \
&& cd micro-test-tpl \
&& npm install \
&& code . \
&& cd ..