# Here we are getting our node as Base image Light Node
FROM node:20.12-alpine3.19 as base

# Install dependencies
FROM base AS deps
WORKDIR /usr/src/app
COPY package.json yarn.lock* ./
RUN yarn

# Build code
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN yarn build


# Production Build
FROM base AS prod
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app/ ./
RUN yarn --production
EXPOSE 4444 8888
ENV PORT 4444
ENV PORT_WS 8888
CMD node app.js

#ref https://medium.com/@swappy20_61978/how-to-reduce-your-node-docker-image-size-by-90-for-production-2df3e19b2940