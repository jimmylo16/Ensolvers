FROM node:18

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

COPY ./frontend .

# RUN npm run migration:run
RUN git clone https://github.com/vishnubob/wait-for-it.git