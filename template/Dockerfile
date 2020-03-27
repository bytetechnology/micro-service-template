# Dockerfile for production image for API server of the Byte Technology micro-services backend.
#
# Copyright 2019 Byte Technology. All rights reserved.

# Our builder stage
FROM node:lts-alpine as builder
# Add maintainer info
LABEL maintainer="Byte Technology"
# Set the working directory
WORKDIR /opt/byte/micro-{{serviceName}}
# Copy our stuff over
COPY . .
# Install npm modules
RUN npm install
# Run formatter
RUN npm run format
# Run linter
RUN npm run lint
# Run tests
RUN npm run test
# Build
RUN npm run build

# our final image
FROM node:lts-alpine
# Add maintainer info
LABEL maintainer="Byte Technology"
# Set the working directory
WORKDIR /opt/byte/micro-{{serviceName}}
# Copy package.json
COPY --from=builder /opt/byte/micro-{{serviceName}}/package.json .
# Copy package-lock.json
COPY --from=builder /opt/byte/micro-{{serviceName}}/package-lock.json .
# Copy the dist directory
COPY --from=builder /opt/byte/micro-{{serviceName}}/dist dist/.
# Install only packages needed by production
RUN npm ci --only=production
# Our run command
CMD ["npm", "run", "start"]
