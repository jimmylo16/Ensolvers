FROM node:18

WORKDIR /usr/src/app

COPY ./back/package*.json ./

RUN npm install

COPY ./back .

# RUN npm run migration:run
RUN git clone https://github.com/vishnubob/wait-for-it.git