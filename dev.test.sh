#!/usr/bin/env bash

if [ -z "$1" ]
then
   echo "Service name required  =>  $./dev/test.sh  <service_name>"
   exit 1;
fi

SVC_NAME=$1

   cd .. \
&& rm -rf ./$SVC_NAME \
&& moleculer init --no-install "./micro-service-template" $SVC_NAME \
&& cp ./micro-api/.npmrc ./$SVC_NAME/.npmrc \
&& cd $SVC_NAME \
&& npm install \
&& npm run setup:local \
&& cd .. \
&& code $SVC_NAME \
&& cd micro-service-template