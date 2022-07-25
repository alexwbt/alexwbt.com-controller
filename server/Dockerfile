FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY tsconfig.json /app
COPY index.js /app
COPY env /app/env
COPY src /app/src

ARG PORT
EXPOSE ${PORT}

CMD ["node", "/app"]
