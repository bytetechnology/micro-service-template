# Dockerfile for production image for {{projectName}} service of the Byte Technology micro-services backend.
#
# Copyright 2019 Byte Technology. All rights reserved.

# Our builder stage
FROM node:12.16.2-buster-slim as builder
# Add maintainer info
LABEL maintainer="Byte Technology"
# Set the working directory
WORKDIR /opt/byte/micro-{{serviceName}}
# Copy our stuff over
COPY . .
# Install npm modules
RUN npm install
# Run check
RUN npm run check

# our final image
FROM node:12.16.2-buster-slim
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
