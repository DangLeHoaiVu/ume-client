FROM node:16-alpine

ENV NODE_ENV development
ENV NODE_OPTIONS=--max_old_space_size=1024

# https://github.com/vercel/turbo/issues/2198
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# add turborepo
RUN yarn global add turbo

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies
RUN yarn install --production

# Copy the rest of your application files
COPY . .

# Expose the port your application listens on (assuming it's 3000)
EXPOSE 3000

# Use Turbo to start your production application
CMD ["yarn", "turbo", "start"]
