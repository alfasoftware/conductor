#
# conductor:serverAndUI - Combined Netflix conductor server & UI 
#
# ===========================================================================================================
# 0. Builder stage
# ===========================================================================================================
FROM ubuntu:22.04 AS builder

# Install Node
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get -y update; apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -qq --no-install-recommends \
    build-essential \
    nodejs \
    yarn \
  && apt-get upgrade -qq \
  && rm -rf /var/lib/apt/lists/*

# Copy the project onto the builder image
COPY . /conductor

# Build the client
WORKDIR /conductor/ui
RUN yarn install && yarn build

# ===========================================================================================================
# 1. Bin stage
# ===========================================================================================================

FROM nginx:alpine


# Copy compiled UI assets to nginx www directory
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /conductor/ui/build .
COPY --from=builder /conductor/docker/ui-production/nginx/nginx.conf /etc/nginx/conf.d/default.conf
