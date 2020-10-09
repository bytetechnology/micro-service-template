# Dockerfile for production image for micro-{{serviceName}} service of the Byte Technology micro-services backend.
#
# Copyright 2019 Byte Technology. All rights reserved.

# Our builder stage
FROM node:12-buster-slim AS builder
# Add maintainer info
LABEL maintainer="Byte Technology"
# Set the working directory
WORKDIR /opt/bytetech/micro-{{serviceName}}
# Copy our stuff over
COPY . .
# Install curl needed by mongodb-memory-server
RUN apt update && apt -y install curl
# Install npm modules
RUN npm install
# Create a test env file
RUN cp envs/circleci.test.env envs/local.test.env
# Run check
RUN npm run check

# Our final image
FROM node:12-buster-slim
# Add maintainer info
LABEL maintainer="Byte Technology"
# Install required system packages and dependencies
RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y iproute2 iputils-ping sudo procps curl && \
  apt-get auto-remove && \
  rm -r /var/lib/apt/lists /var/cache/apt/archives
# Create user "bytedev" with sudo powers
RUN sed -e 's/%sudo	ALL=(ALL:ALL) ALL/%sudo	ALL=(ALL) NOPASSWD: ALL/g' -i /etc/sudoers
RUN useradd -m bytetech && \
  usermod -aG sudo bytetech && \
  touch /home/bytetech/.bashrc && \
  chown -R bytetech:bytetech /home/bytetech
# Set the working directory
WORKDIR /home/bytetech/micro-{{serviceName}}
# Copy package.json
COPY --from=builder --chown=bytetech:bytetech /opt/bytetech/micro-{{serviceName}}/package.json .
# Copy package-lock.json
COPY --from=builder --chown=bytetech:bytetech /opt/bytetech/micro-{{serviceName}}/package-lock.json .
# Copy the dist directory
COPY --from=builder --chown=bytetech:bytetech /opt/bytetech/micro-{{serviceName}}/dist dist/.
# Change permissions
RUN chown -R bytetech:bytetech /home/bytetech
# Run things as bytetech user
USER bytetech
# Install only packages needed by production
RUN npm ci --only=production
# Our run command
CMD ["npm", "run", "start"]
