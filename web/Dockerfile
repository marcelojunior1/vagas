FROM node:20
WORKDIR /web
COPY ./web/package*.json ./
RUN npm install
EXPOSE 3000
CMD npm run start