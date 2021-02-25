#!/usr/bin/env bash

   cd .. \
&& rm -rf ./micro-test-tpl \
&& moleculer init --no-install "./micro-service-template" micro-test-tpl \
&& cp ./micro-api/.npmrc ./micro-test-tpl/.npmrc \
&& cd micro-test-tpl \
&& npm install \
&& cd .. \
&& code micro-test-tpl \
&& cd micro-service-template