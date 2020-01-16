# Dockerfile for production image for API server of the Byte Technology micro-services backend.
#
# Copyright 2019 Byte Technology. All rights reserved.

FROM node:lts-alpine
# Add maintainer info
LABEL maintainer="Byte Technology"

# Set the working directory to /root
WORKDIR /root

# Copy our stuff over
COPY . .

# Install npm modules
RUN npm install

# Build
RUN npm run build

# Our run command
CMD ["npm", "run", "start"]
