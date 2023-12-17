# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

# Change the ownership of the /usr/src/app directory to the node user.
RUN chown -R node:node /usr/src/app

# Switch to the node user.
USER node


# Copy package.json and package-lock.json into the image.
COPY --chown=node:node package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Set the working directory to /usr/src/app/db
WORKDIR /usr/src/app/db

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Expose the port that the application listens on.
EXPOSE 3000

# In Runtime, run the following commands:

# Migrate the database.
# Initialize seed data. "npx sequelize-cli db:seed:all"
# Run the application.
CMD cd ./db && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:undo:all && npx sequelize-cli db:seed:all && cd .. && npm run dev